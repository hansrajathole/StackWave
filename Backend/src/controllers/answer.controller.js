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

        const question = await questionModel.findByIdAndUpdate(questionId, {
            $push: { answers: answer._id }
        })
        console.log(question);
        
        res.status(200).json({ message: "Answer posted successfully", answer })
    } catch (error) {
        console.log("Error in postAnswer controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}


export const updateAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId
        const userId = req.user._id

        const { content } = req.body

        if (!answerId) {
            throw new Error("Answer id is required")
        }
        if (!content) {
            throw new Error("Answer content is required")
        }

        const answer = await answerModel.findById(answerId)
        
        if(!answer){
            throw new Error("Answer not found")   
        }
        
        if(answer.authorId.toString() !== userId.toString()){
            throw new Error("you are not authorized for updated Answer")   
        }
        
        answer = await answerModel.findByIdAndUpdate(answerId, {
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
        const userId = req.user._id
        if (!answerId) {
            throw new Error("Answer id is required")
        }

        const answer = await answerModel.findById(answerId)

        if (!answer) {
            throw new Error("Answer not found")
        }

        if (answer.authorId.toString() !== userId.toString()) {
            throw new Error("you are not authorized for delete Answer")
        }

        await answerModel.findByIdAndDelete(answerId)
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


export const addCommentToAnswer = async (req, res) => {
    try {
      const answerId = req.params.answerId
      const {content} = req.body

      if(!content){
        throw new Error("text is required")
      }
      const answer = await answerModel.findById(answerId);
      if (!answer) return res.status(404).json({ message: "Answer not found" });
  
      const newComment = {
        content : content,
        userId: req.user._id,
        username: req.user.username,
      };
  
      answer.comments.push(newComment);
      await answer.save();
  
      res.status(200).json({ message: "Comment added", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  