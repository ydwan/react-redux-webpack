

//让我们稍稍变化一下函数,每一个yeild关键字左边都写上一个变量
function *gen2(){
  console.log('stop before yield 1');

  // 如果第二次next()调用传了一个参数,如next(10)
  // 那么此时,生成器会将10赋值给第一个yield左面的变量
  var y1 = yield 1;
  console.log('stop before yield 2,yield 1 already been wrapped and return out!!',y1);

  //第三次next()调用传递的参数复制给第二个yield左边的变量
  var y2 = yield 2;
  console.log('stop before yield 3,yield 2 already been wrapped and return out!!',y2 );
  var y3 = yield 3;
  console.log('stop before yield 4,yield 3 already been wrapped and return out!!',y3);
  var y4 = yield 4;
  console.log('all things done',y4);
}

var genIns2 = gen2();//调用gen(),获得一个generator函数的实例,即生成器
console.log(genIns2.next(11));
console.log(genIns2.next(111));
console.log(genIns2.next(1111));
console.log(genIns2.next(11111));
console.log(genIns2.next(111111,22222));//111111会被赋值给y4,22222传进去无意义

// 根据上面函数体内的讲解,可以在脑海里构思出函数函数的执行步骤了,
// 第一次next()调用,函数从函数入口开始执行到到第一个yield右边就结束,
// 并把yield右边的内容包装为 {value:1,done:false} 返回出去

// 第二次next()调用,将next()传递的值赋值给第一个yield左边的变量,然后继续往下执行
// 执行到第二个yield右边就结束,并把yield右边的内容包装为 {value:2,done:false} 返回出去

// 如此循环,直到函数体执行结束,由此可见第一个next()传递值是无意义的,其他的next()若传值,就会
// 赋值给上一个yield的左边的变量(若在yield左边有定义变量)
// 由此可见,外部可以主动地控制驱动生成器内部的函数体执行步骤,并传真给函数体内部yield关键字左边的变量

// 这个函数的执行步骤,我们看到的现象可总结为:
// 1 函数体内部有4个yield
// 2 需要外部5次next()调用驱动其完成
// 4 第1次next()调用,负责启动生成器,往里面传参数是无意思的
// 5 next()函数只支持传入一个参数,其他参数传进去是无意义的
// 5 第n次next()调用,在生成器函数体内部遇到地n个yield就停止,并把yield右边的内容包装为{value:<value>,done:[true/false]}返回出去
// 6 第5次next()调用,函数体内不再有yield关键字让其停下来,整个函数体执行完毕,最后返回的对象为{ value: undefined, done: true }
// 7 第n次next()调用的传值赋值给第n-1个yield左边的变量,注:n>=2


