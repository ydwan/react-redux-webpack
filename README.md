
# 项目的搭建步骤[该工程pull下来后,可以直接运行,无需安装任何包体,下面的说明只是解释如何搭建项目]
* cd ${your-project-dir}
* mkdir react-share
* cd react-share
* npm init      (一路回车产生一个空的package.jon文件)
* vim .babelrc  (粘贴以下内容,并wq保存退出)
    {
      "presets":["es2015","stage-0","react"],
      "plugins":[]
    }
* 安装webpack和各种babel插件(指定为``开发依赖包``)
npm i babel-core babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-loader webpack webpack-dev-server --save-dev
如果使用yarn: yarn add babel-core babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-loader webpack webpack-dev-server --dev

* 安装react相关的各种``运行依赖包``
npm i react react-dom --save
如果使用yarn: yarn add react-dom css-loader style-loader raw-loader

* 安装react相关的各种``开发依赖包``
npm i css-loader style-loader raw-loader react-hot-loader --save-dev

* 安装redux运行相关的各种包(指定为``运行依赖包``)
npm i redux redux-thunk react-router-redux --save

* 安装redux调试相关的各种包(指定为``开发依赖包``)
npm i redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor --save-dev

* 安装其他运行相关的依赖包(指定为``运行依赖包``)
npm i whatwg-fetch antd react-router --save

* 全局安装babel核心模块
npm i babel-cli --global
如果使用yarn: yarn global add babel-cli 


# webStorm IDE调整
* 让IDE支持es6和jsx语法,不报语法错误
Preferences -> Languages & Frameworks -> JavaScript 调整为 JSX Harmony
* 为了让es6语法全部运行起来,需要对运行的文件指定 node interceptor 为 babel-node,目前最新的node6还不支持import,export
* 为了符合js社区推荐的统一缩进规范,调整缩进字符长度为2
Preferences -> Editor -> Code Style -> JavaScript 调整Tabs and Indents下各项参数为2

# 处于${project-dir}/frontend/目录下,各种常用命令:
* 调试 ./src/lib/input-select目录的对应的InputSelect组件
for OSX: CP_NAME=input-select npm run start:cp
for windows: set CP_NAME=input-select&& npm run start-win:cp

* 调试 ./src/lib/目录下任意想调试的组件,如下面示例,调试demo-show/DemoShow和demo-show/Hello
for OSX: CP_NAME=demo-show/DemoShow npm run start:cp
for OSX: CP_NAME=demo-show/Hello npm run start:cp

for windows: set CP_NAME=demo-show/DemoShow&& npm run start-win:cp
for windows: set CP_NAME=demo-show/Hello&& npm run start-win:cp



