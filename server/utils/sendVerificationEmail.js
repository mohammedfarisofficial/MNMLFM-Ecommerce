import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import OTPVerification from "../models/OTPVerification.js";

//nodemaler setup

// otp sending method
export const sendVerificationEmail = async ({ userId, email }, res) => {
  try {
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
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign in.</p><p><b>This code expires in 1 hour</b></p>`,
    };

    // hash the otp
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const oneHourInMilliseconds = 3600000;
    const expiresAt = new Date(Date.now() + oneHourInMilliseconds).toString();
    console.log(typeof expiresAt);

    const newOTPVerification = await new OTPVerification({
      userId: userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: expiresAt,
    });
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions).catch((err) => console.log(err));
    res.json({
      status: "PENDING",
      message: "verfication OTP email sent",
      data: {
        userId,
        email,
      },
    });
    return;
  } catch (err) {
    return res.json({
      status: "FAILED",
      message: err.message,
    });
  }
};
