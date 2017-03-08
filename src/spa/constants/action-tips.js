/**
 * keyMirror这个方法非常的有用，它可以帮助我们轻松创建与键值key相等的常量。
 * constants定义action的type
 */

import { keyMirror } from 'react/lib/keyMirror'
export default keyMirror({
  ADD_ITEM: null,
  DELETE_ITEMS: null,
  EDIT_ITEM: null,
  GET_ITEMS:null
})

// 等于
// export const ADD_ITEM = 'ADD_ITEM';
// export const DELETE_ITEMS = 'DELETE_ITEMS';
// export const EDIT_ITEM = 'EDIT_ITEM';
// export const GET_ITEMS = 'GET_ITEMS';