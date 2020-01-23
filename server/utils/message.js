
function genereateMessage(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}

function genereateLocationMessage(from, lat, lng) {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    };
}


module.exports = {
    genereateMessage,
    genereateLocationMessage
};