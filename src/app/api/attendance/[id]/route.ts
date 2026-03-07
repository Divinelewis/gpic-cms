import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Member from "@/models/Member";

// GET single attendance record
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const record = await Attendance.findById(id).populate(
      "attendees.memberId",
      "firstName lastName serialNumber",
    );

    if (!record) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch attendance" },
      { status: 500 },
    );
  }
}

// PUT update attendance record
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Get all active members for totalAbsent calculation
    const allMembers = await Member.find({ isActive: true });

    const updated = await Attendance.findByIdAndUpdate(
      id,
      {
        date: body.date,
        serviceType: body.serviceType,
        totalMen: body.totalMen || 0,
        totalWomen: body.totalWomen || 0,
        totalYouths: body.totalYouths || 0,
        totalChildren: body.totalChildren || 0,
        totalPeoplePresent: body.totalPeoplePresent || 0,
        attendees:
          body.attendeeIds?.map((memberId: string) => ({ memberId })) || [],
        totalPresent: body.attendeeIds?.length || 0,
        totalAbsent: allMembers.length - (body.attendeeIds?.length || 0),
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update attendance" },
      { status: 500 },
    );
  }
}

// DELETE attendance record
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

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
