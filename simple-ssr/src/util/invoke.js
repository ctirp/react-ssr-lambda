import { InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";
import { createClientForDefaultRegion } from "./create-client";

  const invokeCore = async (funcName, payload) => {
    let start=new Date();
    let result = "",logs = ""; 
    try {
      const client = createClientForDefaultRegion(LambdaClient);
      const command = new InvokeCommand({
        FunctionName: funcName,
        Payload: JSON.stringify(payload),
        LogType: LogType.Tail,
      });
    
      const { Payload, LogResult } = await client.send(command);
      result = Buffer.from(Payload).toString();
      logs = Buffer.from(LogResult, "base64").toString();
      console.log("[zy]invokeCore end,","invokeCoreWaste=",new Date()-start,"str result=",result.substring(0,100));
      // console.log("[zy]invoke end,","logs=",logs);
    } catch (error) {
      console.log("[zy]invokeCore error,","error=",error);
    }
    return { logs, result };
  };
  const invoke = async (funcName, payload) => {
    let start=new Date();
    return invokeCore(funcName, payload).then((res)=>{
      let data;
      try {
        let result=JSON.parse(res?.result||"{}");
        if(result.statusCode==200){
          data=result?.body;
          if(typeof data==="string"){
              data=JSON.parse(data);
          }
        }else{
          console.log("[zy]invoke error,","statusCode=",result.statusCode);
        }
      } catch (error) {
        console.log("[zy]invoke error,","error=",error);
      }
      console.log("[zy]invoke end,","invokeWaste=",new Date()-start,"data type=",typeof data);
      return data;
    });
  };

  const invoke2 = async (funcName, payload) => {
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
    console.log("[zy]invoke2 end,","invokeWaste=",new Date()-start);
    console.log("[zy]invoke2 end,","result=",result,"logs=",logs);
    return { logs, result:result.data };
  };
export {invoke,invoke2,invokeCore};