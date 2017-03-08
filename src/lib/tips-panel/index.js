import React from 'react'
import { Checkbox } from 'antd'
import '../../spa/base/prototype-ext'
import './tip-panel.css'


export class Tip extends React.Component {

  constructor(props, context) {
    super(props, context);
    var {title, content, id} = props.tip;
    this.state = { titieStr: title, contentStr: content, id, tip: props.tip };
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this._editTip = this._editTip.bind(this);
  }

  handleCheckBoxClick(e) {
    this.props.onChecked(this.state.tip, e.target.checked);
    this.setState({ isCheck: e.target.checked });
  }

  _editTip() {
    var tip = this.state.tip;
    tip.title = this.refs.inputTitle.value;
    tip.content = this.refs.inputContent.value;
    this.setState({
      titieStr: tip.title,
      contentStr: tip.content
    })
    this.props.editTip(tip);
  }


  render() {
    var { titieStr, contentStr} = this.state;
    var {isEdit, isCheck} = this.props;
    var title, content, tools;
    if (isEdit && isCheck) {
      title = <input type="text" className="input" defaultValue={titieStr} ref='inputTitle' /> , content = <textarea cols="18" rows="6" className="input" defaultValue={contentStr} ref='inputContent' />
      tools = <button className="btn success" onClick={this._editTip}>Save</button>;
    } else {
      title = <label>{titieStr}</label> , content = <label>{contentStr}</label>
    }


    return (
      <div className='card'>
        <div style={{ padding: '0 24px' }}>{title}<div style={{ float: 'right' }}><Checkbox checked={isCheck} onChange={this.handleCheckBoxClick} /></div></div>
        <div style={{ padding: '0 24px' }}>{content}</div>
        <div style={{ float: 'right' }}>{tools}</div>
      </div>
    );
  }

}

export class AddTip extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = { title: props.title, content: props.content };
  }

  handleClick() {
    //向上级抛出文本框的值,title和content
    this.props.submit(this.refs.inputTitle.value, this.refs.inputContent.value);
  }

  render() {
    return (
      <div className='card'>
        <div style={{ padding: '0 24px', fontSize: '28px' }}>title</div>
        <div style={{ padding: '0 24px' }}><input type="text" className="input" placeholder="title..." value={this.state.title} ref='inputTitle' /></div>
        <div style={{ padding: '0 24px', fontSize: '28px' }}>content</div>
        <div style={{ padding: '0 24px' }}><textarea cols="18" rows="6" className="input" placeholder="content..." value={this.state.content} ref='inputContent' /></div>
        <div style={{ float: 'right' }}><button className="btn primary" onClick={this.handleClick}>Add</button></div>
      </div>
    );
  }

}

export class TipsPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._checkboxChange = this._checkboxChange.bind(this);
    this._editTip = this._editTip.bind(this);

    var tipStatus = {};
    props.datasource.forEach(val => tipStatus[val.id] = { isCheck: false, isEdit: false });
    this.state = {
      tips: [],
      checkedTips: [],
      tipStatus
    }
  }

  //钩子事件：任何时刻组件的props都可以通过父辈组件来更改，出现这种情况时，componentWillReceiveProps方法会被调用，你将获得更改props方法及跟他关心state的机会。
  componentWillReceiveProps(props) {
    var tips = props.datasource;
    var checkedTips = this.state.checkedTips;
    var tipStatus = {}
    tips.forEach(tip => tipStatus[tip.id] = { isCheck: false, isEdit: false });
    Object.keys(tipStatus).map(key => {
      if (checkedTips.filter(c => c.id == key).length > 0) {
        tipStatus[key].isCheck = true;
        tipStatus[key].isEdit = props.isEdit;
      }
    });

    this.setState({
      tips,
      tipStatus
    })
  }

  _checkboxChange(tip, isCheck) {
    if (isCheck) {
      this.state.checkedTips.push(tip);
    }
    else {
      var index = this.state.checkedTips.findIndex(tip);
      this.state.checkedTips.splice(index, 1);
    }
    this.props.onChange(this.state.checkedTips);
  }

  _editTip(tip) {
    this.props.editTip(tip);
    var index = this.state.checkedTips.findIndex(tip);
    if (index >= 0) {
      this.state.checkedTips.slice(index, 1);
    }
    var checkedTips = [];
    this.state.checkedTips.forEach(checkedTip => {
      if (checkedTip.id != tip.id) {
        checkedTips.push(checkedTip);
      }
    });
    this.setState({
      checkedTips
    })
  }

  render() {
    var tips = this.state.tips;

    var tipStatus = this.state.tipStatus;
    var view = tips.map(tip => {
      var tempStatus = tipStatus[tip.id] || { isCheck: false, isEdit: false };
      return <Tip key={tip.id} tip={tip} isCheck={tempStatus.isCheck} isEdit={tempStatus.isEdit} onChecked={this._checkboxChange} editTip={this._editTip} />
    });

    return (
      <div>
        {view}
      </div>
    )
  }
}