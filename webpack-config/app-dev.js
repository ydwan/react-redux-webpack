/**
 * Created by zhongzhengkai on 16/4/11.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var devIP = DEV_HOST;
var devPort = 3999;
if (DEV_HOST.indexOf(':') != -1) {
  var arr = DEV_HOST.split(':');
  devIP = arr[0];
  devPort = arr[1];
}

var APP_NAME = process.env.APP_NAME;
console.log('the APP_NAME: ' + process.env.APP_NAME);
var entry_bundle_file = path.join(__dirname, '../src/lib/' + APP_NAME + '/main.js');
console.log ('entry_bundle_file for webpack-dev-server: '+entry_bundle_file);

var APP_ENV = 'dev';
if (!process.env.APP_ENV)APP_ENV = process.env.APP_ENV;

var API_HOST  = process.env.API_HOST ? process.env.API_HOST : 'http://localhost:4000';
console.log('the API_HOST: ' + API_HOST);

var webpackConfig = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + devIP + ':'+ devPort,
    'webpack/hot/only-dev-server',
    entry_bundle_file
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: '/static/',
    filename: APP_ENV+'.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot-loader/webpack', 'babel'], include: path.join(__dirname, '../src/lib/' + APP_NAME)},
      {test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=1&name=[path][name].[ext]'},
      {test: /\.css$/, loaders: ['style', 'raw'], include: path.join(__dirname, '../src/lib/' + APP_NAME)}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('path').join(__dirname,'../template-html/app-index.html')
    }),//这个插件不能少,生成一份虚拟的html文件放到webpack-dev-server中,否则会报错404
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__APP_ENV__': JSON.stringify(APP_ENV),
      '__API_HOST__': JSON.stringify(API_HOST)
    })
  ]
};


module.exports = webpackConfig;
