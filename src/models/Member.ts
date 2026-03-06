import mongoose, { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    serialNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    otherName: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    membershipDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
    },
    // SMS TRACKING FIELDS
    isFirstTimer: {
      type: Boolean,
      default: true,
    },
    welcomeSmsSent: {
      type: Boolean,
      default: false,
    },
    welcomeSmsSentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to auto-generate serial number (FIXED)
MemberSchema.pre("save", async function () {
  if (this.isNew && !this.serialNumber) {
    try {
      // Generate serial number: GPIC-YYYY-XXXX
      const year = new Date().getFullYear();
      const count = await mongoose.model("Member").countDocuments();
      const serialNum = String(count + 1).padStart(4, "0");
      this.serialNumber = `GPIC-${year}-${serialNum}`;
    } catch (error) {
      console.error("Error generating serial number:", error);
    }
  }
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;
