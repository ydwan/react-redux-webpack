/**
 * Created by zhongzhengkai on 2016/12/26.
 */

import {SHOW_LOADING,HIDE_LOADING} from '../constants/action-name';
import {REQUEST_START,REQUEST_END} from '../constants/net-status';


function getInitialState() {
  return {
    requestStatus:REQUEST_END
  };
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {...state, requestStatus: REQUEST_START};
    case HIDE_LOADING:
      return {...state, requestStatus: REQUEST_END};
    default:
      return state;
  }
}