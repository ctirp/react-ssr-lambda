 
  module.exports = function responseBodyMock(len) {
    let dataLen = 500;
    if (len) {
        dataLen = len;
    }

    let responseBody = [],
        responseBodyFixed = [
            { id: -1, name: "item 1", desc: "product -1 op-se-1 description by zy", price: "3.00" },
        ];

    for (var i = dataLen; i--;) {
        responseBody[i] = {
            id: i,
            name: "flight " + i,
            desc: "flight " + i + " op-se-1 description:" + Math.random(),
            price: i + ".00"
        };

    }

    return responseBodyFixed.concat(responseBody);
}
