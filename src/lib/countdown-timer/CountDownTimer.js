/**
 * Created by ypf on 2016/11/10.
 */
import React from 'react';
//count 不写，默认60;speed 不写，默认1000 ms; callBack 不写，不执行;disabledColor不写，默认gray;value若不写,默认：倒计时
export default class CountDownTimer extends React.Component {

  constructor(props, context) {
    super(props, context);
    var style = props.style ? props.style : {
      color: 'white',
      width: 100,
      height: 30,
      borderRadius: 10,
      border: null,
      backgroundColor: '#49C0F6'
    };
    var disabledColor = props.disabledColor ? props.disabledColor : 'gray';
    this.state = {
      value: props.value ? props.value : '倒计时',
      isAllowClick: '',
      style: style,
      callBack: props.callBack,
      disabledColor: disabledColor
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    var self = this;
    var props = self.props;
    var state = self.state;
    props.callBack ? props.callBack() : '';
    var oldValue = props.value;
    var oldCount = props.count ? props.count : 60;
    var oldStyle = state.style;
    var speed = props.speed ? props.speed : 1000;
    self.setState({
      isAllowClick: 'disabled',
      style: {...oldStyle, backgroundColor: state.disabledColor},
      value: --oldCount
    });
    var timerId = setInterval(()=> {
      if (oldCount > 0) {
        self.setState({value: --oldCount});
      } else {
        self.setState({value: oldValue, isAllowClick: '', style: oldStyle});
        clearInterval(timerId);
      }
    }, speed);
  }

  render() {
    return (<div>
      <input style={this.state.style} type="button" onClick={this._handleClick} value={this.state.value}
             disabled={this.state.isAllowClick}/>
    </div>);
  }
}