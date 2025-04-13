import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import http from 'http';
import { Socket } from "socket.io";
import { Server } from "socket.io";

const server = http.createServer(app);
const PORT = config.PORT 

const io = new Server(server, {
    cors: {
      origin: '*',
    },
});
io.on('connection', socket => {

    const projectId = socket.handshake.query.projectId

    socket.join(projectId)

    console.log('New client connected');

    socket.on("chacha", msg => {
        console.log(msg)
        socket.to(projectId).emit('chacha', msg)
    })

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});