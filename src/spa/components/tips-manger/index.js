import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tipsAction from '../../actions/tips-manger';
import { Button, Card, Checkbox } from 'antd'
import { AddTip, TipsPanel } from '../../../lib/tips-panel'
import '../../base/prototype-ext'
import '../../../lib/tips-panel/tip-panel.css'

class TipsManger extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._getTips = this._getTips.bind(this);
    this._saveTips = this._saveTips.bind(this);
    this._deleteTips = this._deleteTips.bind(this);
    this._checkboxChange = this._checkboxChange.bind(this);
    this._openEdit = this._openEdit.bind(this);
    this._closeEdit = this._closeEdit.bind(this);
    this._editTip = this._editTip.bind(this);
    this.state = {
      checkedTips: [],
      isEdit: false
    };
    this._getTips();
  }

  _getTips() {
    this.props.actions.getTips();
  }

  _saveTips(title, content) {
    this.props.actions.saveTip({ title, content });
  }

  _deleteTips() {
    this.props.actions.deleteTips({ tips: this.state.checkedTips })
  }

  _editTip(tip) {
    this.props.actions.editTip({ tip })
  }

  _checkboxChange(checkedTips) {
    this.setState({
      checkedTips
    })
  }

  _openEdit() {
    if (this.state.checkedTips.length > 0) {
      this.setState({
        isEdit: true
      })
    }
  }

  _closeEdit() {
    this.setState({
      isEdit: false
    })
  }

  render() {
    var { tips } = this.props.tipsManger;
    var isEdit = this.state.isEdit;
    var editTools;
    if (!isEdit) {
      editTools = <div><button className="btn success" onClick={this._openEdit}>Edit items</button></div>
    }
    else {
      editTools = <div><button className="btn danger" onClick={this._closeEdit}>Close edit items</button></div>
    }
    return (
      <div style={{ margin: '50px 50px', fontFamily: 'Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif' }}>
        <div className="tip-content">
          <AddTip submit={this._saveTips} />
          <TipsPanel datasource={tips} onChange={this._checkboxChange} isEdit={isEdit} editTip={this._editTip} />
        </div>
        <div className='tip-tools'>
          <div><button className="btn danger" onClick={this._deleteTips}>Delete items</button></div>
          {editTools}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tipsManger: state.tipsManger,
    common: state.common
  }),
  dispatch => ({ actions: bindActionCreators(tipsAction, dispatch) })
)(TipsManger)