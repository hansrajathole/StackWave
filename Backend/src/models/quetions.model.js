import mongoose from "mongoose";


const QuestionSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    body: { 
        type: String, 
        required: true 
    },
    tags: { 
        type: [String], 
        default: [] 
    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    upVotes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } 
    ],
    downVotes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        } 
    ],
    answers: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Answer" 
        } 
    ],
}, { timestamps: true });

const questionModel = mongoose.model("Question" , QuestionSchema)
export default questionModel