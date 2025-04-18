
import roomModel from "../models/room.model.js";
import userModel from '../models/user.model.js'
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(" New user connected:", socket.id);

    socket.on("joinRoom", async ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`${userId} joined room ${roomId}`);

      await roomModel.findOneAndUpdate(
        { roomId },
        { $addToSet: { participants: userId } }
      );
    });

   
    socket.on("codeChange", async ({ roomId, code }) => {
      await roomModel.findOneAndUpdate({ roomId }, { codeContent: code });
      socket.broadcast.to(roomId).emit("codeUpdate", code);
    });

  
    socket.on("sendMessage", async ({ roomId, userId, text }) => {

      const user = await userModel.findById(userId)
      const message = {
        sender: userId,
        text,
        timestamp: new Date(),
        readBy: [userId]
      };

     
    await roomModel.findOneAndUpdate(
        { roomId },
        { $push: { messages: message } }
      );
     
      const newMessage = {
        sender:{
          _id: userId , username: user.username, avatar: user.avatar
        },
        text,
        timestamp: new Date(),
        readBy: [userId]
      };
     
      socket.broadcast.to(roomId).emit("receiveMessage", newMessage );
    });

   
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
      console.log(` User left room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
