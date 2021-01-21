import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import detailProductReducer from './detailProductReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  cart: cartReducer,
  detailProductState: detailProductReducer,
  authReducer: authReducer,
});



export default reducers;
