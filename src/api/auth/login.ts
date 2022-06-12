import { AxiosResponse } from "axios";
import API from "..";
import { IUser } from "../../models/user.model";

export interface ILoginBody {
  userName: string;
  password: string;
}

const authLogin = async (loginBody: ILoginBody): Promise<IUser> => {
  const { data } = await API.post<IUser>("/Login", loginBody, {
    withCredentials: true,
  });
  return data;
};

export default authLogin;
