/**
 * Created by zhongzhengkai on 2016/12/26.
 */


import {} from '../constants/action-name';

function getInitialState() {
  return {
    data:1
  };
}

export default (state = getInitialState(), action) => {
  var payload = action.payload;
  switch (action.type) {
    default:
      return state;
  }
}