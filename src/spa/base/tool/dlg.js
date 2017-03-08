/**
 * Created by zhongzhengkai on 2016/11/8.
 */

import React, {Component, PropTypes} from 'react';
import {Modal} from 'antd';

export const cry = (dialogText)=>{
  Modal.info({
    title: "错误提示",
    content: (
      <div style={{width: '100%', textAlign: 'center', paddingRight: 37}}>
        <h1>{extractText(dialogText)}</h1>
      </div>
    )
  });
};

export const smile = (dialogText)=>{
  Modal.info({
    title: "成功提示",
    content: (
      <div style={{width: '100%', textAlign: 'center', paddingRight: 37}}>
        <h1>{extractText(dialogText)}</h1>
      </div>
    )
  });
};

const extractText = (dialogText)=>{
  var text = '';
  if(dialogText instanceof Error) text = dialogText.message;
  else if(typeof dialogText == 'object') text = JSON.stringify(dialogText);
  else text = dialogText;
  return text;
};