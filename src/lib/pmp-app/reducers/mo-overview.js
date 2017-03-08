/**
 * Created by zhongzhengkai on 2016/12/26.
 */

import {FETCH_MO_OVERVIEW_TRAPEZIUM_DATA} from '../constants/action-name';

function getInitialState() {
  return {
    chartData: 1,
    trapeziumData: 1,
    age:0
  };
}

export default (state = getInitialState(), action) => {
  var payload = action.payload;
  switch (action.type) {
    case FETCH_MO_OVERVIEW_TRAPEZIUM_DATA:
      return {...state};
    case 'GET_DATA':
      return {...state, ...payload};
    default:
      return state;
  }
}





