/**
 * Created by zhongzhengkai on 2016/12/26.
 * management-overview ---> overview ---> tab1 [default]
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MOOverviewActions from '../../actions/mo-overview';

import Trapezium from '../common/trapezium';
import SelectBox from '../common/select-box';
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';
import {getCSSPixelWidth} from '../../base/common-func';

var popBtnStyle = {width:'100%',height:20,border:'1px red solid',paddingTop:0,background:'-webkit-linear-gradient(top,pink,#c30411)'};

class Overview extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showSelector: true,
      timeFrame: {'Month': false, 'Week': false},
      source: {'Autohome': false, 'BitAuto': false},
      channel: {'400': false, 'Online Order': false}
    };
    this.renderSelector = this.renderSelector.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(){
    console.time('getData');
    this.props.actions.getData();
  }

  toggleSelector(){
    this.setState({showSelector: !this.state.showSelector});
  }

  renderSelector(){
    var {showSelector,timeFrame,source,channel} = this.state;
    return showSelector ?
      <Motion defaultStyle={{x: 0}} style={{x: spring(145)}}>
        {
          value => {
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
    console.timeEnd('getData');
    var selector = this.renderSelector();
    var btnStr = this.state.showSelector ? 'up' : 'down';
    var appWidth = getCSSPixelWidth();
    var {age,chartData,trapeziumData} = this.props.MOOverview;

    return (
      <div>
        <div>
          {selector}
          <button style={popBtnStyle}
                  onClick={this.toggleSelector}>{btnStr}</button>
        </div>

        <button onClick={this.getData}>getData</button>

        <div
          style={{display:'block',margin:'0 auto',width:appWidth,maxWidth:'100%',outline:'green solid 3px',overflowX:'auto'}}>
          <Trapezium />
          <Trapezium />
          <Trapezium />
          <Trapezium />
        </div>

        <h2>appWidth:{appWidth}</h2>
        <h2>age:{age} chartData:{chartData} trapeziumData:{trapeziumData}</h2>
      </div>
    );
  }

}


export default connect(
  state=> ({
    MOOverview: state.MOOverview
  }),
  dispatch => ({actions: bindActionCreators(MOOverviewActions, dispatch)})
)(Overview)
