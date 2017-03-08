/**
 * Created by zhongzhengkai on 2016/12/26.
 */


export const getData = ()=>{
  return (dispatch)=>{
    dispatch({type:'SHOW_LOADING'});
    setTimeout(()=>{
      dispatch({type:'HIDE_LOADING'});
      dispatch({type:'getData'});
    },100)
  }
};





