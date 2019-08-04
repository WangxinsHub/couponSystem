import * as types from './action-type';


let defaultState = {  
  list: null,
  detail: null, 
}

export const couponPlantReducer = (state = defaultState, action) => {
  switch(action.type){
    case types.GET_LIST:
      return {
        ...state,
        list: action.list,
        loading: false
      }
    default: 
      return state;
  }
}