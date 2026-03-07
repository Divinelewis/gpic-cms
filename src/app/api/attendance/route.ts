import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Member from "@/models/Member";
import Followup from "@/models/Followup";
import { sendSMS } from "@/lib/sms";

// GET all attendance records
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "10");

    let query: any = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("attendees.memberId", "firstName lastName serialNumber");

    return NextResponse.json(records);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch attendance" },
      { status: 500 },
    );
  }
}

// POST new attendance record
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      date,
      serviceType,
      totalMen,
      totalWomen,
      totalYouths,
      totalChildren,
      totalPeoplePresent,
      attendeeIds,
      recordedBy,
    } = body;

    // Get all active members
    const allMembers = await Member.find({ isActive: true });
    const totalMembers = allMembers.length;

    // Create attendance record with ALL fields
    const attendance = await Attendance.create({
      date: new Date(date),
      serviceType,
      totalMen: totalMen || 0,
      totalWomen: totalWomen || 0,
      totalYouths: totalYouths || 0,
      totalChildren: totalChildren || 0,
      totalPeoplePresent: totalPeoplePresent || 0,
      attendees: attendeeIds.map((id: string) => ({ memberId: id })),
      totalPresent: attendeeIds.length,
      totalAbsent: totalMembers - attendeeIds.length,
      recordedBy,
    });

    // Check for consecutive absences ONLY for Sunday services
    if (serviceType.includes("Sunday")) {
      await checkConsecutiveAbsences(date, attendeeIds, allMembers);
    }

    return NextResponse.json(attendance, { status: 201 });
  } catch (error: any) {
    console.error("Attendance creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save attendance" },
      { status: 500 },
    );
  }
}

// FIXED: Helper function to check consecutive absences
async function checkConsecutiveAbsences(
  currentDate: string,
  presentIds: string[],
  allMembers: any[],
) {
  const currentDateObj = new Date(currentDate);

  // Get the Sunday from 7 days ago
  const previousSundayDate = new Date(currentDateObj);
  previousSundayDate.setDate(previousSundayDate.getDate() - 7);

  // Create separate date objects for start and end of day
  const startOfDay = new Date(previousSundayDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(previousSundayDate);
  endOfDay.setHours(23, 59, 59, 999);

  // Get attendance from previous Sunday
  const previousAttendance = await Attendance.findOne({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    serviceType: { $regex: /sunday/i }, // Only Sunday services
  });

  // If there's no previous Sunday attendance record, don't flag anyone
  if (!previousAttendance) {
    console.log(
      "No previous Sunday attendance found - skipping follow-up checks",
    );
    return;
  }

  // Check each member
  for (const member of allMembers) {
    const memberId = member._id.toString();
    const isPresentToday = presentIds.includes(memberId);

    if (isPresentToday) {
      // Member was present - clear any follow-up record and reactivate
      const existingFollowup = await Followup.findOne({ memberId: member._id });
      if (existingFollowup) {
        await Followup.findOneAndDelete({ memberId: member._id });
        await Member.findByIdAndUpdate(member._id, { isActive: true });
        console.log(
          `Cleared follow-up for ${member.firstName} ${member.lastName} - they attended`,
        );
      }
    } else {
      // Member is absent today - check if also absent last Sunday
      const wasPresentLastSunday = previousAttendance.attendees.some(
        (a: any) => a.memberId.toString() === memberId,
      );

      if (!wasPresentLastSunday) {
        // Absent for 2 CONSECUTIVE Sundays - flag for follow-up
        const existingFollowup = await Followup.findOne({
          memberId: member._id,
        });

        if (!existingFollowup) {
          // Create new follow-up record (first time being flagged)
          console.log(
            `Creating follow-up for ${member.firstName} ${member.lastName} - 2 consecutive absences`,
          );

          await Followup.create({
            memberId: member._id,
            consecutiveAbsences: 2,
            lastAttendedDate: null,
            followupStatus: "pending",
          });

          // Set member as INACTIVE
          await Member.findByIdAndUpdate(member._id, { isActive: false });

          // Send follow-up SMS
          await sendFollowupSMS(member);
        } else {
          // Already has a follow-up record - just ensure they're inactive
          // Don't increment consecutiveAbsences or send another SMS
          await Member.findByIdAndUpdate(member._id, { isActive: false });
          console.log(
            `${member.firstName} ${member.lastName} already in follow-up - no new SMS sent`,
          );
        }
      }
    }
  }
}

// Send follow-up SMS to absent member
async function sendFollowupSMS(member: any) {
  const message = `Hello ${member.firstName},

We noticed you haven't been in church for the past 2 Sundays and we miss you!

We just wanted to check in and see how you're doing. Is everything okay?

We'd love to see you back in service. If you need prayer or support, please reach out.

Sunday Services:
- 8:00 AM (First Service)
- 10:30 AM (Second Service)

You're always in our prayers.

God bless you!

- GPIC Pastor Team`;

  const result = await sendSMS(member.phoneNumber, message);

  if (result.success) {
    await Followup.findOneAndUpdate(
      { memberId: member._id },
      {
        followupSmsSent: true,
        followupSmsSentDate: new Date(),
      },
    );
  }
}

// DELETE attendance record
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Attendance ID required" },
        { status: 400 },
      );
    }

    const deleted = await Attendance.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Attendance record deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete attendance" },
      { status: 500 },
    );
  }
}
