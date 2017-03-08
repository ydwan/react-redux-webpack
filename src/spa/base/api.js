/**
 * Created by zhongzhengkai on 2016/11/8.
 */

import { doGet, doPost } from './common-func';

export const getBooks = (cb, dispatch) => {
  doGet('/get-books', cb, dispatch);
};

export const getUsers = (cb, dispatch) => {
  doGet('/get-users', cb, dispatch);
}


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