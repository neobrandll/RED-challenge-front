import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authLogin from "../../api/auth/login";
import orderGetAll from "../../api/order/getAll";
import { IOrder } from "../../models/order.model";
import { AppThunk } from "../store";
import { showLoader, hideLoader } from "./generalSlice";

export interface IOrdersState {
  orders: IOrder[];
}

const initialState: IOrdersState = {
  orders: [],
};

export const getAllOrdersThunk = createAsyncThunk(
  "users/loginThunk",
  async (_, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "getAllOrders" }));
      const data = await orderGetAll();
      dispatch(hideLoader({ action: "getAllOrders" }));
      return data;
    } catch (e) {
      dispatch(hideLoader({ action: "getAllOrders" }));
      console.log(e);
      throw e;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action: PayloadAction<{ newOrders: IOrder[] }>) {
      state.orders = state.orders.concat(action.payload.newOrders);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllOrdersThunk.fulfilled,
      (state, action: PayloadAction<IOrdersState["orders"]>) => {
        state.orders = action.payload;
      }
    );
  },
});

export const { addOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
