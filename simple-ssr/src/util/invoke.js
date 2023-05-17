import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { createClientForDefaultRegion } from "./create-client";


const invoke = async (funcName, payload) => {
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


export {invoke};