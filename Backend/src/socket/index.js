export default function socketHandler(io) {
    io.on('connection', (socket) => {
      socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
      });
  
      socket.on('codeChange', ({ roomId, code }) => {
        socket.to(roomId).emit('codeUpdate', code);
      });
  
      socket.on('sendMessage', ({ roomId, message }) => {
        socket.to(roomId).emit('receiveMessage', message);
      });
  
      socket.on('leaveRoom', ({ roomId }) => {
        socket.leave(roomId);
      });
    });
  }
  