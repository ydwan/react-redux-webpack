/**
 * 运行 CP_NAME={dir}/{name} npm run build:cp 单独为某个组件打包,
 * 确保该组件下有一个main文件
 * @type {webpack|exports|module.exports}
 */

//var webpack = require('webpack');
//var path = require('path');
//
//console.log('------------------------------------------');
//console.log('execute build command for file: app-prod.js');
//console.log('------------------------------------------');
//
//var API_HOST = '';
//var __PUBLIC_PATH__ = '';
//if(process.env.API_HOST){
//  API_HOST = process.env.API_HOST;
//}
//console.log('__API_HOST__:' + API_HOST);
//
//var APP_NAME = process.env.APP_NAME;
//console.log('APP_NAME:' + APP_NAME);
//
//if(process.env.PUBLIC_PATH){
//  __PUBLIC_PATH__ = '//'+process.env.PUBLIC_PATH;
//}else{
//  //不指定PUBLIC_PATH的话,默认就是指向assets目录
//  __PUBLIC_PATH__ = path.join(__dirname,'../assets/'+APP_NAME);
//}
//console.log('__PUBLIC_PATH__:'+__PUBLIC_PATH__);
//
//var webpackConfig = {
//  devtool: false,
//  entry:[
//    path.join(__dirname,'../src/lib/'+APP_NAME+'/main.js')
//  ],
//  output: {
//    path: path.join(__dirname, '../../backend/www/public/web-app'),
//    publicPath: __PUBLIC_PATH__,
//    filename: APP_NAME+'.js'
//  },
//  module: {
//    loaders: [
//      //处理js文件的loader配置
//      {test: /\.js$/,loaders: ['react-hot', 'babel'],
//        include: [
//          //path.join(__dirname, '../src/lib/default'),
//          //path.join(__dirname, '../src/lib/'+CP_NAME),
//          path.join(__dirname, '../src/lib/'+APP_NAME)
//        ]
//      },
//      {
//        test: /\.(woff|svg|eot|ttf)\??.*$/,
//        loader: 'url-loader?limit=1&name=../assets/fonts/'+APP_NAME+'/[name].[ext]',
//        include: path.join(__dirname, '../assets/fonts/'+APP_NAME)
//      },
//      //处理css文件的loader配置
//      {test: /\.css$/,loaders: ['style', 'raw'],include: path.join(__dirname, '../src/lib/'+APP_NAME)}
//    ]
//  },
//  plugins: [
//    new webpack.DefinePlugin({
//      'process.env.NODE_ENV': JSON.stringify('production'),
//      '__APP_ENV__':JSON.stringify('prod'),
//      '__API_HOST__': JSON.stringify(API_HOST)
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      compress: {
//        warnings: false
//      }
//    })
//  ]
//};
//
//webpackConfig.externals = {
//
//};
//
//module.exports = webpackConfig;


var webpack = require('webpack');
var path = require('path');
console.log('------------------------------------------');
console.log('execute build command for file: app-prod.js');
console.log('------------------------------------------');
var __API_HOST__ = '';
var __PUBLIC_PATH__ = '';
if(process.env.API_HOST){
  __API_HOST__ = '//'+process.env.API_HOST;
}
console.log('__API_HOST__:' + __API_HOST__);
var APP_NAME = process.env.APP_NAME;
console.log('APP_NAME:' + APP_NAME);
if(process.env.PUBLIC_PATH){
  __PUBLIC_PATH__ = '//'+process.env.PUBLIC_PATH;
}else{
  //不指定PUBLIC_PATH的话,默认就是指向assets目录
  __PUBLIC_PATH__ = path.join(__dirname,'../assets');
}
console.log('__PUBLIC_PATH__:'+__PUBLIC_PATH__);
var webpackConfig = {
  devtool: false,
  entry:[
    path.join(__dirname,'../src/lib/'+APP_NAME+'/main.js')
  ],
  output: {
    path: path.join(__dirname, '../../backend/www/public/web-app'),
    publicPath: __PUBLIC_PATH__,
    filename: APP_NAME+'.js'
  },
  module: {
    loaders: [
      //处理js文件的loader配置
      {test: /\.js$/,loaders: ['react-hot', 'babel'],
        include: [
          //path.join(__dirname, '../src/lib/default'),
          //path.join(__dirname, '../src/lib/'+CP_NAME),
          path.join(__dirname, '../src/lib/'+APP_NAME)
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1&name=../assets/fonts/'+APP_NAME+'/[name].[ext]',
        include: path.join(__dirname, '../assets/fonts/'+APP_NAME)
      },
      //处理css文件的loader配置
      {test: /\.css$/,loaders: ['style', 'raw'],include: path.join(__dirname, '../src/lib/'+APP_NAME)}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__APP_ENV__':JSON.stringify('prod')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
webpackConfig.externals = {
};
module.exports = webpackConfig;
