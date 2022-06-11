import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import generalReducer from './slices/generalSlice'
import ordersReducer from './slices/ordersSlice'


const rootReducer = combineReducers({
  general: generalReducer,
  user: userReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
