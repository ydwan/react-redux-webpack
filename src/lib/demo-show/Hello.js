/**
 * Created by zhongzhengkai on 2016/11/11.
 */

import React from 'react';
import {Button,Carousel} from 'antd';

var Hello = React.createClass(
  {
    getDefaultProps: function () {
      return {text: 'world'}
    },
    getInitialState: function () {
      return {color: 'red'};
    },
    _changeColor: function () {
      var color = this.state.color == 'red' ? 'black' : 'red';
      this.setState({color: color});
    },
    render: function () {
      return (
        <h1 style={{color:this.state.color}} onClick={this._changeColor}>
          from es5 : hello {this.props.text}
        </h1>
      )
    }
  }
);

//class Hello2 extends React.Component {
var Hello2 = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {color: 'red'};
    this._changeColor = this._changeColor.bind(this);
  }

  _changeColor() {
    console.log('_changeColor');
    var color = this.state.color == 'red' ? 'yellow' : 'red';
    this.setState({color: color});
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1 style={{color:this.state.color}} onClick={this._changeColor}>
          from es6 !!!!: hello {this.props.text}
        </h1>
        <br />
        <input value={this.state.color} onChange={()=> console.log('nothing')}/>
        <button onClick={this._changeColor}>gogogo</button>
        <h2>gogogo</h2>
        <span>{(parseFloat('2.444') / 200) % (20)}</span>
        <Button />
      </div>
    )
  }
};
Hello2.defaultProps = {text: 'react'};


export default Hello2;
