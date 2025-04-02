import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as authController from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protected.js";
const router = Router();

router.get("/leaderboard", protectRoute, function (req, res) {
  res.send(" Leaderboard data");
});
router.get("/:id", protectRoute, function (req, res) {
  res.send("Get user profile");
});
router.put("/:id", protectRoute, function (req, res) {
  res.send("Update profile");
});

export default router;
