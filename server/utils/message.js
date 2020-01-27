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
        mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.9350464011445!2d${lat}!3d${lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ1JzQ4LjMiTiA0NsKwNDUnMzguMCJF!5e0!3m2!1sen!2ssa!4v1580033893097!5m2!1sen!2ssa`,
        createdAt: moment().valueOf()
    };
}


module.exports = {
    genereateMessage,
    genereateLocationMessage
};