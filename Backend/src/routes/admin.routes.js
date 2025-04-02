import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import { protectRoute } from "../middleware/protected.js"
const router = Router()

router.get("/reports", protectRoute ,function(req,res){res.send(" Create room")})
router.put("/users/:id/block", protectRoute ,function(req,res){res.send("block user")})



export default router