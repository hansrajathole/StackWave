import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as authController from "../controllers/auth.controller.js";
import * as otpController from "../controllers/otp.controller.js";
import { protectRoute } from "../middleware/protected.js";
import passport from 'passport';
import { googleCallback, authSuccess } from '../controllers/auth.controller.js';
const router = Router();

router.post("/signup",userMiddleware.singupValidator,authController.singupController);
router.post("/signin",userMiddleware.loginValidator,authController.loginController);
router.post("/verify-otp", otpController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.get("/me", protectRoute, authController.meController);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleCallback
  );
  router.get('/success', authSuccess);
router.get("/logout", protectRoute, authController.logoutController);

export default router;
