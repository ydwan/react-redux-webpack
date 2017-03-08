


require('http').createServer((req,res)=>{

var _data = '';
req.on('data',(chunk)=>_data+=chunk);
req.on('end',()=>{
  console.log('this is post data: '+_data);
})

}).listen(4000,()=>console.log('run'));


