import API from "..";
import { IOrder, OrderType } from "../../models/order.model";

interface IOrderBody {
  orderType: OrderType;
  customerName: string;
  createdDate: Date;
}

const orderCreate = async (createBody: IOrderBody): Promise<IOrder> => {
  const { data } = await API.post<IOrder>("/Order", createBody, {
    withCredentials: true,
  });
  return data;
};

export default orderCreate;
