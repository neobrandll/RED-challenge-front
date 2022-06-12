import API from "..";
import { IOrder } from "../../models/order.model";

const orderGetAll = async (): Promise<IOrder[]> => {
  const { data } = await API.get<IOrder[]>("/Order", {
    withCredentials: true,
  });
  return data;
};

export default orderGetAll;
