import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Activity from "@/models/Activity";

// GET all activities
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const includeExpired = searchParams.get("includeExpired") === "true";

    let query: any = {};

    if (!includeExpired) {
      // Only show activities that haven't passed yet
      query.activityDate = { $gte: new Date() };
    }

    const activities = await Activity.find(query).sort({ activityDate: 1 });

    return NextResponse.json(activities);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch activities" },
      { status: 500 },
    );
  }
}

// POST new activity
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.activityDate ||
      !body.activityTime ||
      !body.location
    ) {
      return NextResponse.json(
        { error: "Title, date, time, and location are required" },
        { status: 400 },
      );
    }

    // Validate date is in the future
    const activityDate = new Date(body.activityDate);
    if (activityDate < new Date()) {
      return NextResponse.json(
        { error: "Activity date must be in the future" },
        { status: 400 },
      );
    }

    // Create activity
    const activity = await Activity.create(body);

    return NextResponse.json(activity, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create activity" },
      { status: 500 },
    );
  }
}
