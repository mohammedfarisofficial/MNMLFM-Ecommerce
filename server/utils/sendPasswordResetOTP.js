import User from "../models/User.js";
import OTPVerification from "../models/OTPVerification.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendPasswordResetOTP = async ( email ) => {
  try {
      console.log(email)
    const userExist = await User.findOne({ email });
    if (!userExist) throw Error("There is no account for the provided email!");
    if (!userExist.verified) throw Error("The acccount is not verified!");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log("SMTP Connection Error:", error);
      } else {
        console.log("Nodemail is Ready to send Mails", success);
      }
    });

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Password reset",
      html: `<p>Enter <b>${otp}</b> in the app to reset your password.</p><p><b>This code expires in 1 hour</b></p>`,
    };

    // hash the otp
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const oneHourInMilliseconds = 3600000;
    const expiresAt = new Date(Date.now() + oneHourInMilliseconds).toString();
    console.log(typeof expiresAt);

    const newOTPVerification = await new OTPVerification({
      userId: userExist.userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: expiresAt,
    });

    await newOTPVerification.save();
    await transporter.sendMail(mailOptions).catch((err) => console.log(err));
    return {
      status: "PENDING",
      message: "reset OTP email sent",
      data: {
        userId: userExist.userId,
        email,
      },
    }
  } catch (err) {
    throw Error(err);
  }
};
