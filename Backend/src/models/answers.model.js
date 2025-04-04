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
    votes: { 
        type: Number, 
        default: 0 
    },
  },
  { timestamps: true }
);

const answerModel = mongoose.model("Answer", AnswerSchema);
export default answerModel
