import * as types from './action-type';
import {message} from 'antd';
import API from '@/api/api';

// 获取一级供应商列表
export const getList = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      dispatch({
        type: types.GET_ACTIVE_LIST,
      })
      let result = await API.activeList(params);
      dispatch({
        type: types.GET_ACTIVE_LIST,
        data: result,
      })
    }catch(err){
      console.error(err);
    }
  } 
}
