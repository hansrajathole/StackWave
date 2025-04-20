import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as usersController from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/protected.js";
const router = Router();

router.get("/leaderboard", protectRoute, function (req, res) {
  res.send(" Leaderboard data");
});
router.get("/:id", protectRoute, usersController.getUserProfile);
router.put("/:id", protectRoute, usersController.updateProfile);

export default router;
