/**
 * Created by zhongzhengkai on 2016/12/27.
 */


import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/mo-ranking';

class Ranking extends Component {

  render(){
    return (
      <h1>this is ranking page</h1>
    );
  }

}


export default connect(
  state=> ({
    MODealerGroup: state.MODealerGroup
  }),
  dispatch => ({actions: bindActionCreators(Actions, dispatch)})
)(Ranking)