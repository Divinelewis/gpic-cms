// Termii Configuration
const TERMII_CONFIG = {
  API_KEY: process.env.TERMII_API_KEY || "",
  SENDER_ID: process.env.TERMII_SENDER_ID || "GPIC",
  BASE_URL: process.env.TERMII_BASE_URL || "https://v3.api.termii.com",
  ENDPOINT: "/api/sms/send",
};

interface SMSResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

/**
 * Format phone number for Termii
 * Termii requires format: 234XXXXXXXXXX (no + sign)
 */
function formatPhoneNumber(phoneNumber: string): string {
  let formatted = phoneNumber.replace(/[\s\-\(\)]/g, "");

  if (formatted.startsWith("+")) {
    formatted = formatted.substring(1);
  }

  if (formatted.startsWith("0")) {
    formatted = "234" + formatted.substring(1);
  } else if (!formatted.startsWith("234")) {
    formatted = "234" + formatted;
  }

  return formatted;
}

/**
 * Send SMS using Termii
 */
export async function sendSMS(
  phoneNumber: string,
  message: string,
): Promise<SMSResponse> {
  try {
    if (!TERMII_CONFIG.API_KEY) {
      console.error("Termii API Key not configured");
      return {
        success: false,
        message:
          "SMS service not configured. Please add TERMII_API_KEY to .env",
      };
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log(`[SMS] Sending to: ${formattedPhone}`);

    const payload = {
      to: formattedPhone,
      from: TERMII_CONFIG.SENDER_ID,
      sms: message,
      type: "plain",
      api_key: TERMII_CONFIG.API_KEY,
      channel: "generic",
    };

    const response = await fetch(
      `${TERMII_CONFIG.BASE_URL}${TERMII_CONFIG.ENDPOINT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    console.log("[SMS] Termii Response:", data);

    if (data.message_id || data.code === "ok") {
      return {
        success: true,
        message: "SMS sent successfully",
        messageId: data.message_id,
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to send SMS",
        error: JSON.stringify(data),
      };
    }
  } catch (error: any) {
    console.error("[SMS] Error:", error);

    let errorMessage = "Failed to send SMS";

    if (error.code === "ENOTFOUND") {
      errorMessage =
        "Cannot reach Termii servers. Check your internet connection.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error.toString(),
    };
  }
}

/**
 * Send Bulk SMS
 * Returns: { successful, failed } to match what cron route expects
 */
export async function sendBulkSMS(
  phoneNumbers: string[],
  message: string,
): Promise<{ successful: number; failed: number }> {
  let successful = 0;
  let failed = 0;

  console.log(
    `[BULK SMS] Starting bulk SMS to ${phoneNumbers.length} recipients`,
  );

  for (const phone of phoneNumbers) {
    const result = await sendSMS(phone, message);

    if (result.success) {
      successful++;
      console.log(`[BULK SMS] ✓ Sent to ${phone}`);
    } else {
      failed++;
      console.error(
        `[BULK SMS] ✗ Failed to send to ${phone}: ${result.message}`,
      );
    }

    // Delay between messages to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log(
    `[BULK SMS] Completed: ${successful} successful, ${failed} failed`,
  );

  return {
    successful,
    failed,
  };
}

/**
 * Welcome message for first-time members
 */
export function getWelcomeMessage(firstName: string): string {
  return `Dear ${firstName},

We are thrilled to have you as part of the Gospel Power International Church (GPIC) family. We look forward to seeing more of you.

We're truly happy to have you with us. May this be a place where you grow in faith and experience God's grace.

God bless you!

For more information about us, visit: https://gpicworldwide.org`;
}

/**
 * Activity reminder message
 */
export function getActivityReminderMessage(
  activityTitle: string,
  activityDate: Date,
  activityTime: string,
  location: string,
): string {
  const dateStr = activityDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return `GPIC Event Reminder!

Event: ${activityTitle}

Date: ${dateStr}
Time: ${activityTime}
Location: ${location}

We can't wait to see you there!

For more details, contact us via: +23480367515669 or visit https://gpicworldwide.org

God bless!`;
}

/**
 * Sunday service reminder (sent on Saturday)
 */
export function getSundayReminderMessage(): string {
  return `GPIC Sunday Service Reminder

Join us tomorrow for a powerful time in God's presence.

Time: 7:00 AM Prompt
Location: Church Auditorium, Opp. Highbrow School, Okemini Sars Rd, Rumuaghorlu, Port Harcourt.

Come expectant. Invite a friend!`;
}
