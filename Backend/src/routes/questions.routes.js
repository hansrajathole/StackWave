import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as questionsController from '../controllers/questions.controller.js'

const router = Router()

router.get("/", protectRoute ,questionsController.getAllQuestions)
router.get("/user/:id", protectRoute ,questionsController.getAllUserQuestions)
router.post("/",protectRoute , questionsController.postQuestion)
router.get("/:id", protectRoute ,function(req,res){res.send("get one questions")})
router.put("/:id",protectRoute ,function(req,res){res.send("Update question")})
router.delete("/:id", protectRoute ,function(req,res){res.send("Delete question")})


export default router