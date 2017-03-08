/**
 * Created by zhongzhengkai on 2016/11/8.
 */


export default function print(str){
  console.log(str);
}

export function addNumber(x,y){
  return x + y;
}

//export {addNumber as default}
var a = 2;
export {a as default}; // ==> export default a