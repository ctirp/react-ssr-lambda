// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import ReactDOMServer from "react-dom/server";
import SSRApp from "../SSRApp";
import config from "../config.json";
import axios from "axios";
import {getList} from '../service/getList';

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
/**
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
*/
const handler = async function (event) {
  try {
    const request = event.Records[0].cf.request;
    // const response = event.Records[0].cf.response;
    // console.log("[zy]no response=",response);
    const aws_region=process.env.AWS_REGION;
    console.log("[zy]esr start  request.uri=",request.uri,"aws_region=",aws_region,"clientIp=",request.clientIp); 
    if (request.uri === "/edgessr") {
      // console.log("[zy]process.env=",Object.keys(process.env),"request=",Object.keys(request));
      console.log("[zy]request.querystring=",request.querystring,"origin=",request.origin);
      const url = config.SSRApiStack.apiurl;
      let start=new Date();
      const result = await axios.get(url);
      let apiWaste=new Date()-start;
      const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
      let esrWaste=new Date()-start;
      const html = indexFile.replace(
        '<div id="root"></div>',
        `<div id="root"><span>aws_region=${aws_region} esr:apiWaste=${apiWaste} vs esrWaste=${esrWaste}</span> ${app}</div>`
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
    }else if(request.uri === "/edgessrinvoke"){
      console.log("[zy]start edgessrinvoke,event=",Object.keys(event));
      // console.log("[zy]event.Records=",event.Records.length);
      // console.log("[zy]event.Records[0].cf=",Object.keys(event.Records[0].cf));
      //[zy]event.Records[0].cf= [ 'config', 'request' ]
      console.log("[zy]event.Records[0].cf.config=",Object.keys(event.Records[0].cf.config));
      
      const url = config.SSRApiStack.apiurl;
      let start=new Date();
      const funcNameMap={
        "us-east-1":"SSRApiStack-apiHandler8027B936-1j7eqtyufY1R",
        "us-east-2":"SSRApiStack-apiHandler8027B936-1j7eqtyufY1R",
        "ap-southeast-1":"SSRApiStack-apiHandler8027B936-MwbDpRPGIvWW",
        "us-northeast-1":"SSRApiStack-apiHandler8027B936-MwbDpRPGIvWW",
        "us-northeast-2":"SSRApiStack-apiHandler8027B936-MwbDpRPGIvWW",
        "eu-central-1":"SSRApiStackFr2-apiHandler8027B936-rOKlZn8v44sP",
        "eu-west-2":"SSRApiStackFr2-apiHandler8027B936-rOKlZn8v44sP",
      };
      let funcName=funcNameMap[aws_region]||"SSRApiStack-apiHandler8027B936-1j7eqtyufY1R";
      const result = await getList(funcName,"edgessrinvoke");
      let apiWaste=new Date()-start;
      console.log("[zy]ssr end invoke,","invokeWaste=",apiWaste,"result=",Object.keys(result));

      const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
      let esrWaste=new Date()-start;
      const html = indexFile.replace(
        '<div id="root"></div>',
        `<div id="root"><span>aws_region=${aws_region} edgessrinvoke:invokeWaste=${apiWaste} vs esrWaste=${esrWaste}</span> ${app}</div>`
      );
      // response.body=html;
      // return response;
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
      
    } else {
      return request;
    }
  } catch (error) {
    console.log(`[zy]edge Error ${error.message}`);
    //[zy]edge Error Cannot convert undefined or null to object
    return `Error ${error}`;
  }
};

export { handler };
