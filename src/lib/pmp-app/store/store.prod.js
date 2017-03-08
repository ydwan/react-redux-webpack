/**
 * Created by zhongzhengkai on 16/7/20.
 */


import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import {routerReducer} from 'react-router-redux';


const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

console.log('---------------------------------------------------------');
console.log('__APP_ENV__:' + __APP_ENV__);
console.log('---------------------------------------------------------');

var composedCreateStore = compose(applyMiddleware(thunk))(createStore);

export const store = composedCreateStore(reducer);
export const DevTools = '';