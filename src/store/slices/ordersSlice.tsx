import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authLogin from "../../api/auth/login";
import orderCreate from "../../api/order/create";
import orderGetAll from "../../api/order/getAll";
import { IOrder } from "../../models/order.model";
import { OrderFormValues } from "../../views/OrderForm/order-form-types";
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

export const createOrderThunk = createAsyncThunk(
  "users/createOrderThunk",
  async (createOrderBody: OrderFormValues, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "createOrder" }));
      const data = await orderCreate({
        ...createOrderBody,
        createdDate: new Date(),
      });
      dispatch(hideLoader({ action: "createOrder" }));
      return data;
    } catch (e) {
      dispatch(hideLoader({ action: "createOrder" }));
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

    builder.addCase(
      createOrderThunk.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        state.orders = state.orders.concat([action.payload]);
      }
    );
  },
});

export const { addOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
