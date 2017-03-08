import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {REQUEST_START,REQUEST_END} from '../constants/net-status';
import Icon from 'antd-mobile/lib/icon';

import '../styles/app.css';
import '../styles/antd-mobile.css';


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var props = this.props;
    const {common} = props;
    console.debug('%c@@@ App', 'color:darkred');
    let loader = '';
    if (common.requestStatus == REQUEST_START) {
      loader = (
        <div className='pmp-mask'>
          <div style={{position: 'absolute',width:60,height:60, left: 0, top: 0,right:0,bottom:0,margin:'auto'}}>
            <Icon style={{fontSize:'60px',color:'#8c0000'}} type="loading"/>
          </div>
        </div>
      );
    }

    return (
      <div id="app-container">
        {loader}
        {props.children}
      </div>
    );
  }

}
App.propTypes = {
  common: PropTypes.object.isRequired
};

export default connect(
  state => ({
    common: state.common
  })
)(App)