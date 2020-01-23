const {genereateMessage, genereateLocationMessage} = require("./message");

describe("Generate Message", () => {
    it("Should generate correct message object", () => {
        const from = "Abbas",
                text = "Hello World",
                message = genereateMessage(from, text);

        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from, text});
    });

    it("Should generate correct location message object", () => {
        const from = "Abbas",
                lat = 23,
                lng = 46,
                url = `https://www.google.com/maps?q=${lat},${lng}`,
                message = genereateLocationMessage(from, lat, lng);

        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from, url});
    });
});