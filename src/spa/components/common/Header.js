/**
 * Created by zhongzhengkai on 2016/11/9.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

class Header extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('%c@@@ Header!','color:green');
    return (
      <div className="header">
        <div className="header-left left">
          <span className='com-info'>a SPA demo</span>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ( {
    common: state.common
  })
)(Header)
