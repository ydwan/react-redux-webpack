# react_webpack
react与webpack的demo.带有typings建议在vscode下运行 <br>
来源作者：时间被海绵吃了 <br>
Url:https://segmentfault.com/a/1190000004506929

##一、新建项目
  项目目录如下：<br> 
    <pre>
      /js
      -- /components
      ---- /Publisher
      ------ Publish.css
      ------ Publish.jsx
      -- app.js
      /css
      -- base.css
      index.html
      webpack.config.js
    </pre>
    * js/components 目录存放所有的组件，比如 Publisher 是我们的表单组件，里面存放这个表单的子组件（如果有的话）、组件的 jsx 文件以及组件自己的样式。<br>
    * js/app.js 是入口文件<br>
    * css 存放全局样式<br>
    * index.html 主页<br>
    * webpack.config.js webpack 的配置文件<br>
    
##二、配置 Webpack
  编辑 `webpack.config.js`
```javascript
var webpack = require('webpack');
module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
```
  上一篇文章 里是使用 webpack 进行 ES6 开发，其实不管是 ES6 也好，React 也好，webpack 起到的是一个打包器的作用，配置项和这里大致相似，就不再赘述。<br>

  不同的是在 babel-loader 里增加了 react 的转码规则。<br>

  另外这里使用到了 webpack 的一个内置插件 UglifyJsPlugin，通过他可以对生成的文件进行压缩。详细的介绍请看[这里](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin "悬停显示")  <br>
  
  
##三、安装一系列东东

首先保证安装了 nodejs 。

###1) 初始化项目
<code>npm init</code>

###2) 初始化项目
<code>npm install webpack -g</code>

###3) 安装 React
<code>npm install react react-dom --save-dev</code>

###4) 安装加载器
本项目使用到的有 babel-loader、css-loader、style-loader。

`babel-loader` 进行转码<br>
`css-loader` 对 css 文件进行打包<br>
`style-loader` 将样式添加进 DOM 中<br>
详细请看[这里](https://webpack.github.io/docs/list-of-loaders.html "悬停显示") 。
<code>npm install babel-loader css-loader style-loader --save-dev</code>

###5) 安装转码规则
<code>npm install babel-preset-es2015 babel-preset-react --save-dev</code>

##四、码代码
`index.html` 中，引用的 `js` 文件是通过 `webpack` 生成的 `bundle.js`， `css` 文件是写在 `/css` 目录下的 `base.css`。
###index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/base.css">
</head>
<body>
    <div id="container"></div>
    <script src="bundle.js"></script>
</body>
</html>
```

###/css/base.css
`base.css` 里面存放的是全局样式，也就是与组件无关的。
```css
html, body, textarea {
    padding: 0;
    margin: 0;
}

body {
    font: 12px/1.3 'Arial','Microsoft YaHei';
    background: #73a2b0;
}

textarea {
    resize: none;
}

a {
    color: #368da7;
    text-decoration: none;
}
```

###/js/app.js
`/js/app.js` 是入口文件，引入了 `Publisher` 组件
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Publisher from './components/Publisher/Publisher.jsx';

ReactDOM.render(
    <Publisher />,
    document.getElementById('container')
);
```

###/js/components/Publisher/Publish.jsx
好的，下面开始编写组件，首先，确定这个组件的组成部分，因为是一个简单的表单，所以不需要继续划分子组件。<br/>
表单分为上中下三部分，`title` 里面包含热门微博和剩余字数的提示，`textElDiv` 包含输入框，`btnWrap` 包含发布按钮。
```javascript
import React from 'react';

class Publisher extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <div className="publisher">
                <div className="title">
                    <div>
                        <a href="#">网友曝光两女孩蹲着等地铁,称没教养,你怎么看(投票)</a>
                    </div>
                    <div className="tips">
                        <span>还可以输入</span><strong>140</strong>字
                    </div>
                </div>            
                <div className="textElDiv">
                    <textarea></textarea>
                </div>
                <div className="btnWrap">
                    <a className="publishBtn" href="javascript:void(0)">发布</a>
                </div>
            </div>
        );
    }
}

export default Publisher;
```

###/js/components/Publisher/Publish.css
```css
:local .publisher{
    width: 600px;
    margin: 10px auto;
    background: #ffffff;
    box-shadow: 0 0 2px rgba(0,0,0,0.15);
    border-radius: 2px;
    padding: 15px 10px 10px;
    height: 140px;
    position: relative;
    font-size: 12px;
}

:local .title{
    position: relative;
}

:local .title div {
    position: absolute;
    right: 0;
    top: 2px;
}

:local .tips {
    color: #919191;
    display: none;
}

:local .textElDiv {
    border: 1px #cccccc solid;
    height: 68px;
    margin: 25px 0 0;
    padding: 5px;
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15) inset;
}

:local .textElDiv textarea {
    border: none;
    border: 0px;
    font-size: 14px;
    word-wrap: break-word;
    line-height: 18px;
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
    background: transparent;
    width: 100%;
    height: 68px;
}

:local .btnWrap {
    float: right;
    padding: 5px 0 0;
}

:local .publishBtn {
    display: inline-block;
    height: 28px;
    line-height: 29px;
    width: 60px;
    font-size: 14px;
    background: #ff8140;
    border: 1px solid #f77c3d;
    border-radius: 2px;
    color: #fff;
    box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
    padding: 0 10px 0 10px;
    text-align: center;
    outline: none;
}

:local .publishBtn.disabled {
    background: #ffc09f;
    color: #fff;
    border: 1px solid #fbbd9e;
    box-shadow: none;
    cursor: default;
}
```
然后就可以在 `Publish.jsx` 中这样使用了
```javascript
import React from 'react';
import style from './Publisher.css';

class Publisher extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <div className={style.publisher}>
                <div className={style.title}>
                    <div>
                        <a href="#">网友曝光两女孩蹲着等地铁,称没教养,你怎么看(投票)</a>
                    </div>
                    <div className={style.tips}>
                        <span>还可以输入</span><strong>140</strong>字
                    </div>
                </div>            
                <div className={style.textElDiv}>
                    <textarea></textarea>
                </div>
                <div className={style.btnWrap}>
                    <a className={style.publishBtn>发布</a>
                </div>
            </div>
        );
    }
}

export default Publisher;
```

这样组件的样式已经添加进去了，接下来就纯粹是进行 React 开发了。

### 编写 Publish.jsx
  表单的需求如下：<br/>
  1.输入框获取焦点时，输入框边框变为橙色，右上角显示剩余字数的提示；输入框失去焦点时，输入框边框变为灰色，右上角显示热门微博。<br/>
  2.输入字数小于且等于140字时，提示显示剩余可输入字数；输入字数大于140时，提示显示已经超过字数。<br/>
  3.输入字数大于0且不大于140字时，按钮为亮橙色且可点击，否则为浅橙色且不可点击。<br/>
  首先，给 textarea 添加 onFocus、onBlur、onChange 事件，通过 handleFocus、handleBlur、handleChange 来处理输入框获取焦点、失去焦点和输入。<br/>
  然后将输入的内容保存在 state 里，这样每当内容发生变化时，就能方便的对变化进行处理。<br/>
  对于按钮的变化、热门微博和提示之间的转换，根据 state 中内容的变化来切换样式就能轻松地做到。<br/>
  完整代码如下：
```javascript
import React from 'react';
import style from './Publisher.css';

class Publisher extends React.Component {
    constructor(...args) {
        super(...args);
        // 定义 state
        this.state = {
            content: ''
        }
    }

    /**
    * 获取焦点
    **/
    handleFocus() {
        // 改变边框颜色
        this.refs.textElDiv.style.borderColor = '#fa7d3c';
        // 切换右上角内容
        this.refs.hot.style.display = 'none';
        this.refs.tips.style.display = 'block';
    }

    /**
    * 失去焦点
    **/
    handleBlur() {
        // 改变边框颜色
        this.refs.textElDiv.style.borderColor = '#cccccc';
        // 切换右上角内容
        this.refs.hot.style.display = 'block';
        this.refs.tips.style.display = 'none';
    }

    /**
    * 输入框内容发生变化
    **/
    handleChange(e) {
        // 改变状态值
        this.setState({
            content: e.target.value
        });
    }

    render() {
        return (
            <div className={style.publisher}>
                <div className={style.title}>
                    <div ref="hot">
                        <a href="#">网友曝光两女孩蹲着等地铁,称没教养,你怎么看(投票)</a>
                    </div>
                    <div className={style.tips} ref="tips">
                        <span>{this.state.content.length > 140 ? '已超出' : '还可以输入'}</span><strong>{this.state.content.length > 140 ? this.state.content.length - 140 : 140 - this.state.content.length}</strong>字
                    </div>
                </div>            
                <div className={style.textElDiv} ref="textElDiv">
                    <textarea onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}></textarea>
                </div>
                <div className={style.btnWrap}>
                    <a className={style.publishBtn + ((this.state.content.length > 0 && this.state.content.length <= 140) ? '' : ' ' + style.disabled)} href="javascript:void(0)">发布</a>
                </div>
            </div>
        );
    }
}

export default Publisher;
```

##五、运行
通过 `--display-error-detail` 可以显示 `webpack` 出现错误的中间过程，方便在出错时进行查看。<br/>
`--progress --colors` 可以显示进度<br/>
`--watch` 可以监视文件的变化并在变化后重新加载</br>
运行如下：<br/>
```Bash
webpack --display-error-detail --progress --colors --watch
```
