/**
 * Created by zhongzhengkai on 2016/11/9.
 */

import React from 'react';
import {render} from 'react-dom';
//import {default as DevComponent} from './input-select/InputSelect';

console.debug('start render DevComponent');
var root = document.getElementById('root');
if(!root){
  document.write('<div id="root"></div>');
  root = document.getElementById('root');
}


var componentDir = __CP_NAME__;//欲调试的组件名
if(!componentDir) throw new Error('env:CP_NAME is missing');
try{
  var DevComponent;
  if(componentDir.indexOf('/')!=-1){//具体指向了某个文件,就不在分析是index入口还是test-page入口
    DevComponent = require('./'+componentDir).default
  }else{
    var componentName = componentDir.split('-').map(v=> upperCaseFirstLetter(v)).join('');//input-select --> InputSelect
    DevComponent = require('./'+componentDir+'/'+componentName).default;
  }

  render(<DevComponent />, root);
}catch(ex){
  DevComponent = require('./default/Default').default;
  render(<DevComponent msg={ex.message}/>, root);
}

function upperCaseFirstLetter(str){ // 正则法
  str = str.toLowerCase();
  var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
  return str.replace(reg,function(m){
    return m.toUpperCase()
  });
}