/**
 * Created by zhongzhengkai on 2016/11/8.
 */

import { doGet, doPost } from './common-func';

export const getTips = (cb, dispatch) => {
  doGet('/get-tips', cb, dispatch);
}


export const saveTip = (toPost, cb, dispatch) => {
  doPost('/save-tip', JSON.stringify(toPost), cb, dispatch);
}

export const deleteTips = (toPost, cb, dispatch) => {
  doPost('/delete-tips', JSON.stringify(toPost), cb, dispatch);
}

export const editTip = (toPost, cb, dispatch) => {
  doPost('/edit-tip', JSON.stringify(toPost), cb, dispatch);
}

export const getAnalysisData = (toPost, cb, dispatch) => {
  doPost('/getAnalysisData', JSON.stringify(toPost), cb, dispatch);
}

export const addAnalysisData = (toPost, cb, dispatch) => {
  doPost('/addAnalysisData', JSON.stringify(toPost), cb, dispatch);
}