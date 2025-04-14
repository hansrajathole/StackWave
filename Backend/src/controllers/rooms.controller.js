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
  

export const getAllRoom = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find rooms where the user is either the creator or a participant
    const populatedRoom = await roomModel
      .find({
        $or: [
          { roomCreatedby: userId }, // Rooms created by the user
          { participants: userId }, // Rooms where the user is a participant
        ],
      })
      .populate("roomCreatedby", "_id avatar username") // Populate creator details
      .populate("participants", "avatar username") // Populate participant details
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    return res.status(200).json({
      message: "Fetched all rooms successfully",
      rooms: populatedRoom,
    });
  } catch (error) {
    console.log("Error in getAllRoom controller:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};


export const joinRoomById = async (req,res) => {
    const roomId = req.params.roomId
    const userId = req.user._id
    
    try {
      if(!roomId){
        throw new Error("RoomId is required")
      }
  
      const room = await roomModel.findOne({roomId})
  
      if(!room){
        return res.status(400).json({message :"roomId invalid please try again to different RoomId"})
      }
  
      await roomModel.findOneAndUpdate(
        { roomId },
        { $addToSet: { participants: userId } }
      );

      return res.status(200).json({message : "Room join successfully"})

    } catch (error) {
      console.log("Error in joinRoomById controller :" , error.message)
      return res.status(500).json({message : "Internal Server Error" })
    }





} 

export const deleteRoom = async (req,res) => {
    const roomId = req.params.roomId
    const userId = req.user._id
    
    try {
      
      const room = await roomModel.findOne({roomCreatedby : userId})
      if(!room){
        return res.status(400).json({message : "You have no access to delete the room"})
      }

      await roomModel.findOneAndDelete({roomId})

      res.status(200).json({ message : "room deleted successfully"})
     
      
    } catch (error) {
      console.log("Error in deleteRoom controller :" , error.message)
      return res.status(500).json({message : "Internal Server Error" })
    }
}