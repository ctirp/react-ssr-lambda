 const dataLen=5000;
 const responseBody = [
    { id: -1, name: "item 1", desc: "product -1 description by zy", price: "1.00" },
    { id: -2, name: "item 2", desc: "product -2 description", price: "2.00" },
  ];
    
for (var i = dataLen; i--; ) {
    responseBody[i]={
        id: i, 
        name: "flight "+i, 
        desc: "flight "+i+" description", 
        price: i+".00"
    };
    
}
    
  
  module.exports=responseBody;