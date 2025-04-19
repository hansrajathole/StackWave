import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as answerController from '../controllers/answer.controller.js'
const router = Router()

router.post("/:questionId", protectRoute , answerController.postAnswer)
router.put("/:answerId",protectRoute , answerController.updateAnswer)
router.delete("/:answerId", protectRoute , answerController.deleteAnswer)
router.patch("/vote/:id",protectRoute, answerController.voteAnswer)
router.post("/:answerId/comments",protectRoute,answerController.addCommentToAnswer)


export default router