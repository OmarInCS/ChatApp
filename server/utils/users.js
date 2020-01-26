
let users = [];

function addUser(id, name, room) {
    let user = {id, name, room};
    users.push(user);
}

function getNamesOfUsersInRoom(room) {
    let roomUsers = users.filter((user) => user.room === room);
    let userNames = roomUsers.map((user) => user.name);

    return userNames;
}

function getUser(id) {
    return users.filter((user) => user.id === id)[0];
}

function removeUser(id) {
    user = getUser(id);
    users = users.filter((user) => user.id != id);
    return user;
}



module.exports = {
    addUser,
    getNamesOfUsersInRoom,
    getUser,
    removeUser
};