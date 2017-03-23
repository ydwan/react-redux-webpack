/**
 * Reducer 必须是同步的纯函数
 * 用户每次 dispatch(action) 后，都会触发 reducer  的执行
 * reducer 的实质是一个函数，根据 action.type 来更新 state 并返回 nextState
 * 最后会用 reducer 的返回值 nextState 完全替换掉原来的 state
 * 注意：上面的这个 “更新” 并不是指 reducer 可以直接对 state 进行修改
 * Redux 规定，须先复制一份 state，在副本 nextState 上进行修改操作
 * 例如，可以使用 lodash 的 deepClone，也可以使用 Object.assign / map / filter/ ... 等返回副本的函数
 */

function getInitialState() {
  return {
    analysis: []
  };
}

/**
 *
 * @param state
 * @param action {Object} -- {type:'',payload:{}}
 * @returns {{bookList, selectedBookId}}
 */
export default (state = getInitialState(), action) => {
  var payload = action.payload;
  switch (action.type) {
    case 'GET_DATA':
      var analysis = payload.analysis;
      return { ...state, analysis };
    default:
      return state;
  }
}