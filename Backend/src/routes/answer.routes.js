import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as answerController from '../controllers/answer.controller.js'
const router = Router()

router.post("/:questionId", protectRoute , answerController.postAnswer)
router.put("/:answerId",protectRoute , answerController.updateAnswer)
router.delete("/:answerId", protectRoute , answerController.deleteAnswer)
router.post("/:answerId/upvote ",protectRoute ,answerController.upVoteAnswer)
router.post("/:answerId/downvote ",protectRoute ,answerController.downVoteAnswer)


export default router