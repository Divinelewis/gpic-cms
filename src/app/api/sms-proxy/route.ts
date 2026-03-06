import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simply pass through to Termii
    const response = await fetch("https://v3.api.termii.com/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        api_key: process.env.SMS_API_KEY,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("SMS Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const runtime = "edge"; // Use edge runtime to bypass restrictions
