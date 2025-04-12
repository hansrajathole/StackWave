import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question", 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    upVotes : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"

      }
    ],
    downVotes : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ],
    comments: [
      {
        content: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

const answerModel = mongoose.model("Answer", AnswerSchema);
export default answerModel
