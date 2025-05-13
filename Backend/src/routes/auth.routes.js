import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as authController from "../controllers/auth.controller.js";
import * as otpController from "../controllers/otp.controller.js";
import { protectRoute } from "../middleware/protected.js";
import passport from 'passport';

const router = Router();

router.post("/signup",userMiddleware.singupValidator,authController.singupController);
router.post("/signin",userMiddleware.loginValidator,authController.loginController);
router.post("/forget-password", userMiddleware.forgetPasswordValidator, authController.forgetPasswordController);
// router.post("/reset-password/:token", userMiddleware.forgetPasswordValidator , authController.resetPasswordController);
router.post("/verify-otp", otpController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.post('/google-login', authController.googleLoginController);
router.get("/me", protectRoute, authController.meController);

export default router;
