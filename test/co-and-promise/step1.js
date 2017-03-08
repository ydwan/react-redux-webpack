/**
 * Created by zhongzhengkai on 2016/12/8.
 * 理解generator函数
 */

//定义一个generator函数,
// console.log( gen.prototype.toString() ) ---> [object Generator]
// console.log( gen.__proto__ ) ---> GeneratorFunction {}
function *gen(){
  console.log('stop before yield 1');

  // 第一次next()调用完毕后,yield 后面的内容已经包装为 {value: ** ,done: false} 返回给外部,
  // 因为这里后面是一个1,此时函数没有执行完毕
  // 所以外部得到的对象为 { value: '1', done: false }
  yield 1;
  console.log('stop before yield 2,yield 1 already been wrapped and return out!');
  yield 2;
  console.log('stop before yield 3,yield 2 already been wrapped and return out!!');
  yield 3;
  console.log('stop before yield 4,yield 3 already been wrapped and return out!!');
  yield 4;
  console.log('all things done');
}

var genIns = gen();//调用gen(),获得一个generator函数的实例,即生成器

// 通过调用next()驱动genIns执行函数体里的内容,
// 若在函数体内遇到yield关键字,执行该yield后的内容后,
// 生成器停止执行函数,并保留函数现场,并将
// 根据上面的说法,结合函数体,可看到有内部有4个yield关键字,会停止4次,
// 所以需要调用五次next()来驱动改生成器执行完毕函数体内的内容
// <yield left> = yield <yield right>

console.log(genIns.next());//{ value: '1', done: false }
console.log(genIns.next());//{ value: '2', done: false }
console.log(genIns.next());//{ value: '3', done: false }
console.log(genIns.next());//{ value: '4', done: false }
console.log(genIns.next());//{ value: undefined, done: true }




