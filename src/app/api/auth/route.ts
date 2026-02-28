import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
