/**
 * Created by zhongzhengkai on 2016/11/15.
 */

import React,{Component} from 'react';

const FUNCS = ['keyUp','keyDown','computeXY'];

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const OPPOSITE_NAME_ = {'up':'down',down:'up',left:'right',right:'left'};
const CODES = [UP, DOWN, LEFT, RIGHT];
const CODE_NAME_ = {38:'up',40:'down',37:'left',39:'right'};

const OFFSET_X = 2;
const OFFSET_Y = 4;

const Craft = ({x,y})=>{
  return (
    <div style={{position:'absolute',width:20,height:60,backgroundColor:'green',left:x,top:y}}></div>
  );
};

export default class GameBoard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {direction: '', up: 0, down: 0, left: 0, right: 0,
      lastUpKey:0, lastDownKey:0,x:298,y:500};
    this.bindFuncs();
    window.addEventListener('keydown', ((e)=> {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case UP:
        case DOWN:
        case LEFT:
        case RIGHT:
          this.keyDown(keyCode);
        default:
          break;
      }
    }).bind(this));
    window.addEventListener('keyup', ((e)=> {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case UP:
        case DOWN:
        case LEFT:
        case RIGHT:
          this.keyUp(keyCode);
        default:
          break;
      }
    }).bind(this));
  }

  bindFuncs() {
    var self = this;
    FUNCS.forEach(func=> self[func] = self[func].bind(self));
  }

  computeXY(keyCode,{x,y}){
    var newX = x, newY = y;
    switch (keyCode){
      case UP:
        newY = newY-OFFSET_Y;
        break;
      case DOWN:
        newY = newY+OFFSET_Y;
        break;
      case LEFT:
        newX = newX-OFFSET_X;
        break;
      case RIGHT:
        newX = newX+OFFSET_X;
        break;
      default:
        break;
    }
    return {newX,newY}
  }

  keyDown(keyCode) {
    var newState = {};
    const {lastDownKey} = this.state;
    var name = CODE_NAME_[keyCode];
    var oppositeName = OPPOSITE_NAME_[name];
    newState[name] = 1;
    newState[oppositeName] = 0;
    newState.lastDownKey = keyCode;
    var {newX, newY} = this.computeXY(keyCode,this.state);
    newState.x = newX;
    newState.y = newY;
    this.setState(newState);
  }

  keyUp(keyCode) {
    var newState = {};
    var name = CODE_NAME_[keyCode];
    newState[name] = 0;
    var {newX, newY} = this.computeXY(keyCode,this.state);
    newState.x = newX;
    newState.y = newY;
    this.setState(newState);
  }

  render() {
    console.log('@@@ GameBoard');
    var {x,y} = this.state;
    return (
      <div>
        <h1>this is game board!</h1>
        <h3>{JSON.stringify(this.state)}</h3>
        <div style={{position:'relative',border:'darkred solid 1px',width:600,height:600}}>
          <Craft x={x} y={y} />
        </div>
      </div>
    );
  }

}








