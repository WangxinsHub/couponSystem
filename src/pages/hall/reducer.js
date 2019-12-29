import * as types from './action-type';


let defaultState = {
  sendList: null,
  detail: null, 
}

export const hallReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_MALL_LIST:
      return {
        ...state,
        hallList: action.hallList,
        loading: false
      }
    default: 
      return state;
  }
}