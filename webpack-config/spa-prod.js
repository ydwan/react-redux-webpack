
var webpack = require('webpack');
var path = require('path');

var __API_HOST__ = '';
var __PUBLIC_PATH__ = '';
if(process.env.API_HOST){
  __API_HOST__ = '//'+process.env.API_HOST;
}

console.log('__API_HOST__:'+__API_HOST__);
console.log('__PUBLIC_PATH__:'+__PUBLIC_PATH__);

var webpackConfig = {
  devtool: false,
  //参见 https://gaearon.github.io/react-hot-loader/getstarted/,
  entry: [
    path.join(__dirname,'../src/spa/main.js')
  ],
  output: {
    path: path.join(__dirname, '../../backend/www/public/web-app'),
    publicPath: __PUBLIC_PATH__,
    filename: 'spa-bundle.js'
  },
  //attention! 这里不能配置 exclude: /node_modules/, 要不然回编译错误
  module: {
    loaders: [
      //处理js文件的loader配置
      {test: /\.js$/,loaders: ['react-hot', 'babel'],include: path.join(__dirname, '../src/spa')},
      {test: /\.(woff|svg|eot|ttf)\??.*$/,loader: 'file-loader?limit=50000&name=[path][name].[ext]'},
      //处理css文件的loader配置
      {test: /\.css$/,loaders: ['style', 'raw'],include: path.join(__dirname, '../src/')}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __PUBLIC_PATH__: JSON.stringify(__PUBLIC_PATH__),
      __API_HOST__: JSON.stringify(__API_HOST__)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = webpackConfig;
