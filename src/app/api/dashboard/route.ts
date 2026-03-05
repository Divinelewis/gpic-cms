import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get current date info
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    // Total members
    const totalMembers = await Member.countDocuments();

    // Active members
    const activeMembers = await Member.countDocuments({ isActive: true });

    // Inactive members
    const inactiveMembers = await Member.countDocuments({ isActive: false });

    // New members this month
    const newThisMonth = await Member.countDocuments({
      membershipDate: { $gte: firstDayOfMonth },
    });

    // New members last month
    const newLastMonth = await Member.countDocuments({
      membershipDate: {
        $gte: firstDayOfLastMonth,
        $lt: firstDayOfMonth,
      },
    });

    // Calculate growth percentage
    const memberGrowth =
      newLastMonth > 0
        ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100)
        : newThisMonth > 0
          ? 100
          : 0;

    // Recent members (last 5)
    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName lastName membershipDate");

    // Monthly growth (last 6 months)
    const monthlyGrowth = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const count = await Member.countDocuments({
        membershipDate: {
          $gte: monthStart,
          $lte: monthEnd,
        },
      });

      monthlyGrowth.push({
        month: monthStart.toLocaleString("default", { month: "short" }),
        count,
      });
    }

    return NextResponse.json({
      totalMembers,
      activeMembers,
      inactiveMembers,
      newThisMonth,
      memberGrowth,
      recentMembers,
      monthlyGrowth,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
