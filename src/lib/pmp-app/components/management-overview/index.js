/**
 * Created by zhongzhengkai on 2016/12/26.
 */
import React,{Component} from 'react';
import OverView from './overview';
import DealerGroup from './dealer-group';
import Ranking from './ranking';
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
          <TabPane tab="Overview" key="1" style={{height:'100%'}}>

            <OverView />

          </TabPane>

          <TabPane tab="Dealer Group" key="2">
            <DealerGroup />
          </TabPane>

          <TabPane tab="Ranking" key="3">
            <Ranking />
          </TabPane>

        </Tabs>
      </div>
    );
  }

}