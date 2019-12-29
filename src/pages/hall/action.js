import * as types from './action-type';
import {message} from 'antd';
import API from '@/api/api';

// 获取一级供应商列表
export const getList = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      dispatch({
        type: types.GET_MALL_LIST,
      })
      let result = await API.mList(params);
      dispatch({
        type: types.GET_MALL_LIST,
        hallList: result,
      })
    }catch(err){
      console.error(err);
    }
  } 
}
