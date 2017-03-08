/**
 * Created by zhongzhengkai on 2016/11/8.
 */

import { doRequest } from './tool/net';
import { cry } from './tool/dlg';
import { SHOW_LOADING, HIDE_LOADING } from '../constants/action-name';


//mode属性用来决定是否允许跨域请求，以及哪些response属性可读。可选的mode属性值为same-origin，no-cors（默认）以及cors。
var mode = '';
// var urlPrefix = '';
mode = 'cors';
var urlPrefix = __API_HOST__;
if (__APP_ENV__ == 'dev') {
  mode = 'cors';
  urlPrefix = __API_HOST__;
} else {
  //mode = 'no-cors';
  mode = 'cors';
  urlPrefix = '';
}

export const doGet = (path, cb, dispatch) => {
  dispatch({ type: SHOW_LOADING });
  doRequest(urlPrefix + path, {}, (err, reply) => {
    dispatch({ type: HIDE_LOADING });
    console.log('----------->doGet:' + path, err, reply);
    if (err) {
      cry(err);
    } else if (reply.err) {
      if (reply.isErrThrow) cb(reply.data, reply.err);
      else cry(reply.err);
    } else {
      cb(reply.data);
    }
  });
};


export const doPost = (path, body, cb, dispatch) => {
  if (dispatch) { dispatch({ type: SHOW_LOADING }); }
  doRequest(urlPrefix + path, { method: 'POST', body }, (err, reply) => {
    if (dispatch) { dispatch({ type: HIDE_LOADING }); }
    console.log('----------->doGet:' + path, err, reply);
    if (err) {
      cry(err);
    } else if (reply.err) {
      if (reply.isErrThrow) cb(reply.data, reply.err);
      else cry(reply.err);
    } else {
      cb(reply.data);
    }
  });
};