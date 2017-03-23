import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd'
import * as analysisAction from '../../actions/data-analysis';
import Chart from 'rc-echarts';
import moment from 'moment';

class DataAnalysis extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getAnalysisData = this.getAnalysisData.bind(this);
    this.addAnalysisData = this.addAnalysisData.bind(this);
    this.closeAdd = this.closeAdd.bind(this);

    this.state = {
      //true开始自增,false停止
      toggle: false,
      timeId: 0
    }

    this.getAnalysisData();
  }

  ready(chart) {
    chart.on('click', () => {
      alert('click');
    });
  }

  getAnalysisData() {
    this.props.actions.getAnalysisData({ size: 10 });
  }

  addAnalysisData() {
    this.setState({ toggle: true });
    this.state.timeId = setInterval(() => {
      let names = ['百度', '谷歌', '必应', '搜狗'];
      let createtime = new Date();
      let _self = this;
      let postList = [];
      names.forEach(name => {
        let money = parseInt(10 * Math.random() * 100 * Math.random());
        postList.push({ name, money, createtime: new Date() });
      });
      _self.props.actions.addAnalysisData(postList,()=>_self.getAnalysisData());
    }, 3000)


  }

  closeAdd() {
    this.setState({ toggle: false });
    clearInterval(this.state.timeId);
  }


  render() {
    let { analysis } = this.props.dataAnalysis;
    let legendData = analysis.map(item => item.name);
    let xAxisData = [];
    if (analysis.length > 0) {
      xAxisData = analysis[0].values.map(item => moment(new Date(item.createtime)).format('YYYY-MM-DD HH:mm:ss'))
    }

    var options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legendData
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ]
    };

    let buttonView = <Button type="primary" onClick={this.addAnalysisData}>开始自增</Button>;
    if (this.state.toggle) {
      buttonView = <Button type="danger" onClick={this.closeAdd}>停止自增</Button>;
    }


    let series = analysis.map(item => ({ name: item.name, data: item.values.map(v => v.money) }));
    let seriresView = series.map(ser => <Chart.Line key={ser.name} {...ser} onReady={(chart) => this.ready(chart)} />);

    return (
      <div style={{ margin: '50px 50px', width: '800px', fontFamily: 'Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif' }}>
        {buttonView}
        <Chart {...options} >
          {seriresView}
        </Chart>
      </div>
    )
  }
}

export default connect(
  state => ({
    dataAnalysis: state.dataAnalysis,
    common: state.common
  }),
  dispatch => ({ actions: bindActionCreators(analysisAction, dispatch) })
)(DataAnalysis)