// src/app/api/activities/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Activity from "@/models/Activity";

export async function GET() {
  try {
    await connectDB();

    const activities = await Activity.find().sort({ date: -1 });

    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error("🔥 ACTIVITIES FETCH ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    const activity = await Activity.create(data);

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("🔥 ACTIVITY CREATE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
