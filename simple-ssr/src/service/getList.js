import {invoke} from '../util/invoke';


async function getList(funcName,type){
    let start=new Date();
    funcName=funcName||"SSRApiStack-apiHandler8027B936-1j7eqtyufY1R";
    let result={data:[]};
    try {
        /**
         * res.result={
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            "body": "[{\"id\":-1,\"name\":\"item 1\",\"desc\":\"product -1 us-east-1 description by zy\",\"price\":\"1.00\"},{\"id\":0,\"name\":\"flight 0\",\"desc\":\"flight 0 us-east-1 descriptio2:0.6268714529131301\",\"price\":\"0.00\"}]"
        };
         */
        const res = await invoke(funcName,{zy:"zy-payolad",type:type});
        result.data=JSON.parse(res?.result?.body||"[]");
        //res keys= [ 'logs', 'result' ]
        console.log("[zy]invoke end,","res.logs=",res.logs);
    } catch (error) {
        console.log("[zy]invoke error,error=",error);
    }
    return result;
}
export {getList};