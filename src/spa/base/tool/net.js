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
