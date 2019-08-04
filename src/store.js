/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app
 */
import {createStore, applyMiddleware} from 'redux';

import createReducer from './reducer';
import * as oneSupplier from '@/pages/oneSupplier/reducer';
import * as couponList from '@/pages/couponList/reducer';

import thunk from 'redux-thunk';

/**
 * Factory composing react store with reducers and middlewares
 * @param  {Object} initialState - Instance by calling applyMiddleware
 * @return {Store}
 */
export default function configureStore(initialState) {
  const store = createStore(
    createReducer({
      ...oneSupplier,
      ...couponList
    }),
    initialState,
    applyMiddleware(thunk)
  );
  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     store.replaceReducer(createReducer(store.asyncReducers));
  //   });
  // }

  // Extensions
  // Async reducer registry, adding an extra attribute to the store object
  store.asyncReducers = {};

  return store;
}
