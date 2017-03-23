import React from 'react'
import './index.css'

export class AutoComplete extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.keyup = this.keyup.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      value: props.value,
      datasource: [],
      showlist: [],
      x: 0,
      y: 0,
      width: 150
    }
  }

  keyup(e) {
    var autotext = this.refs.autotext.value;
    this.props.keyup(autotext);
    var datasource = [
      { text: 'aaa', value: 'aaa' },
      { text: 'aba', value: 'aba' },
      { text: 'aca', value: 'aca' },
      { text: 'bbb', value: 'bbb' },
      { text: 'ccc', value: 'ccc' },
      { text: 'ddd', value: 'ddd' }
    ];
    var showlist = datasource.filter(item => item.text.indexOf(autotext) >= 0);
    if (!autotext) showlist = [];
    this.setState({
      datasource,
      showlist,
      x: this.refs.autotext.offsetLeft,
      y: this.refs.autotext.offsetTop + 23
    });
  }

  onBlur() {
    // var _self = this;
    // setTimeout(() => _self.setState({
    //   showlist: []
    // }), 100);
  }

  select(item) {
    this.setState({
      value: item.value
    });
  }

  render() {
    var optionsView = this.state.showlist.map(item => {
      return <div value={item.value} key={item.value} className={'auto-complete-options'} onClick={() => this.select(item)}>{item.text}</div>
    });
    var style = {
      position: 'absolute',
      left: this.state.x,
      top: this.state.y,
      width: this.state.width,
      display: optionsView.length > 0 ? 'block' : 'none',
      borderLeft: '1px solid #d5d5d5',
      borderRight: '1px solid #d5d5d5',
      borderBottom: '1px solid #d5d5d5',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    }

    return (
      <div style={{ margin: 20 }}>
        <input type="text" ref="autotext" onKeyUp={this.keyup} onBlur={this.onBlur} defaultValue={this.state.value} value={this.state.value} style={{ width: this.state.width }} />
        <div style={style}>
          {optionsView}
        </div>
      </div>
    );
  }
}