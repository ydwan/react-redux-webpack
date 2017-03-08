/**
 * Created by zhongzhengkai on 2016/12/22.
 */

import Tabs from 'antd-mobile/lib/tabs';
import Icon  from 'antd-mobile/lib/icon';
import WhiteSpace  from 'antd-mobile/lib/white-space';
import NavBar from 'antd-mobile/lib/nav-bar';
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';
import Overview from './page/management-overview/overview';


const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

var screenWidth = screen.width;
var dpr = window.devicePixelRatio;
var appWidth = screenWidth/1;
console.log('----->screenWidth:'+screenWidth+', devicePixelRatio:'+dpr);

//outline:'red solid 1px'class TabExample extends

class App extends Component{

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <div>
        <NavBar leftContent="" mode="light" onLeftClick={() => console.log('onLeftClick')}>Management Overview</NavBar>
        <Tabs defaultActiveKey="1" onChange={callback} swipeable={false}>
          <TabPane tab="Overview" key="1" style={{height:710}}>

            <Overview />

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

export default App;