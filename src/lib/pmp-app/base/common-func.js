/**
 * Created by zhongzhengkai on 2016/12/26.
 */


import {doRequest} from './tool/net';
import {SHOW_LOADING,HIDE_LOADING} from '../constants/action-name';

export const getCSSPixelWidth = ()=>{
  //var screenWidth = screen.width;
  //var dpr = window.devicePixelRatio;
  //var appWidth = screenWidth/1;
  //console.log('----->screenWidth:'+screenWidth+', devicePixelRatio:'+dpr);

  //console.log(document.getElementById('root').offsetHeight);
  var appWidth = document.getElementById('root').offsetWidth;
  return appWidth;
};


//mode属性用来决定是否允许跨域请求，以及哪些response属性可读。可选的mode属性值为same-origin，no-cors（默认）以及cors。
var mode = 'cors';
var urlPrefix = '';

export const doGet = (path, cb, dispatch)=> {
  request(path, {method: 'GET',mode}, cb, dispatch);
};

export const doPost = (path, toPost, cb, dispatch)=> {
  request(path, {method: 'POST', body: toPost, mode}, cb, dispatch);
};

function request(path, options, cb, dispatch) {
  dispatch({type: SHOW_LOADING});
  doRequest(urlPrefix + path, options, (err, reply)=> {
    dispatch({type: HIDE_LOADING});
    console.log('------> request reply:' + path, reply, err);
    if (err) {
    } else if (reply.err) {
      if (reply.isErrThrow)cb(reply.data, reply.err);
      else alert(err)
    } else {
      cb(reply.data);
    }
  });
}
