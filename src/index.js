import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware} from 'redux';
import Route from './routers';
import FastClick from 'fastclick';
import {routerMiddleware} from 'react-router-redux';
import {createHashHistory as createHistory} from 'history';
import {HashRouter as Router} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import configureStore from './store';
import './style/base.css';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// mock数据，正式时删除掉
// import '@/mock/mockData';

import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

FastClick.attach(document.body);
/**
 * Contains HTML5 browser history instance
 */
const history = createHistory();
/**
 * Represents history middleware to be injected into redux
 */
const historyMiddleware = routerMiddleware(history);

// Create middlewares
// Disable logger middlewares in production mode
let middlewares = [historyMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];  
}
/**
 * Represents the integration of redux store and react router
 * Logger must be the last middleware in chain,
 * otherwise it will log thunk and promise, not actual actions
 */
const store = configureStore(applyMiddleware(...middlewares));

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>      
      <AppContainer>
        <Router>
          <LocaleProvider locale={zhCN}>
            <Component />
          </LocaleProvider>
        </Router>
      </AppContainer>      
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept(Route, () => {
//     render(Route);
//   })
// }

