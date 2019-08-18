import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const couponStore = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_COUPON_STORE:
      return {
        ...state,
        list: action.list,
        loading: false
      }
    default: 
      return state;
  }
}