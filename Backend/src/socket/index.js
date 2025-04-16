
import roomModel from "../models/room.model.js";

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

   
    socket.on("codeChange", ({ roomId, code }) => {
      socket.to(roomId).emit("codeUpdate", code);
    });

  
    socket.on("sendMessage", async ({ roomId, userId, text }) => {
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

     
      socket.to(roomId).emit("receiveMessage", message);
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
