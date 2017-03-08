/**
 * Created by zhongzhengkai on 2016/11/8.
 */

import 'whatwg-fetch'


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(response);
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    error.status = response.status;
    throw error;
  }
}

function parseJSON(response) {
  if (response.url.indexOf('download') != -1)return '';
  else return response.json();
}


//method - 使用的HTTP动词， GET , POST , PUT , DELETE , HEAD
//url - 请求地址，URL of the request
//headers - 关联的Header对象
//referrer - referrer
//mode - 请求的模式，主要用于跨域设置， cors , no-cors , same-origin
//credentials - 是否发送Cookie omit , same-origin
//redirect - 收到重定向请求之后的操作， follow , error , manual
//integrity - 完整性校验
//cache - 缓存模式( default , reload , no-cache )

/**
 *
 * @param path
 * @param options {object}
 * @param options.method {string}
 * @param options.body {object} 当method为POST时,要提交的数据
 * @param cb
 * @returns {*}
 */
export function doRequest(path, options, cb) {
  fetch(path, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(function (reply) {
      cb(null, reply);
    })
    .catch(function (error) {
      cb(error, null);
    });
}
