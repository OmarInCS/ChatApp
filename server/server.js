const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const {genereateMessage, genereateLocationMessage} = require("./utils/message");
const users = require("./utils/users");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("A new user just connect");

    socket.on("disconnect", () => {
        // console.log("A user disconnected");
        let user = users.removeUser(socket.id);
        io.to(user.room).emit("updateUsersList", users.getNamesOfUsersInRoom(user.room));
        io.to(user.room).emit("newMessage", genereateMessage("Admin", `${user.name} has lef the room`));
    });

    socket.on("createMessage", (message, callback) => {
        // console.log(`New Message: ${message}`);
        let user = users.getUser(socket.id);
        io.to(user.room).emit("newMessage", genereateMessage(user.name, message));
        // callback();
    });

    socket.on("sendLocation", (coords) => {
        let user = users.getUser(socket.id);
        io.to(user.room).emit("newLocationMessage", genereateLocationMessage(user.name, coords.lat, coords.lng));
    });

    
    socket.on("join", (params, callback) => {
        console.log("-------- Join -------")
        console.log(params.room);
        socket.join(params.room);
        
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit("updateUsersList", users.getNamesOfUsersInRoom(params.room));
        
        socket.emit("newMessage", genereateMessage("Admin", "Welcome to the chat app!"));

        socket.broadcast.to(params.room).emit("newMessage", genereateMessage("Admin", `${params.name} joined the room!`));


    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});