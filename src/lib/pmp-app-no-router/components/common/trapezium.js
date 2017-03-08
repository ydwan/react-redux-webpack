/**
 * Created by zhongzhengkai on 2016/12/26.
 * 一个呈现为梯形的漏斗组件
 */
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';
import React,{Component} from 'react';


const toggleBtnStyle =  {display:'block',position:'absolute',width:120,height:30,left:0,right:0,top:0,bottom:0, margin:'auto'};


export default class Trapezium extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      showUp: false,
      showDown: false,
      lastAction: 'none',
      lastUpHeight: 150,
      lastUpBg:'trapezium-cry',
      lastDownHeight: 150,
      lastDownBg:'trapezium-cry'
    };
    this.toggleUp = this.toggleUp.bind(this);
    this.toggleDown = this.toggleDown.bind(this);
    this.renderPartialWithMotion = this.renderPartialWithMotion.bind(this);
    this.renderPartial = this.renderPartial.bind(this);
  }

  toggleUp(){
    this.setState({showUp:!this.state.showUp,lastAction:'showUp'});
  }

  toggleDown(){
    this.setState({showDown:!this.state.showDown,lastAction:'showDown'});
  }

  renderPartialWithMotion(startHeight, endHeight, switchBgHeight, lastBgClass, bgClass, btnName, key) {
    return (
      <Motion defaultStyle={{h: startHeight}} style={{h: spring(endHeight)}}>
        {
          value => {
            var curHeight = value.h;
            var bg = lastBgClass;
            //递减和递增是不同的切换策略
            if (startHeight < endHeight && curHeight > switchBgHeight)bg = bgClass;
            else if (startHeight > endHeight && curHeight < switchBgHeight)bg = bgClass;
            return this.renderPartial(curHeight, bg, btnName, key)
          }
        }
      </Motion>
    );
  }

  renderPartial(height, bgClass, btnName, key){
    if(key=='up')var onClick = this.toggleUp;
    else var onClick = this.toggleDown;
    return (
      <div key={key} className={bgClass}
           style={{position:'relative',height:height,width:'100%'}}>
        <button onClick={onClick} style={toggleBtnStyle}>
          {btnName}
        </button>
      </div>
    );
  }

  render(){
    console.log('%c@@@ Trapezium','color:green');
    var {lastAction,showUp,showDown,lastUpHeight,lastUpBg,lastDownHeight,lastDownBg} = this.state;
    var deltaHeight = 0, upBg = '', downBg = '';

    if (showUp)upBg = 'trapezium-smile'; else upBg = 'trapezium-cry';
    if (showDown)downBg = 'trapezium-smile'; else downBg = 'trapezium-cry';

    if (lastAction != 'none') {
      this.state.lastAction = 'none';
      if (lastAction == 'showUp') {
        if (showUp) deltaHeight = 100;
        else deltaHeight = -100;
        var endUpHeight = lastUpHeight + deltaHeight;
        this.state.lastUpHeight = endUpHeight;//记录这个值,方便下一次使用
        this.state.lastUpBg = upBg;//记录这个值,方便下一次使用

        var switchHeight = lastUpHeight + deltaHeight / 2;
        var upView = this.renderPartialWithMotion(lastUpHeight, endUpHeight, switchHeight, lastUpBg, upBg, 'toggle up', 'up');
        var downView = this.renderPartial(lastDownHeight, downBg, 'toggle down', 'down')

      } else {//lastAction : showDown
        if (showDown)deltaHeight = 100;
        else deltaHeight = -100;
        var endDownHeight = lastDownHeight + deltaHeight;
        this.state.lastDownHeight = endDownHeight;//记录这个值,方便下一次使用
        this.state.lastDownBg = downBg;//记录这个值,方便下一次使用

        var switchHeight = lastDownHeight + deltaHeight / 2;
        var upView = this.renderPartial(lastUpHeight, upBg, 'toggle up', 'up');
        var downView = this.renderPartialWithMotion(lastDownHeight, endDownHeight, switchHeight, lastDownBg, downBg, 'toggle down', 'down');
      }
    }else{
      var upView = this.renderPartial(lastUpHeight, upBg, 'toggle up', 'up');
      var downView = this.renderPartial(lastDownHeight, downBg, 'toggle down', 'down');
    }

    return (
      <div style={{display:'table-cell',margin:'0 auto',width:300,minWidth:300,verticalAlign:'top'}}>
        {upView}
        <div style={{height:40,width:'100%',outline:'blue solid 1px'}}></div>
        {downView}
      </div>
    );
  }

}