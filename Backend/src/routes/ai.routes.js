import { Router } from "express";
import { protectRoute } from "../middleware/protected.js";
import * as aiController from "../controllers/ai.controller.js"
const router  = Router()


router.post("/fix", protectRoute, aiController.fixCodeController)
router.post("/generatecode",protectRoute , aiController.generateCodeController)

export default router