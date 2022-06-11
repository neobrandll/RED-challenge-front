import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../models/order.model';
import { AppThunk } from '../store';

export interface IOrdersSlice{
    orders: IOrder[];
}

const initialState: IOrdersSlice = {
    orders : [],
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
      addOrders(state, action: PayloadAction<{ newOrders: IOrder[] }>) {
        state.orders = state.orders.concat(action.payload.newOrders);
      }
    },
  });


  export const { addOrders } = ordersSlice.actions;

  export default ordersSlice.reducer;