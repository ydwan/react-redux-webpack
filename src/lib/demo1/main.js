import React,{Component} from 'react';
import {render} from 'react-dom';
import './main.css'; 

var root = document.getElementById('root');
if(!root){
  console.log('create new root div for app!');
  document.write('<div id="root"></div>');
  root = document.getElementById('root');
}
 
class HelloReact extends Component {
 
  constructor(props, context) {
    super(props, context);
    this.state = {clickCount:0};
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick() {
    this.setState({clickCount: this.state.clickCount + 1});
  }
 
  render(){
    return (
      <div>
        <h1>hello react!,{this.state.clickCount}</h1>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
 
}
 
render(<HelloReact />, root);