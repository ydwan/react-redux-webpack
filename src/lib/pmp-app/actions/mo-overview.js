/**
 * Created by zhongzhengkai on 2016/12/26.
 */
import * as api from '../base/api';

export const getData = ()=>{

  //return (dispatch)=>{
  //  dispatch({type:'SHOW_LOADING'});
  //  setTimeout(()=>{
  //    dispatch({type:'HIDE_LOADING'});
  //    dispatch({type:'getData'});
  //  },100)
  //}

  return (dispatch)=> {
    api.getData((data)=> {
      dispatch({type: 'GET_DATA', payload: data});
    }, dispatch)
  }

};





