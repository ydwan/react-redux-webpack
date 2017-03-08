
function *gen3(){
  var ret1 = yield add(1,2);
  console.log(ret1);
  var ret2 = yield add(10,20);
  console.log(ret2);
  var ret3 = yield add(100,200);
  console.log(ret3);
}
var genIns3 = gen3();

var yieldBody = genIns3.next();

//由step2解释可知,yieldBody.value此时指向的是一个函数,
//在这里我们直接调用yieldBody.value(),将其结果赋值给ret1
var yieldBody2 = genIns3.next(yieldBody.value());

//调用yieldBody2.value(),将其结果赋值给ret2
var yieldBody3 = genIns3.next(yieldBody2.value());

//调用yieldBody3.value(),将其结果赋值给ret3
genIns3.next(yieldBody3.value());

function add(x, y){
  return function(){
    return x + y ;
  }
}
