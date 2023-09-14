import mongoose from "mongoose";

const OTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const OTPVerification = mongoose.model(
  "OTPVerification",
  OTPVerificationSchema
);
export default OTPVerification;
