import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as questionsController from '../controllers/questions.controller.js'

const router = Router()

router.get("/", protectRoute ,questionsController.getAllQuestions)
router.get("/user/:id", protectRoute ,questionsController.getAllUserQuestions)
router.post("/",protectRoute , questionsController.postQuestion)
router.get("/:id", protectRoute ,questionsController.getQuestionById)
router.put("/:id",protectRoute , questionsController.updateQuestion)
router.delete("/:id", protectRoute , questionsController.deleteQuestion)
router.patch("/vote/:id", protectRoute , questionsController.voteQuestion)


export default router