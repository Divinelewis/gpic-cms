import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);
