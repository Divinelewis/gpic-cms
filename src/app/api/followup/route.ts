import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Followup from "@/models/Followup";
import Member from "@/models/Member";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const followups = await Followup.find()
      .populate("memberId", "firstName lastName phoneNumber serialNumber")
      .sort({ consecutiveAbsences: -1, createdAt: -1 });

    return NextResponse.json(followups);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch follow-ups" },
      { status: 500 },
    );
  }
}

// Update follow-up status
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { followupId, status, notes } = await request.json();

    const followup = await Followup.findByIdAndUpdate(
      followupId,
      { followupStatus: status, notes },
      { new: true },
    ).populate("memberId");

    // If status is "resolved", reactivate the member and delete follow-up
    if (status === "resolved" && followup) {
      await Member.findByIdAndUpdate(followup.memberId._id, { isActive: true });
      await Followup.findByIdAndDelete(followupId);
    }

    return NextResponse.json(followup);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update follow-up" },
      { status: 500 },
    );
  }
}
