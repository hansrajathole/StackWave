import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as usersController from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/protected.js";
import multer from "multer";
const upload = multer({ storage : multer.memoryStorage() })
const router = Router();

router.get("/leaderboard", protectRoute, usersController.getUsersByReputation);
router.get("/all", protectRoute, usersController.getAllUsers);
router.get("/:id", protectRoute, usersController.getUserProfile);
router.put("/:id", protectRoute, usersController.updateProfile);
router.put("/editprofileimg/:id",protectRoute,upload.single("image"),userMiddleware.updateProfile , usersController.updateProfileImage);



export default router;
