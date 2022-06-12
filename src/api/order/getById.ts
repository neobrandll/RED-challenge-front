import API from "..";
import { IOrder, ISelectedOrder } from "../../models/order.model";

const orderGetById = async (id: string): Promise<ISelectedOrder> => {
  const { data } = await API.get<ISelectedOrder>(`/Order/${id}`, {
    withCredentials: true,
  });
  return data;
};

export default orderGetById;
