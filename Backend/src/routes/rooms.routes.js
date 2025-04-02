import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import { protectRoute } from "../middleware/protected.js"
const router = Router()

router.post("/", protectRoute ,function(req,res){res.send(" Create room")})
router.get("/:roomId", protectRoute ,function(req,res){res.send(" Get room info")})



export default router