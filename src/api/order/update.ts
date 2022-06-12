import API from "..";
import { IOrder, IOrderSearch, OrderType } from "../../models/order.model";

export interface IUpdateOrderBody {
  orderId: number;
  customerName: string;
  orderType: OrderType;
}

const orderUpdate = async (
  orderUpdateBody: IUpdateOrderBody
): Promise<IOrder> => {
  const { data } = await API.put<IOrder>("/Order", orderUpdateBody, {
    withCredentials: true,
  });
  return data;
};

export default orderUpdate;
