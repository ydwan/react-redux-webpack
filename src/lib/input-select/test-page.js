/**
 * Created by zhongzhengkai on 2016/11/10.
 */

import React from 'react';
import InputSelect from './InputSelect';

export default class TestPage extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {count:1};
    this._add = this._add.bind(this);
  }

  _add() {
    this.state.count++;
    this.forceUpdate();
  }

  render(){
    console.debug('@@@ InputSelect TestPage');

    var count = this.state.count;
    var view = [];
    for(var i=0; i<count; i++){
      view.push(<InputSelect key={i}/>);
    }

    return (
      <div>
        <button onClick={this._add}>add one InputSelect</button>
        {view}
      </div>
    );
  }

}