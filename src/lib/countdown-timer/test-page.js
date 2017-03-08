/**
 * Created by zhongzhengkai on 2016/11/10.
 */

import React from "react";
import CountDownTimer from "./CountDownTimer";

export default class TestPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {count: 1};
    this._add = this._add.bind(this);
  }

  _add() {
    this.state.count++;
    this.forceUpdate();
  }

  callBack() {
    console.log('这是一个回调函数，可以在这里面做一些行为，比如提交请求，发送验证码之类的。。。')
  }

  render() {
    console.debug('@@@ CountDownTimer TestPage');

    var count = this.state.count;
    var view = [];
    for (var i = 0; i < count; i++) {
      view.push(<CountDownTimer key={i} count={5} speed={100} value='获取验证码'
                                style={{
                                  color: 'red',
                                  width: 100,
                                  height: 30,
                                  borderRadius: 10,
                                  border: null,
                                  backgroundColor: 'blue'
                                }}
                                disabledColor="yellow"
                                callBack={this.callBack}/>);
    }

    return (
        <div>
          <button onClick={this._add}>add one CountDownTimer</button>
          {view}
        </div>
    );
  }
}