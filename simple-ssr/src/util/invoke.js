import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { createClientForDefaultRegion } from "./create-client";


const invoke = async (funcName, payload) => {
    let start=new Date();
    const client = createClientForDefaultRegion(LambdaClient);
    const command = new InvokeCommand({
      FunctionName: funcName,
      Payload: JSON.stringify(payload),
      LogType: LogType.Tail,
    });
  
    const { Payload, LogResult } = await client.send(command);
    const result = Buffer.from(Payload).toJSON();//result={ type: 'Buffer', data: [ 1, 2, 3, 4, 5 ] }
    const logs = Buffer.from(LogResult, "base64").toString();
    console.log("[zy]invoke end,","invokeWaste=",new Date()-start);
    console.log("[zy]invoke end,","result=",result,"logs=",logs);
    return { logs, result:result.data };
  };

  const invoke2 = async (funcName, payload) => {
    const client = createClientForDefaultRegion(LambdaClient);
    const command = new InvokeCommand({
      FunctionName: funcName,
      Payload: JSON.stringify(payload),
      LogType: LogType.Tail,
    });
  
    const { Payload, LogResult } = await client.send(command);
    const result = Buffer.from(Payload).toString();
    const logs = Buffer.from(LogResult, "base64").toString();
    return { logs, result };
  };

export {invoke,invoke2};