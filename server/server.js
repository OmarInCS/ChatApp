const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const {genereateMessage, genereateLocationMessage} = require("./utils/message");

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

    socket.on("createMessage", (message, callback) => {
        console.log(`New Message: ${message}`);
        io.emit("newMessage", genereateMessage(message.from, message.text));
        // callback();
    });

    socket.on("sendLocation", (coords) => {
        io.emit("newLocationMessage", genereateLocationMessage("Admin", coords.lat, coords.lng));
    });

    socket.emit("newMessage", genereateMessage("Admin", "Welcome to the chat app!"));

    socket.broadcast.emit("newMessage", genereateMessage("Admin", "New User Joined!"));

    
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});