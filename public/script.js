
const socket = io();
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});

socket.on("newMessage", (message) => {
    console.log(`New Message: ${message.text}`);
    const time = moment(message.createdAt).format("LT");
    const div = document.createElement("div");
    div.setAttribute("class", "message");
    const template = $("#message-template").html();
    div.innerHTML = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: time
    });
    $("#all-messages").append(div);
});

socket.on("newLocationMessage", (message) => {
    console.log(`New Location Message: ${message.url}`);
    const time = moment(message.createdAt).format("LT");
    const div = document.createElement("div");
    div.setAttribute("class", "message");
    const template = $("#location-message-template").html();
    div.innerHTML = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: time
    });
    
    $("#all-messages").append(div);
});

$("#bt-send").click(() => {
    socket.emit("createMessage", {
        from: "user",
        text: $("#tf-message").val()
    }, (feedback) => {
        console.log(feedback);
    });

    return false;
});

$("#bt-location").click(() => {

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, (e) => {
        alert(e);
    });

    return false;
});
