/**
 * Created by zhongzhengkai on 2016/12/16.
 */

import React from 'react';
import {render} from 'react-dom';
import Index from './index'

var root = document.getElementById('root');
if(!root){
  console.log('create new root div for app!');
  document.write('<div id="root"></div>');
  root = document.getElementById('root');
}

render(<Index />, root);
