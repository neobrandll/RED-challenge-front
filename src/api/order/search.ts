import API from "..";
import { IOrder, IOrderSearch } from "../../models/order.model";

const orderSearch = async (searchParams: IOrderSearch): Promise<IOrder[]> => {
  const { data } = await API.get<IOrder[]>("/search", {
    params: searchParams,
    withCredentials: true,
  });
  return data;
};

export default orderSearch;
