import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import http from 'http';
import { Socket } from "socket.io";
import { Server } from "socket.io";
import socketHandler from "./src/socket/index.js";

const PORT = config.PORT 

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

socketHandler(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});