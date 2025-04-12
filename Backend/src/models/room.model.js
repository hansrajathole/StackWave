import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    roomId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    roomCreatedby :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    language: { 
        type: String, 
        default: "javascript" 
    },
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    codeContent: { 
        type: String, 
        default: "" 
    },
    messages: [
      {
        sender: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        text: { 
            type: String 
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const roomModel = mongoose.model("Room", RoomSchema);
export default roomModel 
