import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';
import Nav from '@/components/home/index';

/**
 *ssss
 */
export default class Router extends React.Component {
  static contextTypes = {
    store: object,
  };
  /**
   * [constructor description]
   * @param  {[type]} props   [description]
   * @param  {[type]} context [description]
   */
  constructor(props, context) {
    super(props);
    this.login = lodable({
      loader: () => {
        return import('@/pages/login/index');
      },
      loading: () => {
        return (
            <div className="am-loading page">
              <div className="am-loading-indicator" aria-hidden="true">
                <div className="am-loading-item"></div>
                <div className="am-loading-item"></div>
                <div className="am-loading-item"></div>
              </div>
              <div className="am-loading-text">加载中</div>
            </div>);
      },
    });
    this.oneSupplier = lodable({
      loader: () => {
        return import('@/pages/oneSupplier/index');
      },
      loading: () => {
        return (
            <div className="am-loading page">
              <div className="am-loading-indicator" aria-hidden="true">
                <div className="am-loading-item"></div>
                <div className="am-loading-item"></div>
                <div className="am-loading-item"></div>
              </div>
              <div className="am-loading-text">加载中</div>
            </div>);
      },
    });
  };
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <HashRouter>
        <Switch>
          <Nav>
            <Route  path="/login" component={this.login}/>
            <Route exact path="/" component={this.login}/>
            <Route exact path="/supplier/oneSupplier" component={this.oneSupplier}/>
          </Nav>
        </Switch>
      </HashRouter>
    );
  }
}