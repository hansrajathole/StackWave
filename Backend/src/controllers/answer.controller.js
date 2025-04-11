import answerModel from "../models/answers.model.js"
import questionModel from "../models/quetions.model.js"
import userModel from "../models/user.model.js"

export const postAnswer = async (req, res) => {
    try {
        const questionId = req.params.questionId
        const userId = req.user._id
        const { content } = req.body

        if (!questionId) {
            throw new Error("Question id is required")
        }
        if (!content) {
            throw new Error("Answer content is required")
        }

        const answer = await answerModel.create({
            content,
            authorId: userId,
            questionId
        })

        await userModel.findByIdAndUpdate(userId, {
            $push: { answers: answer._id }
        })

        await questionModel.findByIdAndUpdate(questionId, {
            $push: { answers: answer._id }
        })

        res.status(200).json({ message: "Answer posted successfully", answer })
    } catch (error) {
        console.log("Error in postAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}


export const updateAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId
        const { content } = req.body

        if (!answerId) {
            throw new Error("Answer id is required")
        }
        if (!content) {
            throw new Error("Answer content is required")
        }

        const answer = await answerModel.findByIdAndUpdate(answerId, {
            content
        }, { new: true })

        res.status(200).json({ message: "Answer updated successfully", answer })
    } catch (error) {
        console.log("Error in updateAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}


export const deleteAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId

        if (!answerId) {
            throw new Error("Answer id is required")
        }

        const answer = await answerModel.findByIdAndDelete(answerId)

        if (!answer) {
            throw new Error("Answer not found")
        }

        await userModel.findByIdAndUpdate(answer.authorId, {
            $pull: { answers: answer._id }
        })

        await questionModel.findByIdAndUpdate(answer.questionId, {
            $pull: { answers: answer._id }
        })

        res.status(200).json({ message: "Answer deleted successfully" })
    } catch (error) {
        console.log("Error in deleteAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const upVoteAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId
        const userId = req.user._id

        if (!answerId) {
            throw new Error("Answer id is required")
        }

        const answer = await answerModel.findById(answerId)

        if (!answer) {
            throw new Error("Answer not found")
        }

        if (answer.upVotes.includes(userId)) {
           throw new Error("You allready voted")
        }

        await answerModel.findByIdAndUpdate(answerId, {
            $push: { upVotes: userId },
            $pull: { downVotes: userId }
        })

        res.status(200).json({ message: "Answer upvoted successfully" })
    } catch (error) {
        console.log("Error in upVoteAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const downVoteAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId
        const userId = req.user._id

        if (!answerId){
            throw new Error("Answer id is required")
        }

        const answer = await answerModel.findById(answerId)

        if (!answer) {
            throw new Error("Answer not found")
        }

        if (answer.downVotes.includes(userId)) {
            throw new Error("Already downvoted")
        }

        await answerModel.findByIdAndUpdate(answerId, {
            $push: { downVotes: userId },
            $pull: { upVotes: userId }
        })

        res.status(200).json({ message: "Answer downvoted successfully" })
    } catch (error) {
        console.log("Error in downVoteAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}