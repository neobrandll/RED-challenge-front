import API from "..";

export interface IDeleteParams {
  ids: number[];
}

const orderDelete = async (deleteParams: IDeleteParams): Promise<void> => {
  const { data } = await API.delete<void>("/Order", {
    data: deleteParams.ids,
    withCredentials: true,
  });
  return data;
};

export default orderDelete;
