/**
 * Created by zhongzhengkai on 2016/12/26.
 */


export const getCSSPixelWidth = ()=>{
  var screenWidth = screen.width;
  var dpr = window.devicePixelRatio;
  var appWidth = screenWidth/1;
  console.log('----->screenWidth:'+screenWidth+', devicePixelRatio:'+dpr);
  return appWidth;
};

