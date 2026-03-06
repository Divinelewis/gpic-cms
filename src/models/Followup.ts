import mongoose, { Schema, model, models } from "mongoose";

const FollowupSchema = new Schema(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    consecutiveAbsences: {
      type: Number,
      default: 0,
    },
    lastAttendedDate: Date,
    followupStatus: {
      type: String,
      enum: ["pending", "contacted", "resolved"],
      default: "pending",
    },
    followupSmsSent: {
      type: Boolean,
      default: false,
    },
    followupSmsSentDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  },
);

const Followup = models.Followup || model("Followup", FollowupSchema);

export default Followup;
