// src/app/api/members/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";

export async function GET() {
  try {
    await connectDB();

    const members = await Member.find().sort({ createdAt: -1 });

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("🔥 MEMBERS FETCH ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    const member = await Member.create(data);

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("🔥 MEMBER CREATE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
