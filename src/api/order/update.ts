import API from "..";
import { IOrder, IOrderSearch, OrderType } from "../../models/order.model";

interface IUpdateOrderBody {
  OrderId: number;
  CustomerName: string;
  OrderType: OrderType;
  CreatedDate: Date;
}

const orderUpdate = async (
  orderUpdateBody: IUpdateOrderBody
): Promise<IOrder> => {
  const { data } = await API.put<IOrder>("/Order", orderUpdateBody);
  return data;
};

export default orderUpdate;
