import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Activity from "@/models/Activity";
import Member from "@/models/Member";
import {
  sendBulkSMS,
  getActivityReminderMessage,
  getSundayReminderMessage,
} from "@/lib/sms";

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const job = searchParams.get("job");

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
          { error: "Invalid job type" },
          { status: 400 },
        );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Cron job error:", error);
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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);

  const result = await Activity.deleteMany({
    activityDate: { $lt: yesterday },
  });

  return {
    job: "delete-expired-activities",
    deletedCount: result.deletedCount,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Send reminders for activities happening tomorrow (afternoon)
 */
async function sendActivityReminders() {
  // Get tomorrow's date range
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  // Find activities happening tomorrow that haven't been reminded yet
  const activities = await Activity.find({
    activityDate: {
      $gte: tomorrow,
      $lte: tomorrowEnd,
    },
    reminderSent: false,
    isActive: true,
  });

  if (activities.length === 0) {
    return {
      job: "send-activity-reminders",
      message: "No activities to remind about",
      timestamp: new Date().toISOString(),
    };
  }

  // Get all active members
  const members = await Member.find({ isActive: true }).select(
    "phoneNumber firstName",
  );
  const phoneNumbers = members.map((m) => m.phoneNumber);

  let totalSent = 0;
  let totalFailed = 0;

  // Send reminder for each activity
  for (const activity of activities) {
    const message = getActivityReminderMessage(
      activity.title,
      activity.activityDate,
      activity.activityTime,
      activity.location,
    );

    const result = await sendBulkSMS(phoneNumbers, message);
    totalSent += result.sent;
    totalFailed += result.failed;

    // Mark activity as reminded
    activity.reminderSent = true;
    await activity.save();
  }

  return {
    job: "send-activity-reminders",
    activitiesCount: activities.length,
    membersCount: members.length,
    totalSent,
    totalFailed,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Send Sunday service reminders (Every Saturday at noon)
 */
async function sendSundayReminders() {
  // Get all active members
  const members = await Member.find({ isActive: true }).select("phoneNumber");
  const phoneNumbers = members.map((m) => m.phoneNumber);

  if (phoneNumbers.length === 0) {
    return {
      job: "send-sunday-reminders",
      message: "No active members to send reminders",
      timestamp: new Date().toISOString(),
    };
  }

  const message = getSundayReminderMessage();
  const result = await sendBulkSMS(phoneNumbers, message);

  return {
    job: "send-sunday-reminders",
    membersCount: members.length,
    sent: result.sent,
    failed: result.failed,
    timestamp: new Date().toISOString(),
  };
}
