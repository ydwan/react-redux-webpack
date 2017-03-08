/**
 * Created by zhongzhengkai on 16/7/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../styles/common.css';
import {REQUEST_START,REQUEST_END} from '../constants/net-status';
import {Header,NavMenu} from './common';
import '../styles/antd/antd.css';

const Content = ({children}) => {
  return (
    <div className="content">
      {children}
    </div>
  );
};

const Footer = ()=> {
  var highlightStyle = {color: '#6495ed'};
  return (
    <div className="footer">
      <div style={{float:'right',marginRight:20,color:'gray'}}>
        Support Desk Hotline:<label style={highlightStyle}>010-56400987</label> 09:00AM-17:00PM Mon-Fri.)
        <br/>
        Support Desk Email:<label style={highlightStyle}>support@boldseas.com</label> ED
      </div>
    </div>
  );
};

class App extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired
  };

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
        <div className='mk'>
          <div style={{position: 'absolute', left: '50%', top: '50%'}}><span className="ant-spin-dot"/></div>
        </div>
      );
    }

    return (
      <div>
        {loader}
        <Header />
        <NavMenu pathname={props.location.pathname} />
        <Content {...props} />
        <Footer />
      </div>
    );
  }

}

export default connect(
  state => ({
    common: state.common
  })
)(App)