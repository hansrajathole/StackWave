import { Router } from "express";
import { protectRoute } from "../middleware/protected.js";
import * as aiController from "../controllers/ai.controller.js"
const router  = Router()


router.post("/fix", protectRoute, aiController.fixCodeController)

export default router