import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const roleReducer = (state = defaultState, action) => {
  if (action.type === types.GET_ROLE_LIST) {
    return {
      ...state,
      list: action.list,
      loading: false
    }
  } else {
    return state;
  }
}