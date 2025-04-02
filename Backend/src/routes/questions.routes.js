import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js"
import { protectRoute } from "../middleware/protected.js"
const router = Router()

router.get("/", protectRoute ,function(req,res){res.send("get all questions")})
router.post("/",protectRoute , function(req,res){res.send("create a questions")})
router.get("/:id", protectRoute ,function(req,res){res.send("get one questions")})
router.put("/:id",protectRoute ,function(req,res){res.send("Update question")})
router.delete("/:id", protectRoute ,function(req,res){res.send("Delete question")})


export default router