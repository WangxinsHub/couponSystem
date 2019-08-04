import * as types from './action-type';
import {message} from 'antd';
import API from '@/api/api';

// 获取一级供应商列表
export const getList = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      dispatch({
        type: types.GET_LIST,
      })
      let result = await API.getList(params);
      // 如果不成功，则将不成功的信息打印出来
      if(!result.success) {
        if(result.code!==900015){
          message.error(result.message);
        }
      }
      dispatch({
        type: types.GET_LIST,
        list: result,
      })
    }catch(err){
      console.error(err);
    }
  } 
}
