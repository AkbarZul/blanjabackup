import * as actionTypes from '../actionTypes';

export const getDetailYou = (itemId, image, price, name, size, color) => {
  return {
    type: actionTypes.GET_DETAIL_YOU,
    payload: {
      id: itemId,
      img: image,
      prc: price,
      name: name,
      size: size,
      color: color,
    },
  };
};
