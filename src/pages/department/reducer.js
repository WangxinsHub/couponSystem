import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const departmentReducer = (state = defaultState, action) => {
  if (action.type === types.GET_DEPARTMENT_LIST) {
    return {
      ...state,
      list: action.list,
      loading: false
    }
  } else {
    return state;
  }
}