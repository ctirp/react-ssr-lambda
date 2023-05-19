

import React from "react";
import ReactDOMServer from "react-dom/server";
import SSRApp from "../SSRApp";
import config from "../config.json";
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
    <div>Rendered on Server by zy used ssr.</div>
  </body>
</html>`;

const handler = async function (event) {
  try {
    const aws_region=process.env.AWS_REGION;
    console.log("[zy]ssr start  aws_region=",aws_region,"event.path=",event.path);
    const url = config.SSRApiStack.apiurl;
    let start=new Date();
    let funcName="SSRApiStack-apiHandler8027B936-1j7eqtyufY1R";
    const result = await getList(funcName,"ssr");
    
    let apiWaste=new Date()-start;
    console.log("[zy]ssr end invoke","invokeWaste=",apiWaste,"result=",result);
 
    const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
    let ssrWaste=new Date()-start;
    const html = indexFile.replace(
      '<div id="root"></div>',
      `<div id="root"><span>aws_region=${aws_region} ssr:invokeWaste=${apiWaste} vs ssrWaste=${ssrWaste}</span>${app}</div>`
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch (error) {
    console.log(`Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };
 