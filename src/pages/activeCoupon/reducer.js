import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const couponReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_LIST:
      return {
        ...state,
        list: action.list,
        loading: false
      }
    case types.GET_PLATFORM_LIST:
      return {
        ...state,
        platformList: action.list,
        loading: false
      }
    case types.UPDATE_COUPON:
      return {
        ...state,
        result: action.result,
        loading: false
      }
    case types.CREATE_COUPON:
      return {
        ...state,
        result: action.result,
        loading: false
      }
    default: 
      return state;
  }
}