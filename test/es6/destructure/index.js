/**
 * Created by zhongzhengkai on 2016/11/10.
 */

//destructure

//对象解构
var {name,age,clazz} = {name: 'zzk', age: 1, clazz: 2};
var {name:myName,age:myAge,clazz:myClazz} = {name: 'zzk', age: 1, clazz: 2};
var {name:myName,age:myAge,clazz:myClazz=6} = {name: 'zzk', age: 1};

//创建json对象
var student = {name,age,clazz};//== var student = {name:name,age:age,clazz:clazz}

//数组结构
var [name,age] = ['zzk',22];

//利用解构完成函数参数动态匹配
var composeHostPath = ({ip,port,path='index'})=>{
  return `${ip}:${port}/${path}`
};
console.log(composeHostPath({port:3333,ip:'111.22.52.23',path:'v1/get/books'}));//111.22.52.23:3333/v1/get/books
console.log(composeHostPath({port:3333,ip:'111.22.52.23'}));//111.22.52.23:3333/index

//利用解构完成函数参数多值返回
var getHostNamePort = (host)=>{
  return host.split(':');
};
var [hostName, port] = getHostNamePort('111.22.52.23:5555');
console.log(hostName,port);//111.22.52.23 5555


function initMysqlHelper(ip, port=3306){
  //todo: logical code
}
initMysqlHelper('localhost');

function foo(param1, param2, ...args){
  console.log(param1,param2,args);
}
foo(1,2);//1 2 []
foo(1,2,3,4,5);//1 2 [ 3, 4, 5 ]

var {name,age,clazz} = {name: 'zzk', age: 1, clazz: 2};
