import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import * as authController from "../controllers/auth.contrller.js"
import { protectRoute } from "../middleware/protected.js"
const router = Router()

router.post("/signup", userMiddleware.singupValidator , authController.singupController)
router.post("/login", userMiddleware.loginValidator , authController.loginController)
router.get("/me",protectRoute , authController.meController)


export default router