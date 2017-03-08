/**
 * Created by zhongzhengkai on 2016/11/10.
 */
import React from 'react';

class Demo extends React.Component{

  constructor(props,context){
    super(props,context);
    this.state = {id:this.props.id};
  }

  componentWillMount(){
    console.log(this.state.id+' ->componentWillMount');
  }

  componentDidMount(){
    console.log(this.state.id+' -->componentDidMount');
  }

  componentWillReceiveProps(nextProps){
    console.log(this.state.id+' --->componentWillReceiveProps');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.state.id+' ---->shouldComponentUpdate');
    //return nextProps.id != this.state.id;
    return true;
  }

  componentWillUpdate(){
    console.log(this.state.id+' ----->componentWillUpdate');
  }

  componentDidUpdate(){
    console.log(this.state.id+' ------>componentDidUpdate');
  }

  componentWillUnmount(){
    console.log('%c'+this.state.id+' componentWillUnmount','color:red');
  }

  render(){
    console.log('@@@ Demo '+this.props.id);
    return (
      <h1>Demo component</h1>
    );
  }

}


export default class Panel extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {demoCount:1};
    this.addOne = this.addOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  addOne(){
    var demoCount = this.state.demoCount +1;
    this.setState({demoCount:demoCount});
  }


  deleteOne(){
    var demoCount = this.state.demoCount - 1;
    this.setState({demoCount:demoCount});
  }

  render(){
    console.log('@@@ Panel');
    var view = [];
    var demoCount = this.state.demoCount;
    for(var i=0;i<demoCount;i++){
      view.push(<Demo key={i} id={i} />);
    }

    return (
      <div>
        <button onClick={this.addOne}>add Demo Component</button>
        <button onClick={this.deleteOne}>delete Demo Component</button>
        <br />
        {view}
      </div>
    );
  }

}
