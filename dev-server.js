/**
 * Created by zhongzhengkai on 16/7/17.
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var devIP = DEV_HOST;
var devPort = 4999;
if (DEV_HOST.indexOf(':') != -1) {
  var arr = DEV_HOST.split(':');
  devIP = arr[0];
  devPort = arr[1];
}

var APP_ENV = process.env.APP_ENV;
var APP_TYPE = process.env.APP_TYPE;
var WEBPACK_DEV_HOST = devIP + ':' + devPort;
console.log('the APP_ENV:' + APP_ENV);
console.log('the DEV_HOST:' + WEBPACK_DEV_HOST);

var config;

if (APP_ENV == 'dev') {
  if (APP_TYPE == 'cp')config = require('./webpack-config/cp-dev.js');
  if (APP_TYPE == 'app')config = require('./webpack-config/app-dev.js');
  else config = require('./webpack-config/spa-dev.js');
} else if (APP_ENV == 'prod') {
  if (APP_TYPE == 'cp')config = require('./webpack-config/cp-prod.js');
  if (APP_TYPE == 'app')config = require('./webpack-config/app-prod.js');
  else config = require('./webpack-config/spa-prod.js');
} else {
  throw new Error('can not find webpack configure file for APP_ENV:' + APP_ENV);
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(devPort, devIP, function (err) {
  if (err) console.log(err);
  console.log('webpack devServer Listening at ' + devIP + ':' + devPort);
});

