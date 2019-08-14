import * as types from './action-type';
import {message} from 'antd';
import API from '@/api/api';

// 获取一级供应商列表
export const getList = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      dispatch({
        type: types.GET_CODE_LIST,
      })
      let result = await API.codeList(params);
      dispatch({
        type: types.GET_CODE_LIST,
        data: result,
      })
    }catch(err){
      console.error(err);
    }
  } 
}
