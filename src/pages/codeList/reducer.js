import * as types from './action-type';


let defaultState = {
  sendList: null,
  detail: null, 
}

export const codeReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_CODE_LIST:
      return {
        ...state,
        list: action.data,
        loading: false
      }
    default: 
      return state;
  }
}