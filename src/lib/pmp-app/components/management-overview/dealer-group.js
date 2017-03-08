/**
 * Created by zhongzhengkai on 2016/12/27.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/mo-dealer-group';

class DealerGroup extends Component {

  render(){
    return (
      <h1>this is dealer group</h1>
    );
  }

}


export default connect(
  state=> ({
    MODealerGroup: state.MODealerGroup
  }),
  dispatch => ({actions: bindActionCreators(Actions, dispatch)})
)(DealerGroup)