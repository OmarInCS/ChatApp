const socket = io();
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});

socket.on("newMessage", (message) => {
    console.log(`New Message: ${message.text}`);
    const div = document.createElement("div");
    div.innerText = `${message.from}: ${message.text}`;
    $("#all-messages").append(div);
});

socket.on("newLocationMessage", (message) => {
    console.log(`New Location Message: ${message.url}`);
    const div = document.createElement("div");
    const a = document.createElement("a");
    a.innerText = `${message.from}: My Current Location`;
    a.setAttribute("target", "_blank");
    a.setAttribute("href", `${message.url}`);
    div.appendChild(a);
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
