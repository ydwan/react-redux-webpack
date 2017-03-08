/**
 * Created by zhongzhengkai on 16/7/20.
 */


console.log('---------------------------------------------------------');
console.log('__APP_ENV__:' + __APP_ENV__);
console.log('---------------------------------------------------------');

if(__APP_ENV__=='dev'){
  module.exports = require('./store.dev');
}else{
  module.exports = require('./store.prod');
}

//export * from './store.dev';
//if(__APP_ENV__=='dev'){
//  export * from './store.dev';
//}else{
//  export * from './store.prod';
//}