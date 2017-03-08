/**
 * Created by zhongzhengkai on 2016/12/8.
 */

var fs = require('fs'), co = require('co'), thunkify = require('thunkify');

var readFile = thunkify(fs.readFile);

co(function *() {
  try{
    var file1 = yield readFile('./file0.txt');
    var file2 = yield readFile('./file2.txt');
    var content = file1.toString() + file2.toString();
    console.log(content);
  }catch(e){
    console.log('------> catch error <------');
    console.log(e);
  }
});
