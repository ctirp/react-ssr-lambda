module.exports = function responseBodyMock(len) {
    let dataLen = 500;
    if (len) {
        dataLen = len;
    }

    let responseBody = [],
        responseBodyFixed = [
            { id: -1, name: "item 1", desc: "product -1 us-east-1 description by zy", price: "1.00" },
        ];

    for (var i = dataLen; i--;) {
        responseBody[i] = {
            id: i,
            name: "flight " + i,
            desc: "flight " + i + " us-east-1 descriptio2:" + Math.random(),
            price: i + ".00"
        };

    }

    return responseBodyFixed.concat(responseBody);
}
