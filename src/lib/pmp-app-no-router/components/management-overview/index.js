/**
 * Created by zhongzhengkai on 2016/12/26.
 */
import React,{Component} from 'react';
import OverView from './overview';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace  from 'antd-mobile/lib/white-space';
import NavBar from 'antd-mobile/lib/nav-bar';

const TabPane = Tabs.TabPane;

export default class MOPage extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <div>
        <NavBar leftContent="" mode="light" onLeftClick={() => console.log('onLeftClick')}>Management Overview</NavBar>
        <Tabs defaultActiveKey="1" onChange={() => console.log('onChange')} swipeable={false}>
          <TabPane tab="Overview" key="1" style={{height:710}}>

            <OverView />

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