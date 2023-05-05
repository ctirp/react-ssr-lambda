// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import ReactDOMServer from "react-dom/server";
import SSRApp from "../SSRApp";
import config from "../config.json";
import axios from "axios";

const indexFile = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div>Rendered on Edge by zy used esr</div>
  </body>
</html>
`;

const handler = async function (event) {
  try {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    console.log("[zy]start  request.uri=",request.uri); 
    if (request.uri === "/edgessr") {
      // console.log("[zy]start edgessr request.uri=",request.uri);
      const url = config.SSRApiStack.apiurl;
      let start=new Date();
      const result = await axios.get(url);
      let apiWaste=new Date()-start;
      const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
      let esrWaste=new Date()-start;
      const html = indexFile.replace(
        '<div id="root"></div>',
        `<div id="root"><span>esr:apiWaste=${apiWaste} vs esrWaste=${esrWaste}</span> ${app}</div>`
      );
      return {
        status: "200",
        statusDescription: "OK",
        headers: {
          "cache-control": [
            {
              key: "Cache-Control",
              value: "max-age=100",
            },
          ],
          "content-type": [
            {
              key: "Content-Type",
              value: "text/html",
            },
          ],
        },
        body: html,
      };
    }else if(request.uri === "/edgessr2"){
      console.log("[zy]response=",Object.keys(response));
      console.log("[zy]response.body=",response.body);
      const url = config.SSRApiStack.apiurl;
      let start=new Date();
      const result = await axios.get(url);
      let apiWaste=new Date()-start;
      const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
      let esrWaste=new Date()-start;
      const html = indexFile.replace(
        '<div id="root"></div>',
        `<div id="root"><span>esr2:apiWaste=${apiWaste} vs esrWaste=${esrWaste}</span> ${app}</div>`
      );
      response.body=html;
      return response;
    } else {
      return request;
    }
  } catch (error) {
    console.log(`[zy]edge Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };
