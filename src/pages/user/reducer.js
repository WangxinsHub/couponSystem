import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const userReducer = (state = defaultState, action) => {
  if (action.type === types.GET_USER_LIST) {
    return {
      ...state,
      list: action.list,
      loading: false
    }
  } else {
    return state;
  }
}