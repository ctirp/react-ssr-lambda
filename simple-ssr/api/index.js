// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
let responseBodyMock=require("./mock");
exports.handler = async (event) => {
  const responseCode = 200;
  const responseBody = responseBodyMock(500)||[
    { id: 1, name: "item 1", desc: "product 1 description by zy", price: "1.00" },
    { id: 2, name: "item 2", desc: "product 2 description", price: "2.00" },
    { id: 3, name: "item 3", desc: "product 3 description", price: "3.00" },
  ];
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };
  const response = {
    statusCode: responseCode,
    headers: headers,
    body: JSON.stringify(responseBody),
  };
  console.log("[zy]api---mock.length",responseBody.length,responseBody[1]);
  return response;
};

