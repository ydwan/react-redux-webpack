/**
 * Created by zhongzhengkai on 2016/11/9.
 */

import React from 'react';

export default class InputSelect extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {h1Arr:['1th h1 tag']};
    this._addH1 = this._addH1.bind(this);
    this._clearAllH1 = this._clearAllH1.bind(this);
  }

  _addH1() {
    var h1Arr = this.state.h1Arr;
    h1Arr.push(h1Arr.length +1 + 'th h2 tag');
    this.setState({h1Arr: h1Arr});
  }

  _clearAllH1(){
    this.setState({h1Arr: []});
  }

  render(){
    console.debug('@@@ InputSelect');
    var h1View = this.state.h1Arr.map((text,idx)=> <h1 key={idx} style={{color:'red'}}>{text}</h1>);

    return (
      <div>
        <hr/>
        show h1 tag!!!!
        <hr/>
        <button onClick={this._addH1}>add h1 tag</button>
        <button onClick={this._clearAllH1}>clear h1</button>
        {h1View}
      </div>
    );
  }

}