const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("A new user just connect");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("createMessage", (message) => {
        console.log(`New Message: ${message}`);
        message.createdAt = new Date().getTime();
        io.emit("newMessage", message);
    });

    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New User Joined!",
        createdAt: new Date().getTime()
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});