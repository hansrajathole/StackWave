import roomModel from "../models/room.model.js"
import crypto from "crypto" 

export const createRoom = async (req,res) => {
    const {language , title , languageIcon } = req.body

    const userId = req.user._id
    try {
        if(!language){
            throw new Error("language is required please select language")
        }
        if(!title){
            throw new Error("title is required")
        }   

        let roomId = crypto.randomBytes(15).toString("hex");
       
        const room = await roomModel.create({
            roomId : roomId,
            title : title,
            roomCreatedby : userId,
            language : language,
            participants : [userId],
            languageIcon : languageIcon
        })
       
        res.status(200).json({ message: "Room created successfully", room });

    } catch (error) {
        console.log( "error in create room controller" , error.message);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const getRoomById = async (req, res) => {
    try {
      const { roomId } = req.params;
  
      const room = await roomModel.findOne({ roomId })
        .populate("roomCreatedby", "username avatar")
        .populate("participants", "username avatar")
        .populate("messages.sender", "username avatar");
  
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      res.status(200).json(room);
  
    } catch (error) {
      console.log(error.message)  
      res.status(500).json({ message: "Error fetching room", error });
    }
};
  

export const getAllRoom = async (req , res) => {
    try {
        const userId = req.user._id
        const populatedRoom = await roomModel
        .find({
            roomCreatedby : userId
        })
        .populate("roomCreatedby", "avatar username") 
        .populate("participants", "avatar username").sort({ createdAt: -1 })
  
      return res.status(200).json({
        message: "Fetched all your rooms successfully",
        rooms: populatedRoom,
      });
    } catch (error) {
        console.log( "error in getAllroom controller" , error.message);
        return res.status(500).send({ message: 'Internal Server Error' }); 
    }   
}