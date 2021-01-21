import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  detailProductState: [],
};

const detailProduct = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_DETAIL_YOU:
      return {
        ...state,
        detailProductState: [...state.detailProductState, action.payload],
      };
    default:
      return state;
  }
};

export default detailProduct;
