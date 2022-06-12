import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authLogin from "../../api/auth/login";
import orderCreate from "../../api/order/create";
import orderDelete from "../../api/order/delete";
import orderGetAll from "../../api/order/getAll";
import orderGetById from "../../api/order/getById";
import orderUpdate, { IUpdateOrderBody } from "../../api/order/update";
import { IOrder, ISelectedOrder } from "../../models/order.model";
import { OrderFormValues } from "../../views/OrderForm/order-form-types";
import { AppThunk } from "../store";
import { showLoader, hideLoader } from "./generalSlice";

export interface IOrdersState {
  orders: IOrder[];
  selectedOrder: ISelectedOrder | null;
}

const initialState: IOrdersState = {
  orders: [],
  selectedOrder: null,
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

export const deleteOrdersThunk = createAsyncThunk(
  "users/deleteOrdersThunk",
  async (ids: number[], { dispatch }) => {
    try {
      dispatch(showLoader({ action: "deleteOrders" }));
      const data = await orderDelete({ ids });
      dispatch(hideLoader({ action: "deleteOrders" }));
      return ids;
    } catch (e) {
      dispatch(hideLoader({ action: "deleteOrders" }));
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

export const updateOrderThunk = createAsyncThunk(
  "users/updateOrderThunk",
  async (updateOrderBody: IUpdateOrderBody, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "updateOrder" }));
      const data = await orderUpdate(updateOrderBody);
      dispatch(hideLoader({ action: "updateOrder" }));
      return data;
    } catch (e) {
      dispatch(hideLoader({ action: "updateOrder" }));
      console.log(e);
      throw e;
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk(
  "users/getOrderByIdThunk",
  async (orderId: string, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "getOrderById" }));
      const order = await orderGetById(orderId);
      dispatch(hideLoader({ action: "getOrderById" }));
      return order;
    } catch (e) {
      dispatch(hideLoader({ action: "getOrderById" }));
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

    // builder.addCase(
    //   deleteOrdersThunk.fulfilled,
    //   (state, action: PayloadAction<string[]>) => {
    //     state.orders = state.orders.filter((order) =>
    //       payload.action.includes(order.orderId)
    //     );
    //   }
    // );

    builder.addCase(
      deleteOrdersThunk.fulfilled,
      (state, action: PayloadAction<number[]>) => {
        console.log(action.payload);
        state.orders = state.orders.filter(
          (order) => !action.payload.includes(+order.orderId)
        );
      }
    );

    builder.addCase(
      updateOrderThunk.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        state.selectedOrder = null;
      }
    );
    builder.addCase(
      getOrderByIdThunk.fulfilled,
      (state, action: PayloadAction<ISelectedOrder>) => {
        state.selectedOrder = action.payload;
      }
    );
  },
});

export const { addOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
