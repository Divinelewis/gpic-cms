import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    email: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
