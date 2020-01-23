const moment = require("moment");

function genereateMessage(from, text) {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
}

function genereateLocationMessage(from, lat, lng) {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    };
}


module.exports = {
    genereateMessage,
    genereateLocationMessage
};