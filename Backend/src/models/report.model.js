import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reportedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 

    },
    targetId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 

    },
    type: {
        type: String, 
        enum: ["question", "answer", "user"], 
        required: true 

    },
    reason: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "resolved"], 
        default: "pending" 

    },
  },
  { timestamps: true }
);

const reportModel = mongoose.model("Report", ReportSchema);
export default reportModel