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
    upVotes :[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } 
    ],
    downVotes :[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } 
    ],
  },
  { timestamps: true }
);

const answerModel = mongoose.model("Answer", AnswerSchema);
export default answerModel
