// src/app/api/auth/register/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );
    }

    // CHECK 1: Check if this email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {  // ✅ FIXED - Check if admin exists (not > 1)
      return NextResponse.json(
        { message: "Admin with this email already exists" },
        { status: 400 },
      );
    }

    // CHECK 2: Count total admins - limit to 2 max
    const totalAdmins = await Admin.countDocuments();

    if (totalAdmins >= 2) {  // NEW - Limit to 2 admins
      return NextResponse.json(
        { message: "Maximum number of admins (2) reached" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Admin registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}