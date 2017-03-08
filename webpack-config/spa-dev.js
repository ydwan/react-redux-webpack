/**
 * Created by zhongzhengkai on 16/7/17.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var __API_HOST__ = 'http://localhost:4000';//方便去访问别人的主机调试代码
//var __PUBLIC_PATH__ = 'http://cdn.boldseas.com/app';//for cdn
var __PUBLIC_PATH__ = '';//for local
if(process.env.API_HOST){
  __API_HOST__ = 'http://'+process.env.API_HOST;
}
if(process.env.PUBLIC_PATH){
  __PUBLIC_PATH__ = 'http://'+process.env.PUBLIC_PATH;
}else{
  __PUBLIC_PATH__ = __API_HOST__;//不指定PUBLIC_PATH的话,默认和API_HOST一样
}

console.log('__API_HOST__:'+__API_HOST__);
console.log('__PUBLIC_PATH__:'+__PUBLIC_PATH__);


var webpackConfig = {
  //参见 http://www.cnblogs.com/hhhyaaon/p/5657469.html,开发工具使用eval模式可以大大提高构建速度
  //同时可以在浏览器的source里看到代码结构
  devtool: 'eval',
  //参见 https://gaearon.github.io/react-hot-loader/getstarted/,
  entry: [
    'webpack-dev-server/client?http://'+DEV_HOST+':3999',
    'webpack/hot/only-dev-server',
    path.join(__dirname,'../src/spa/main.js')
  ],
  //调试状态,path和publicPath都是虚拟在内存中的目录
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: '/static/',
    filename: 'spa-bundle.js'
  },
  //attention! 这里不能配置 exclude: /node_modules/, 要不然回编译错误
  module: {
    loaders: [
      //处理js文件的loader配置
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, '../src/')
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'file-loader?limit=50000&name=[path][name].[ext]'
      },
      //处理css文件的loader配置
      {
        test: /\.css$/,
        loaders: ['style', 'raw'],
        include: path.join(__dirname, '../src/')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),//这个插件不能少,生成一份虚拟的html文件放到webpack-dev-server中,否则会报错404
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __APP_ENV__: JSON.stringify('dev'),
      __API_HOST__: JSON.stringify(__API_HOST__)
    })
  ]
};

module.exports = webpackConfig;
