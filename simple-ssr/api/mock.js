module.exports = function responseBodyMock(len) {
    let dataLen = 500;
    if (len) {
        dataLen = len;
    }
    const aws_region=process.env.AWS_REGION;
    let responseBody = [],
        responseBodyFixed = [
            { id: -1, name: "item 1", desc: `product -1 ${aws_region|| "us-east-1-0"} description by zy`, price: "5.00" },
        ];

    for (var i = dataLen; i--;) {
        responseBody[i] = {
            id: i,
            name: "flight " + i,
            desc: "flight " + i + ` ${aws_region|| "us-east-1-0"} description:` + Math.random(),
            price: i + ".00"
        };

    }

    return responseBodyFixed.concat(responseBody);
}
