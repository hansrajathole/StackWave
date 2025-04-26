import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import http from 'http';
import { Server } from "socket.io";
import socketHandler from "./src/socket/index.js";
import jwt from 'jsonwebtoken'

const PORT = config.PORT;
const allowedOrigin = config.BASE_URL
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

io.use(async (socket, next) => {

  try {

      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
    
      if (!token) {
          return next(new Error('Authentication error'))
      }

      const decoded = jwt.verify(token,config.JWT_SECRET);

      if (!decoded) {
          return next(new Error('Authentication error'))
      }


      socket.user = decoded;

      next();

  } catch (error) {
      next(error)
  }

})

socketHandler(io);

server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDB();
});
