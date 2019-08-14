/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app
 */
import {createStore, applyMiddleware} from 'redux';

import createReducer from './reducer';
import * as oneSupplier from '@/pages/oneSupplier/reducer';
import * as couponList from '@/pages/couponList/reducer';
import * as couponSendReducer from '@/pages/couponSend/reducer';
import * as couponPlantReducer from '@/pages/couponPlant/reducer'
import * as activeConfigReducer from '@/pages/activeConfig/reducer'
import * as sendRecordReducer from '@/pages/sendRecord/reducer'
import * as activeListReducer from '@/pages/activeList/reducer'
import * as departmentReducer from '@/pages/department/reducer'
import * as userReducer from '@/pages/user/reducer'
import * as roleReducer from '@/pages/role/reducer'
import * as codeReducer from '@/pages/codeList/reducer'


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
            ...couponList,
            ...couponSendReducer,
            ...couponPlantReducer,
            ...activeConfigReducer,
            ...sendRecordReducer,
            ...activeListReducer,
            ...departmentReducer,
            ...userReducer,
            ...roleReducer,
            ...codeReducer
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
