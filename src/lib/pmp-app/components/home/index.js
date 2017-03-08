/**
 * Created by zhongzhengkai on 2016/12/26.
 */

import React,{Component} from 'react';
import {Link} from 'react-router';


export default class Home extends Component{

  render(){
    return (
      <div>
        <h1>ooooooooooo</h1>
        <Link to="management-overview">
          management overview
        </Link>
      </div>
    );
  }

}