import * as types from './action-type';


let defaultState = {
  sendList: null,
  detail: null, 
}

export const activeListReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_ACTIVE_LIST:
      return {
        ...state,
        list: action.data,
        loading: false
      }
    default: 
      return state;
  }
}