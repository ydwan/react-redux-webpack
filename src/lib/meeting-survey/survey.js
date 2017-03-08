/**
 * Created by zhongzhengkai on 2016/12/15.
 */

import React,{Component} from 'react';
import './survey.css';
//import {ajax} from 'jquery';

console.log('screenWidth:' + screen.width + ',screenHeight:' + screen.height);

var screenWidth = screen.width;
var appWidth = screenWidth > 768 ? 768 : screenWidth;
const mainStyle = {width:appWidth,height:'100%',margin:'0 auto',fontSize:'1.8em',color:'darkgray',overflowY:'auto'};

const signBtn = {width:'50%',height:'60px',fontSize:'1.2em',backgroundColor:'transparent',color:'white',border:'none'};
const signRow1 = {display:'block',margin:'0 auto',marginTop:'102px',width:'90%',height:'43px',border:'#91caf9 solid 1px',textAlign:'left',paddingTop:'10px',fontSize:'1.0em'};
const signRowOther = {display:'block',margin:'0 auto',width:'90%',height:'43px',border:'#91caf9 solid 1px',paddingTop:'10px',textAlign:'left',fontSize:'1.0em'};
const signCommitBtn = {display:'block',margin:'0 auto',width:'90%',height:'43px',backgroundColor:'#00cd00',color:'white',border:'none',fontSize:'1.0em'};
const signCommitBtnNotReady = {display:'block',margin:'0 auto',width:'90%',height:'43px',backgroundColor:'#a2a2a2',color:'white',border:'none',fontSize:'1.0em'};

const host = 'https://form.boldseas.com';


function postFormData(url, toPost, onError, onSuccess) {
  var xhr = new XMLHttpRequest();
  //var formData = new FormData();
  //
  //Object.keys(toPost || {}).forEach(function (key) {
  //  formData.append(key, toPost[key])
  //});

  xhr.open('POST', url, true);
  if (xhr.upload) {
    // xhr.upload.onprogress = onProgress;
  }

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 400) {
      onSuccess(xhr.responseBody || JSON.parse(xhr.responseText), xhr);
    } else {
      onError(new Error(xhr.responseBody));
    }
  };

  xhr.onreadystatechange = function () {
    console.log(xhr);
    if (xhr.readyState === 4) {
      if (xhr.status =0 ) {//net::ERR_INTERNET_DISCONNECTED
        return alert('您的网络不好,请稍后重试');
      }
    }
  };

  //xhr.setRequestHeader("Content-Length", queryString.length);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(toPost));
}


class Sign extends Component {

  constructor(props, context) {
    super(props, context);
    var WXUserId = document.getElementById('WXUserId') ? document.getElementById('WXUserId').value : 'nul';
    var WXDeviceId = document.getElementById('WXDeviceId') ? document.getElementById('WXDeviceId').value : 'nul';
    var signState = document.getElementById('signState').value == 'true';
    var signTime = document.getElementById('signTime').value;
    var shareStartTime = document.getElementById('shareStartTime').value ? parseInt(document.getElementById('shareStartTime').value) : 0;
    var shareEndTime = document.getElementById('shareEndTime').value ? parseInt(document.getElementById('shareEndTime').value) : 0;
    var shareId = document.getElementById('shareId').value;//分享主题的id
    this.state = {WXUserId: WXUserId, WXDeviceId: WXDeviceId, isScanBtnReady: false, signState, signTime, shareId};
    this.scanForSignIn = this.scanForSignIn.bind(this);
    this.doNothing = this.doNothing.bind(this);
  }

  componentDidMount(){
    var self = this;
    wx.ready(function(){//接口注册成功后,才点亮扫码签到按钮
      //alert('config ready');
      self.setState({isScanBtnReady:true});
    });
  }

  scanForSignIn(){
    var {WXUserId,signState,shareId,shareStartTime} = this.state;
    var self = this;
    if (signState) {
      alert('你已经签到了该分享会议!');
    } else if (Date.now() < shareStartTime) {
      alert('该分享会议还未开始!');
    } else {
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // res : {resultStr:'',errMsg:'scanQRCode:ok'}
          if(res.errMsg.indexOf('ok')!=-1){
            var urlFromCode = res.resultStr;//二维码对应的网址
            //alert(urlFromCode);
            //try{
            //  var shareIdInt = parseInt(shareId);
            //}catch(err){
            //  return alert(err);
            //}
            var toPost = {userId: WXUserId,urlFromCode: urlFromCode,shareId: shareId };
            //ajax({
            //  method:'POST',
            //  url:host + '/admin/page/sign-in/scan-for-sign-in',
            //  data:JSON.stringify(toPost),
            //  contentType:'application/json',
            //  success:function(reply){
            //    if(reply.err){
            //      alert(reply.err)
            //    }else{
            //      self.setState({signState: true, signTime: Date.now()});
            //    }
            //  },
            //  error:function(err){
            //    alert(err);
            //  }
            //});

            postFormData(host + '/admin/page/sign-in/scan-for-sign-in', toPost,
              function (err) {
                alert(err);
              }, function (reply) {
                if (reply.err) {
                  alert(reply.err)
                } else {
                  self.setState({signState: true, signTime: Date.now()});
                }
              });

          }else{
            alert(res.errMsg)
          }
        },
        error: function(res){
          if(res.errMsg.indexOf('function_not_exist') > 0){
            alert('版本过低请升级')
          }
        }
      });
    }
  }

  doNothing(){

  }

  render(){
    var {WXUserId,WXDeviceId,isScanBtnReady,signState,signTime} = this.state;
    var scanBtnStyle = signCommitBtn;
    var scanBtnClick = this.scanForSignIn;
    if (!isScanBtnReady){
      scanBtnStyle = signCommitBtnNotReady;
      scanBtnClick = this.doNothing;
    }

    var signLabel = <span className="iconfont icon-status-no" style={signRowOther}>还未签到</span>;
    if(signState)signLabel = <span className="iconfont icon-status-yes" style={signRowOther}>已签到 {signTime}</span>;

    return (
      <div>

        <div className="sign-name">
          <span className="iconfont icon-name" style={signRow1}>{WXUserId}</span>
        </div>

        <div className="sign-name">
          {signLabel}
        </div>

        <div className="sign-name">
          <button style={scanBtnStyle} onClick={scanBtnClick}>扫码签到</button>
        </div>

      </div>
    );
  }
}

export default class Survey extends Component {

  constructor(props, context) {
    super(props, context);
    var timestamp = document.getElementById('timestamp') ? document.getElementById('timestamp').value : 'nul';
    var nonceStr = document.getElementById('nonceStr') ? document.getElementById('nonceStr').value : 'nul';
    var signature = document.getElementById('signature') ? document.getElementById('signature').value : 'nul';
    var appId = document.getElementById('appId') ? document.getElementById('appId').value : 'nul';
    var shareTitle = document.getElementById('shareTitle') ? document.getElementById('shareTitle').value : '';
    var sharer= document.getElementById('sharer') ? document.getElementById('sharer').value : '';
    var hasShareMeeting = document.getElementById('hasShareMeeting').value == 'true';

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
      timestamp: parseInt(timestamp), // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature,// 必填，签名，见附录1
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.error(function(res){
      alert(JSON.stringify(res));
    });
    this.state = {shareTitle, sharer, hasShareMeeting, isScanBtnReady:false};
  }

  render(){
    var {hasShareMeeting, shareTitle, sharer} = this.state;
    if (hasShareMeeting) {
      var content = <Sign />;
      sharer = '---by ' + sharer;
    } else {
      var content = <h1>当前时刻暂无分享会议!</h1>
    }

    return (
      <div id='container' style={mainStyle}>

        <div id="t-header">
          <h2 style={{color:'white',paddingTop:8}}>{shareTitle}</h2>
          <h3 style={{position:'absolute',bottom:0,right:0,paddingRight:'3px',color:'white'}}>{sharer}</h3>
        </div>

        <div id="t-content">
          <div id="t-content-in">
            {content}
          </div>
        </div>

        <div id="t-footer">
          <button className="iconfont icon-sign" style={signBtn}>签到</button>
          <button className="iconfont icon-research" style={signBtn}>满意度</button>
        </div>

      </div>
    );
  }

}

