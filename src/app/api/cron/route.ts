import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Activity from "@/models/Activity";
import Member from "@/models/Member";
import {
  sendBulkSMS,
  getActivityReminderMessage,
  getSundayReminderMessage,
} from "@/lib/sms";

// Support both GET (Vercel Cron) and POST (manual testing)
export async function GET(request: NextRequest) {
  return handleCronRequest(request);
}

export async function POST(request: NextRequest) {
  return handleCronRequest(request);
}

async function handleCronRequest(request: NextRequest) {
  try {
    // Verify cron secret - check multiple header formats
    const cronSecret =
      request.headers.get("x-cron-secret") || // Custom header
      request.headers.get("authorization")?.replace("Bearer ", "") || // Bearer token
      "";

    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      console.error("[CRON] Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const job = searchParams.get("job");

    console.log(`[CRON] Job started: ${job} at ${new Date().toISOString()}`);

    let result: any = {};

    switch (job) {
      case "delete-expired-activities":
        result = await deleteExpiredActivities();
        break;

      case "send-activity-reminders":
        result = await sendActivityReminders();
        break;

      case "send-sunday-reminders":
        result = await sendSundayReminders();
        break;

      default:
        return NextResponse.json(
          {
            error:
              "Invalid job type. Use: send-sunday-reminders, send-activity-reminders, or delete-expired-activities",
          },
          { status: 400 },
        );
    }

    console.log(`[CRON] Job completed:`, result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[CRON] Error:", error);
    return NextResponse.json(
      { error: error.message || "Cron job failed" },
      { status: 500 },
    );
  }
}

/**
 * Delete activities that have passed
 */
async function deleteExpiredActivities() {
  console.log("[CRON] Deleting expired activities...");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);

  const result = await Activity.deleteMany({
    activityDate: { $lt: yesterday },
  });

  console.log(`[CRON] Deleted ${result.deletedCount} expired activities`);

  return {
    job: "delete-expired-activities",
    deletedCount: result.deletedCount,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Send reminders for activities happening tomorrow (at 2 PM daily)
 */
async function sendActivityReminders() {
  console.log("[CRON] Checking for tomorrow's activities...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const activities = await Activity.find({
    activityDate: {
      $gte: tomorrow,
      $lte: tomorrowEnd,
    },
    reminderSent: false,
    isActive: true,
  });

  if (activities.length === 0) {
    console.log("[CRON] No activities scheduled for tomorrow");
    return {
      job: "send-activity-reminders",
      message: "No activities to remind about",
      timestamp: new Date().toISOString(),
    };
  }

  console.log(`[CRON] Found ${activities.length} activities for tomorrow`);

  const members = await Member.find({
    isActive: true,
    phoneNumber: { $exists: true, $ne: "" },
  }).select("phoneNumber firstName");

  if (members.length === 0) {
    console.log("[CRON] No active members with phone numbers");
    return {
      job: "send-activity-reminders",
      message: "No active members to notify",
      timestamp: new Date().toISOString(),
    };
  }

  const phoneNumbers = members.map((m) => m.phoneNumber);
  console.log(`[CRON] Sending to ${phoneNumbers.length} members`);

  let totalSuccessful = 0;
  let totalFailed = 0;

  for (const activity of activities) {
    const message = getActivityReminderMessage(
      activity.title,
      activity.activityDate,
      activity.activityTime,
      activity.location,
    );

    console.log(`[CRON] Sending reminder for: ${activity.title}`);
    const result = await sendBulkSMS(phoneNumbers, message);

    totalSuccessful += result.successful;
    totalFailed += result.failed;

    activity.reminderSent = true;
    await activity.save();
    console.log(`[CRON] Marked ${activity.title} as reminded`);
  }

  return {
    job: "send-activity-reminders",
    activitiesCount: activities.length,
    membersCount: members.length,
    sent: totalSuccessful,
    failed: totalFailed,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Send Sunday service reminders (Every Saturday at noon)
 */
async function sendSundayReminders() {
  console.log("[CRON] Sending Sunday service reminders...");

  // Get all active members with phone numbers
  const members = await Member.find({
    isActive: true,
    phoneNumber: { $exists: true, $ne: "" },
  }).select("phoneNumber");

  if (members.length === 0) {
    console.log("[CRON] No active members with phone numbers");
    return {
      job: "send-sunday-reminders",
      message: "No active members to send reminders",
      timestamp: new Date().toISOString(),
    };
  }

  const phoneNumbers = members.map((m) => m.phoneNumber);
  console.log(`[CRON] Sending to ${phoneNumbers.length} members`);

  const message = getSundayReminderMessage();
  const result = await sendBulkSMS(phoneNumbers, message);

  console.log(
    `[CRON] Sunday reminders sent: ${result.successful} successful, ${result.failed} failed`,
  );

  return {
    job: "send-sunday-reminders",
    membersCount: members.length,
    sent: result.successful,
    failed: result.failed,
    timestamp: new Date().toISOString(),
  };
}
