import { OrderType } from "../../models/order.model";

export interface IFilterData {
  customerName: string;
  orderId: string;
  orderType?: OrderType | "";
}
