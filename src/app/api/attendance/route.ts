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
    const { date, serviceType, attendeeIds, recordedBy } = body;

    // Get all active members
    const allMembers = await Member.find({ isActive: true });
    const totalMembers = allMembers.length;

    // Create attendance record
    const attendance = await Attendance.create({
      date: new Date(date),
      serviceType,
      attendees: attendeeIds.map((id: string) => ({ memberId: id })),
      totalPresent: attendeeIds.length,
      totalAbsent: totalMembers - attendeeIds.length,
      recordedBy,
    });

    // Check for consecutive absences and update member status
    await checkConsecutiveAbsences(date, attendeeIds, allMembers);

    return NextResponse.json(attendance, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save attendance" },
      { status: 500 },
    );
  }
}

// Helper function to check consecutive absences
async function checkConsecutiveAbsences(
  currentDate: string,
  presentIds: string[],
  allMembers: any[],
) {
  const currentDateObj = new Date(currentDate);

  // Get previous Sunday (7 days ago)
  const previousSunday = new Date(currentDateObj);
  previousSunday.setDate(previousSunday.getDate() - 7);

  // Get attendance from previous Sunday
  const previousAttendance = await Attendance.findOne({
    date: {
      $gte: new Date(previousSunday.setHours(0, 0, 0, 0)),
      $lte: new Date(previousSunday.setHours(23, 59, 59, 999)),
    },
  });

  // Check each member
  for (const member of allMembers) {
    const memberId = member._id.toString();
    const isPresentToday = presentIds.includes(memberId);

    if (!isPresentToday) {
      // Member is absent today
      const wasPresentLastSunday = previousAttendance?.attendees.some(
        (a: any) => a.memberId.toString() === memberId,
      );

      if (!wasPresentLastSunday) {
        // 2 consecutive absences - flag for follow-up AND set inactive
        let followup = await Followup.findOne({ memberId: member._id });

        if (!followup) {
          // Create new follow-up record
          followup = await Followup.create({
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
          // Update existing follow-up
          followup.consecutiveAbsences += 1;
          followup.followupStatus = "pending";
          await followup.save();

          // Ensure member is inactive
          await Member.findByIdAndUpdate(member._id, { isActive: false });
        }
      }
    } else {
      // Member was present - clear any follow-up record AND reactivate
      await Followup.findOneAndDelete({ memberId: member._id });

      // Set member as ACTIVE
      await Member.findByIdAndUpdate(member._id, { isActive: true });
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
