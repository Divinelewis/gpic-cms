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
    totalPeoplePresent: {
      // NEW FIELD - Includes everyone
      type: Number,
      required: true,
      default: 0,
    },
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
