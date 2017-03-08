/**
 * 运行 CP_NAME={dir}/{name} npm run build:cp 单独为某个组件打包,
 * 确保该组件下有一个main文件
 * @type {webpack|exports|module.exports}
 */

var webpack = require('webpack');
var path = require('path');

var __API_HOST__ = '';
var __PUBLIC_PATH__ = '';
if(process.env.API_HOST){
  __API_HOST__ = '//'+process.env.API_HOST;
}

var CP_NAME = process.env.CP_NAME;
console.log('the CP_NAME:'+process.env.CP_NAME);
var CP_DIR = CP_NAME.split('/')[0];

console.log('__API_HOST__:'+__API_HOST__);


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
    path.join(__dirname,'../src/lib/'+CP_DIR+'/main.js')
  ],
  output: {
    path: path.join(__dirname, '../../backend/www/public/web-app'),
    publicPath: __PUBLIC_PATH__,
    filename: CP_NAME+'.js'
  },
  module: {
    loaders: [
      //处理js文件的loader配置
      {test: /\.js$/,loaders: ['react-hot', 'babel'],
        include: [
          //path.join(__dirname, '../src/lib/default'),
          //path.join(__dirname, '../src/lib/'+CP_NAME),
          path.join(__dirname, '../src/lib/'+CP_DIR)
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1&name=../assets/fonts/'+CP_DIR+'/[name].[ext]',
        include: path.join(__dirname, '../assets/fonts/'+CP_DIR)
      },
      //处理css文件的loader配置
      {test: /\.css$/,loaders: ['style', 'raw'],include: path.join(__dirname, '../src/lib/'+CP_DIR)}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
