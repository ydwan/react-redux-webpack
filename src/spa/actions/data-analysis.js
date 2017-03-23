import '../base/prototype-ext'
import * as api from '../base/api';

export const getAnalysisData = (pager) => {
  return dispatch => {
    api.getAnalysisData(pager, analysis => {
      dispatch({ type: 'GET_DATA', payload: { analysis } });
    }, dispatch)
  }
}

export const addAnalysisData = (analysisDataList,cb) => {
  return dispatch => {
    api.addAnalysisData(analysisDataList, analysis => {
      dispatch({ type: 'ADD_DATA', payload: { analysis } });
      cb();
    })
  }
}