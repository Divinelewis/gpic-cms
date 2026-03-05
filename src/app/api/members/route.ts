import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";

// GET all members
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const isActive = searchParams.get("isActive");

    let query: any = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== null) {
      query.isActive = isActive === "true";
    }

    const members = await Member.find(query).sort({ createdAt: -1 });

    return NextResponse.json(members);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch members" },
      { status: 500 },
    );
  }
}

// POST new member
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.phoneNumber) {
      return NextResponse.json(
        { error: "First name, last name, and phone number are required" },
        { status: 400 },
      );
    }

    // Check if phone number already exists
    const existingMember = await Member.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "A member with this phone number already exists" },
        { status: 400 },
      );
    }

    // Create new member
    const member = await Member.create(body);

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create member" },
      { status: 500 },
    );
  }
}
