
import roomModel from "../models/room.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ New user connected:", socket.id);

    // ✅ User joins a room
    socket.on("joinRoom", async ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`👤 ${userId} joined room ${roomId}`);

      // Optionally update participants in DB
      await roomModel.findOneAndUpdate(
        { roomId },
        { $addToSet: { participants: userId } }
      );
    });

    // ✅ Real-time code update
    socket.on("codeChange", ({ roomId, code }) => {
      socket.to(roomId).emit("codeUpdate", code);
    });

    // ✅ Real-time chat message
    socket.on("sendMessage", async ({ roomId, userId, text }) => {
      const message = {
        sender: userId,
        text,
        timestamp: new Date(),
        readBy: [userId]
      };

      // Save message to DB
      await roomModel.findOneAndUpdate(
        { roomId },
        { $push: { messages: message } }
      );

      // Broadcast to others in the room
      socket.to(roomId).emit("receiveMessage", message);
    });

    // ✅ User leaves the room
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`👤 User left room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
