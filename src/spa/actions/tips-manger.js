import '../base/prototype-ext'
import * as api from '../base/api';


export const getTips = () => {
  return dispatch => {
    api.getTips(tips => {
      dispatch({ type: 'GET_ITEMS', payload: { tips } })
    }, dispatch);
  }
}

export const saveTip = (tip) => {
  return dispatch => {
    api.saveTip({ tip }, (tips) => {
      dispatch({ type: 'ADD_ITEM', payload: { tips } })
    }, dispatch);
  }
}

export const deleteTips = (delTips) => {
  return dispatch => {
    api.deleteTips(delTips, (tips) => {
      dispatch({ type: 'DELETE_ITEMS', payload: { tips } })
    }, dispatch);
  }
}

export const editTip = (ediTip) => {
  return dispatch => {
    api.editTip(ediTip, (tips) => {
      dispatch({ type: 'EDIT_ITEM', payload: { tips } })
    }, dispatch);
  }
}