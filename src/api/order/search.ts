import API from "..";
import { IOrder, IOrderSearch } from "../../models/order.model";

const orderSearch = async (searchParams: IOrderSearch): Promise<IOrder[]> => {
  const { data } = await API.get<IOrder[]>("/Order", { params: searchParams });
  return data;
};

export default orderSearch;
