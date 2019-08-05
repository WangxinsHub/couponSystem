import * as types from './action-type';


let defaultState = {
  sendList: null,
  detail: null, 
}

export const sendRecordReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_SEND_LIST:
      return {
        ...state,
        sendList: action.sendList,
        loading: false
      }
    default: 
      return state;
  }
}