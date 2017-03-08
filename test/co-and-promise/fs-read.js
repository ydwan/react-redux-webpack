/**
 * Created by zhongzhengkai on 2016/12/8.
 */


var fs = require('fs');

//var co = require('co');
//var readFile = function (fileName){
//  return new Promise(function (resolve, reject){
//    console.log('Promise readFile');
//    fs.readFile(fileName, function(error, data){
//      console.log('Promise readFile');
//      if (error) reject(error);
//      resolve(data);
//    });
//  });
//};
//
//var gen = function* (){
//  console.log('step 1');
//  var f1 = yield readFile('./file1.txt');
//  console.log('step 2');
//  var f2 = yield readFile('./file2.txt');
//  console.log('step 3');
//  console.log(f1.toString());
//  console.log(f2.toString());
//};

//var ret = gen();
//ret.next();

//ret.next();
//ret.next();

function readFile(fileName){
//var readFile = function(fileName){
  fs.readFile(fileName, function(error, data){
    gen.next(data.toString());
  });
};

function* main() {
  console.log(yield readFile('./file1.txt'));
  console.log(yield readFile('./file2.txt'));
}

var gen = main();
gen.next();
