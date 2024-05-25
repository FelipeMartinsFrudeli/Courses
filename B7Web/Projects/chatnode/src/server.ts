import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(3000);

const publicFolder = path.join(__dirname, '../public');
app.use(express.static(publicFolder));

let connectedUsers: String[] = [];

io.on('connection', socket => {
    
    socket.on('join-request', username => {
        socket.data.username = username;
        connectedUsers.push(username);
    })
})