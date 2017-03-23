import React from 'react'
import { render } from 'react-dom'
import { AutoComplete } from './index'

var root = document.getElementById('root');
if (!root) {
  console.log('create new root div for app!');
  document.write('<div id="root" style="margin:50px 50px;"></div>');
  root = document.getElementById('root');
}



render(<AutoComplete keyup={(e)=>console.log(e)}/>, root);