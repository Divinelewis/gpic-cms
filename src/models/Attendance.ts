import mongoose, { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        "Sunday First Service",
        "Sunday Second Service",
        "Wednesday",
        "Friday",
        "Special Event",
      ],
      default: "Sunday First Service",
    },
    // DEMOGRAPHIC BREAKDOWN
    totalMen: {
      type: Number,
      required: true,
      default: 0,
    },
    totalWomen: {
      type: Number,
      required: true,
      default: 0,
    },
    totalYouths: {
      type: Number,
      required: true,
      default: 0,
    },
    totalChildren: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPeoplePresent: {
      // Auto-calculated from above
      type: Number,
      required: true,
      default: 0,
    },
    // REGISTERED MEMBERS TRACKING
    attendees: [
      {
        memberId: {
          type: Schema.Types.ObjectId,
          ref: "Member",
          required: true,
        },
        checkedInAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalPresent: {
      // Registered members present
      type: Number,
      default: 0,
    },
    totalAbsent: {
      // Registered members absent
      type: Number,
      default: 0,
    },
    notes: String,
    recordedBy: String,
  },
  {
    timestamps: true,
  },
);

AttendanceSchema.index({ date: -1 });

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
