import { combineReducers } from '@reduxjs/toolkit';

import shopsReducer from './shops/shopsSlice';
import productsReducer from './products/productsSlice';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';

const rootReducer = combineReducers({
  shops: shopsReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducer;
