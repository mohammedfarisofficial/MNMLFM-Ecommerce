import express from "express";
import { userLogin, userRegister, verifyOTP,resendOTP,forgotPassword,resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTPVerificationCode",resendOTP);
router.post("/forgot",forgotPassword)
router.post("/reset",resetPassword)


export default router;
