/**
 * Created by zhongzhengkai on 16/9/1.
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Modal, Icon } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;

class NavMenu extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('%c@@@ NavMenu!', 'color:green');
    var curPath = this.props.pathname;
    return (
      <div className="left-nav" id="leftMenu">
        <Menu theme="dark" style={{ width: 200 }} mode="inline">

          <SubMenu key="sub1" title={<span className=''><Icon type="link" />图书管理</span>}>
            <Menu.Item key="sub1-1">
              <Link to="/book/list">
                <span className=""
                  style={{ color: curPath == '/book/list' ? '#30b9ff' : 'white' }}>
                  <Icon type="bars" />图书列表
                </span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" title={<span className=''><Icon type="edit" />系统管理</span>}>
            <Menu.Item key="sub3-1">
              <Link to="/manger-user">
                <span className="" ><Icon type="user" />用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub3-2">
              <Link to="/manger-visitor">
                <span className="" ><Icon type="user" />访客管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  }

}

export default connect(
  state => ({
    common: state.common
  })
)(NavMenu)