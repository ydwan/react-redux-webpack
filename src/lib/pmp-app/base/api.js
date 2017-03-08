/**
 * Created by zhongzhengkai on 2016/12/27.
 */

import {doGet,doPost} from './common-func';

export const getData = (cb, dispatch)=> {
  doGet('/get-data', cb, dispatch);
};