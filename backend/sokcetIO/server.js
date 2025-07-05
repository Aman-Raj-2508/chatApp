const { Server } = require('socket.io');
const http = require('http');
const express = require('express');


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chatapp-9zte.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
});


//realtime message code goes here
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {

}

//used to listen server side events io.on
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        console.log(users);
    }

    //used to send the events to all connected users.
    io.emit("getOnlineUsers", Object.keys(users));


    //used to listen client side events on server side.
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));

    });
});


module.exports = {
    io,
    server,
    app,
    getReceiverSocketId,
};
