/**
 * Created by zhongzhengkai on 16/7/17.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerActions, routerMiddleware } from 'react-router-redux';
import { App, TipsManger } from './components/index';
import { store, DevTools } from './store/index';
const history = syncHistoryWithStore(browserHistory, store);


var rootDiv = document.getElementById('root');
if (!rootDiv) {
  console.debug('write a root div for app!');
  document.write('<div id="root"></div>');
  rootDiv = document.getElementById('root');
}

const checkToken = (nextState, replace, next) => {
  next();
};

const checkTokenForLogin = (nextState, replace, next) => {
  next();
};

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={TipsManger} onEnter={checkToken} />
          {/*<Route path='book-page' component={BookPage} onEnter={checkToken} />*/}
        </Route>
      </Router>
      {DevTools}
    </div>
  </Provider>,
  rootDiv
);