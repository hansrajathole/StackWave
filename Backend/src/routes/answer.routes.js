import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import { protectRoute } from "../middleware/protected.js"
const router = Router()

router.post("/:questionId", protectRoute ,function(req,res){res.send("Add answer")})
router.put("/:answerId",protectRoute , function(req,res){res.send(" Edit answer")})
router.delete("/:answerId", protectRoute ,function(req,res){res.send("Delete answer")})
router.post("/:answerId/vote ",protectRoute ,function(req,res){res.send("Vote up/down")})


export default router