import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get last 12 weeks of attendance
    const twelveWeeksAgo = new Date();
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

    const records = await Attendance.find({
      date: { $gte: twelveWeeksAgo },
    }).sort({ date: 1 });

    // Calculate growth data
    const weeklyData = records.map((record) => ({
      date: record.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      present: record.totalPresent,
      absent: record.totalAbsent,
    }));

    // Calculate averages
    const totalPresent = records.reduce((sum, r) => sum + r.totalPresent, 0);
    const averageAttendance =
      records.length > 0 ? Math.round(totalPresent / records.length) : 0;

    // Get highest attendance
    const highestAttendance = records.reduce(
      (max, r) => (r.totalPresent > max ? r.totalPresent : max),
      0,
    );

    // Calculate growth percentage
    const firstRecord = records[0];
    const lastRecord = records[records.length - 1];
    const growthPercentage =
      firstRecord && lastRecord
        ? Math.round(
            ((lastRecord.totalPresent - firstRecord.totalPresent) /
              firstRecord.totalPresent) *
              100,
          )
        : 0;

    return NextResponse.json({
      weeklyData,
      averageAttendance,
      highestAttendance,
      growthPercentage,
      totalRecords: records.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
