import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 },
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        listIds: [3], // 👈 Replace with your Brevo List ID
      }),
    });

    if (response.ok || response.status === 204) {
      return NextResponse.json(
        { message: "Successfully subscribed!" },
        { status: 200 },
      );
    }

    const errorData = await response.json();

    if (errorData?.code === "duplicate_parameter") {
      return NextResponse.json(
        { error: "This email is already subscribed!" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: errorData?.message || "Subscription failed." },
      { status: response.status },
    );
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
