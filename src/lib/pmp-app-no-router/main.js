/**
 * Created by zhongzhengkai on 2016/12/26.
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerActions, routerMiddleware} from 'react-router-redux';
import {App, Home, ManagementOverview ,PorscheCentreReport,RegionReport} from './components/index';
import {store, DevTools} from './store/index';
const history = syncHistoryWithStore(browserHistory, store);


var rootDiv = document.getElementById('root');
if (!rootDiv) {
  console.debug('write a root div for app!');
  document.write('<div id="root"></div>');
  rootDiv = document.getElementById('root');
}

const enterHook = (nextState, replace, next) => {
  next();
};

//<Route path="region-report" component={RegionReport} onEnter={enterHook} />
//<Route path="porsche-centre-report" component={PorscheCentreReport} onEnter={enterHook} />

render(
  <Provider store={store}>
    <div>
      <App />
      {DevTools}
    </div>
  </Provider>,
  rootDiv
);