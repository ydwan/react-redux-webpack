import React,{Component} from 'react';

/**
 * 选择框,支持单选或复选,默认复选,
 * 实例化时,加入isSingleSelect属性,改为单选模式
 * <SelectBox isSingleSelect labels={['a','n']} />
 */
export default class SelectBox extends Component{

  constructor(props, context) {
    super(props, context);
    const labelMap = props.labelMap ? props.labelMap : {};
    let isSingleSelect = props.isSingleSelect != undefined;
    let selectedLabel = '';//最近一次选择的label值
    const keys = Object.keys(labelMap);
    if (keys.length > 0)selectedLabel = keys[0];
    this.state = {labelMap, title: props.title, selectedLabel, isSingleSelect, shouldUpdate: false};
    this.switchLabel = this.switchLabel.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //console.log('componentWillReceiveProps');
    this.state.shouldUpdate = false;
  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log('shouldComponentUpdate',nextState.shouldUpdate);
    return nextState.shouldUpdate;
  }

  switchLabel(e) {
    var label = e.target.getAttribute('data-label');
    if (!label) label = e.target.innerText;
    var {selectedLabel,labelMap} = this.state;
    if (this.state.isSingleSelect)labelMap[selectedLabel] = false;
    labelMap[label] = !labelMap[label];
    this.setState({selectedLabel: label, labelMap,shouldUpdate:true});
    //this.props.onLabelSelect(labelMap);
  }

  render(){
    console.log('%c@@@ SelectBox','color:green');
    var {labelMap,title} = this.state;
    var labelsView = Object.keys(labelMap).map((label,idx)=> {
      if (labelMap[label])
        return (
          <span key={idx} onClick={this.switchLabel} data-label={label}>
            <span className="iconfont icon-check" data-label={label} style={{color:'#bc0113',fontWeight:'900'}}/>
            <label style={{marginRight:8,fontWeight:'900'}}>{label}</label>
          </span>
        );
      else
        return (
          <span key={idx} onClick={this.switchLabel} data-label={label}>
            <span className="iconfont icon-circle" data-label={label} style={{color:'gray',fontSize:'1.2em'}}/>
            <label style={{marginRight:8}}>{label}</label>
          </span>
        );
    });

    return (
      <div style={{margin:0,paddingTop:13,height:48,width:'100%',borderBottom:'black 1px solid',boxSizing:'border-box'}}>
        <div style={{display:'inline-block',width:'30%',paddingLeft:'6px',boxSizing:'border-box'}}>
          <label style={{fontWeight:'900'}}>{title}</label>
        </div>
        <div style={{display:'inline-block',width:'70%'}}>
          {labelsView}
        </div>
      </div>
    );
  }

}