/**
 * Created by zhongzhengkai on 16/4/11.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var DEV_HOST = process.env.DEV_HOST ? process.env.DEV_HOST : 'localhost';
var devIP = DEV_HOST;
var devPort = 4999;
if (DEV_HOST.indexOf(':') != -1) {
  var arr = DEV_HOST.split(':');
  devIP = arr[0];
  devPort = arr[1];
}

var CP_NAME = process.env.CP_NAME;
console.log('the CP_NAME:'+process.env.CP_NAME);
var arr = CP_NAME.split('/');
var CP_DIR = arr[0];
var CP_BUNDLE_NAME = arr[1];
var entry_bundle_file = '';
if (CP_BUNDLE_NAME == 'main') entry_bundle_file = path.join(__dirname, '../src/lib/'+CP_DIR+'/main.js');
else entry_bundle_file = path.join(__dirname, '../src/lib/main.js');
console.log ('entry_bundle_file for webpack-dev-server: '+entry_bundle_file);

var APP_ENV = 'dev';
if (!process.env.APP_ENV)APP_ENV = process.env.APP_ENV


var webpackConfig = {
  devtool: 'eval',
  //devtool: false,
  entry: [
    'webpack-dev-server/client?http://' + devIP + ':'+ devPort,
    'webpack/hot/only-dev-server',
    entry_bundle_file
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: '/static/',
    filename: 'cp-'+CP_DIR+'.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot-loader/webpack', 'babel'], include: path.join(__dirname, '../src/lib/'+CP_DIR)},
      {test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=1&name=[path][name].[ext]'},
      {test: /\.css$/, loaders: ['style', 'raw'], include: path.join(__dirname, '../src/lib/'+CP_DIR)},
      {
        'loader': 'babel-loader',
        'test': /\.js$/,
        'exclude': /node_modules/,
        'query': {'plugins': ['recharts'], 'presets': ['es2015']}
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('path').join(__dirname,'../template-html/index.html')
    }),//这个插件不能少,生成一份虚拟的html文件放到webpack-dev-server中,否则会报错404
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__CP_NAME__': JSON.stringify(CP_NAME)
    })
  ]
};


module.exports = webpackConfig;
