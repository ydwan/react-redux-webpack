/**
 * Created by zhongzhengkai on 2016/12/26.
 */

import {FETCH_MO_OVERVIEW_TRAPEZIUM_DATA} from '../constants/action-name';

function getInitialState() {
  return {
    chartData: {},
    trapeziumData: {},
    age:0
  };
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case FETCH_MO_OVERVIEW_TRAPEZIUM_DATA:
      return {...state};
    case 'getData':
      return {...state, age: 2222};
    default:
      return state;
  }
}





