
import React, {Component, PropTypes} from 'react';

export const cry = (dialogText)=>{
};

export const smile = (dialogText)=>{
};

const extractText = (dialogText)=>{
  var text = '';
  if(dialogText instanceof Error) text = dialogText.message;
  else if(typeof dialogText == 'object') text = JSON.stringify(dialogText);
  else text = dialogText;
  return text;
};