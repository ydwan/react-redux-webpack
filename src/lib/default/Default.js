/**
 * Created by zhongzhengkai on 2016/11/9.
 */

import React from 'react';
import ReactDOM from 'react-dom';

export default class Default extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render(){

    var content = '';
    if(this.props.msg){
      content = (
        <div>
          <h1 style={{color:'red'}}>error message:</h1>
          <h1>{this.props.msg}</h1>
        </div>
      );
    }else{
      content = (
        <div>
          <h1 style={{color:'red'}}>no CP_NAME specified in your command: npm run start:cp-dev</h1>
          <h1 style={{color:'green'}}>for OSX,command may like:</h1>
          <h1 style={{color:'green'}}>CP_NAME=input-select npm run start:cp-dev</h1>
          <h1 style={{color:'green'}}>for windows,command may like:</h1>
          <h1 style={{color:'green'}}>set CP_NAME=input-select&& npm run start:cp-dev</h1>
        </div>
      );
    }

    return content;
  }

}