import API from "..";

export interface IDeleteParams {
  id: string;
}

const orderDelete = async (deleteParams: IDeleteParams): Promise<void> => {
  const { data } = await API.delete<void>("/Order", {
    params: deleteParams,
    withCredentials: true,
  });
  return data;
};

export default orderDelete;
