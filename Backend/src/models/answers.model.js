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
        ref : "User",
        default : 0
      }
    ],
    downVotes : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : 0
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
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
   }
);


AnswerSchema.virtual("votes").get(function () {
  return this.upVotes.length - this.downVotes.length;
});

const answerModel = mongoose.model("Answer", AnswerSchema);
export default answerModel
