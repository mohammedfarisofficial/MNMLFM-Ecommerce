import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import OTPVerification from "../models/OTPVerification.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendPasswordResetOTP } from "../utils/sendPasswordResetOTP.js";

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ status: "FAILED", message: "User does't exist!" });

    if (!password)
      return res.json({ status: "FAILED", message: "Password not provided!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ status: "FAILED", message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    console.log(user, token);
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.json({ status: "FAILED", message: err.message });
  }
};

const userRegister = async (req, res) => {
  const { name, email, password, imageUrl } = req.body; 

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      imageUrl: imageUrl !== "" ? imageUrl : "",
      verified: false,
    });

    await newUser
      .save()
      .then((result) => {
        sendVerificationEmail({ userId: result._id, email: result.email }, res);
        return;
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occured while saving user account!",
        });
        return;
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed!");
    } else {
      const OTPRecord = await OTPVerification.find({ userId });
      if (OTPRecord.length <= 0) {
        throw Error(
          "Account record doesn't exist or has been verified already.Please Sign Up or log in"
        );
      } else {
        const { expiresAt } = OTPRecord[0];
        const hashedOTP = OTPRecord[0].otp;

        if (expiresAt < Date.now()) {
          await OTPVerification.deleteMany({ userId });
          throw new Error("Code has expired.Please request again!");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            throw Error("Invalid code passed. Check your inbox.");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await OTPVerification.deleteMany({ userId });
            res.json({
              status: "VERIFIED",
              message: "User email verified successfully.",
            });
          }
        }
      }
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty user details are not allowed!");
    } else {
      await OTPVerification.deleteMany({ userId });
      sendVerificationEmail({ _id: userId, email }, res);
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw Error("Email is required!");
    const result = await sendPasswordResetOTP(email);
    res.json({
      status: "SUCESS",
      result,
    });
  } catch (err) {
    res.json({ status: "FAILED", msg: err.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const { userId } = await User.findOne({ email });
    if (!(email && otp && newPassword)) {
      throw Error("Empty credentials are not allowed,");
    } else {
      const OTPRecord = await OTPVerification.find({ userId });
      if (OTPRecord.length <= 0) {
        throw Error(
          "Account record doesn't exist or has been verified already.Please Sign Up or log in"
        );
      } else {
        const { expiresAt } = OTPRecord[0];
        const hashedOTP = OTPRecord[0].otp;

        if (expiresAt < Date.now()) {
          await OTPVerification.deleteMany({ userId });
          throw new Error("Code has expired.Please request again!");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          console.log(hashedOTP, otp, validOTP);

          if (!validOTP) {
            console.log(validOTP);
            throw Error("Invalid code passed. Check your inbox.");
          } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await User.updateOne({ _id: userId }, { password: hashedPassword });
            await OTPVerification.deleteMany({ userId });
            res.json({
              status: "SUCESS",
              message: "User password reseted successfully.",
            });
          }
        }
      }
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      msg: err.message,
    });
  }
};
export {
  userLogin,
  userRegister,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
};
