export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("🔥 LOGOUT ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
