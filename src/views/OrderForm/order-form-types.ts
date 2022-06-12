import { OrderType } from "../../models/order.model";

export type OrderFormValues = {
  orderType: OrderType;
  customerName: string;
};
