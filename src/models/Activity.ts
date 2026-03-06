import mongoose, { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    activityDate: {
      type: Date,
      required: true,
    },
    activityTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

// Index for auto-deletion and reminder queries
ActivitySchema.index({ activityDate: 1 });

const Activity = models.Activity || model("Activity", ActivitySchema);

export default Activity;
