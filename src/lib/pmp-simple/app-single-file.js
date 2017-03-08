/**
 * Created by zhongzhengkai on 2016/12/22.
 */

import Tabs from 'antd-mobile/lib/tabs';
import Icon  from 'antd-mobile/lib/icon';
import WhiteSpace  from 'antd-mobile/lib/white-space';
import NavBar from 'antd-mobile/lib/nav-bar';
import React,{Component} from 'react';
import {render} from 'react-dom';
//import CSSTransition from 'react-addons-css-transition-group';
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';

// In your render...


const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

var screenWidth = screen.width;
var dpr = window.devicePixelRatio;
var appWidth = screenWidth/1;
console.log('----->screenWidth:'+screenWidth+', devicePixelRatio:'+dpr);


/**
 * 选择框,支持单选或复选,默认复选,
 * 实例化时,加入isSingleSelect属性,改为单选模式
 * <SelectBox isSingleSelect labels={['a','n']} />
 */
class SelectBox extends Component{

  constructor(props, context) {
    super(props, context);
    const labelMap = props.labelMap ? props.labelMap : {};
    let isSingleSelect = props.isSingleSelect != undefined;
    let selectedLabel = '';//最近一次选择的label值
    const keys = Object.keys(labelMap);
    if (keys.length > 0)selectedLabel = keys[0];
    this.state = {labelMap, title: props.title, selectedLabel, isSingleSelect, shouldUpdate: false};
    this.switchLabel = this.switchLabel.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //console.log('componentWillReceiveProps');
    this.state.shouldUpdate = false;
  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log('shouldComponentUpdate',nextState.shouldUpdate);
    return nextState.shouldUpdate;
  }

  switchLabel(e) {
    var label = e.target.getAttribute('data-label');
    if (!label) label = e.target.innerText;
    var {selectedLabel,labelMap} = this.state;
    if (this.state.isSingleSelect)labelMap[selectedLabel] = false;
    labelMap[label] = !labelMap[label];
    this.setState({selectedLabel: label, labelMap,shouldUpdate:true});
    //this.props.onLabelSelect(labelMap);
  }

  render(){
    console.log('%c@@@ SelectBox','color:green');
    var {labelMap,title} = this.state;
    var labelsView = Object.keys(labelMap).map((label,idx)=> {
      if (labelMap[label])
        return (
          <span key={idx} onClick={this.switchLabel} data-label={label}>
            <span className="iconfont icon-check" data-label={label} style={{color:'#bc0113',fontWeight:'900'}}/>
            <label style={{marginRight:8,fontWeight:'900'}}>{label}</label>
          </span>
        );
      else
        return (
          <span key={idx} onClick={this.switchLabel} data-label={label}>
            <span className="iconfont icon-circle" data-label={label} style={{color:'gray',fontSize:'1.2em'}}/>
            <label style={{marginRight:8}}>{label}</label>
          </span>
        );
    });

    return (
      <div style={{margin:0,paddingTop:13,height:48,width:'100%',borderBottom:'black 1px solid',boxSizing:'border-box'}}>
        <div style={{display:'inline-block',width:'30%',paddingLeft:'6px',boxSizing:'border-box'}}>
          <label style={{fontWeight:'900'}}>{title}</label>
        </div>
        <div style={{display:'inline-block',width:'70%'}}>
          {labelsView}
        </div>
      </div>
    );
  }

}

class Trapezium extends Component{

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
        <button onClick={onClick}
                style={{display:'block',position:'absolute',width:120,height:30,left:0,right:0,top:0,bottom:0,
                      margin:'auto'}}>
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

//outline:'red solid 1px'class TabExample extends
class App extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      showSelector: true,
      timeFrame: {'Month': false, 'Week': false},
      source: {'Autohome': false, 'BitAuto': false},
      channel: {'400': false, 'Online Order': false}
    };
    this.toggleSelector = this.toggleSelector.bind(this);
  }

  toggleSelector(){
    this.setState({showSelector: !this.state.showSelector});
  }

  renderSelector(){
    var {showSelector,timeFrame,source,channel} = this.state;
    return showSelector ?
      <Motion defaultStyle={{x: 0}} style={{x: spring(145)}}>
        {value => {
          var height = value.x;
          if (height > 120)
            return (
              <div style={{height:value.x,width:'100%',maxWidth:'100%',overflowX:'auto'}}>
                <SelectBox labelMap={timeFrame} title="TimeFrame" isSingleSelect/>
                <SelectBox labelMap={source} title="Source"/>
                <SelectBox labelMap={channel} title="Channel"/>
              </div>
            );
          else return <div style={{height:value.x}}>
          </div>
        }
        }
      </Motion>
      :
      <Motion defaultStyle={{x: 145}} style={{x: spring(0)}}>
        {value =>
          <div style={{height:value.x}}>
          </div>
        }
      </Motion>;
  }

  render() {
    var selector = this.renderSelector();
    var btnStr = this.state.showSelector ? 'up' : 'down';

    return (
      <div>
        <NavBar leftContent="" mode="light" onLeftClick={() => console.log('onLeftClick')}>Management Overview</NavBar>
        <Tabs defaultActiveKey="1" onChange={callback} swipeable={false}>
          <TabPane tab="Overview" key="1" style={{height:710}}>
            {selector}
            <button style={{width:'100%',height:20,verticalAlign:'top',border:'1px red solid',paddingTop:0,background:'-webkit-linear-gradient(top,pink,#c30411)'}}
                    onClick={this.toggleSelector}>{btnStr}</button>
            <br/>
            <br/>

            <div style={{width:'100%',maxWidth:'100%',overflowX:'auto'}}>
              <Trapezium />
              <Trapezium />
              <Trapezium />
            </div>

          </TabPane>

          <TabPane tab="Dealer Group" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem' }}>
              选项卡二内容
            </div>
          </TabPane>

          <TabPane tab="Ranking" key="3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem' }}>
              选项卡三内容
            </div>
          </TabPane>

        </Tabs>
      </div>
    );
  }

}

//ReactDOM.render(<TabExample />, mountNode);
//TabExample Demo
export default App