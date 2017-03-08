// 回顾step3代码所示,生成器启动后,生成器函数里的内容的执行只要遇到yield关键字,
// 就会暂停,将函数的控制权交给外部,外部的生成器调用next(),又会跳入到函数体内继续,
// 直到遇到下一个yield关键字,yield右边的内容我们暂且称之为yield-body,控制权交给
// 外部时,会包装一个{value:<yield-body>,done:[true/false]}的对象返回出去

// 我们将step3里的yield-body,稍加改造,变成一个异步函数,看看用生成器执行异步函数带来的奇妙效果

// 这就是我们刻意造的yield-body
function readFile(fileName) {
  return function (cb) {
    require('fs').readFile(fileName, cb);
  }
}

function *gen4() {
  var ret = '';
  //<<<------ inner
  try{
    var content1 = yield readFile('./file1.txt');
    ret += 'content form file1:' + content1;
    var content2 = yield readFile('./file2.txt');
    ret += 'content form file2:' + content2;
    return ret;
  }catch(ex){
    console.log('ex:',ex);
  }
  //------>>>
}

//<<<------ outer
var genIns4 = gen4();
var yieldBody = genIns4.next();//启动生成器函数
yieldBody.value((err, content)=>{
  if(err) genIns4.throw(err);
  yieldBody = genIns4.next(content);
  yieldBody.value((err, content)=>{
    if(err) genIns4.throw(err);
    yieldBody = genIns4.next(content);
    console.log(yieldBody);
  });
});
//------>>>

// 运行这段函数,可以看到,尽管外部还是回调套回调的逻辑,
// 但是生成器内部的函数体,可阅读性和可维护性已经非常爽了
// 而外部的逻辑,几乎就是在




