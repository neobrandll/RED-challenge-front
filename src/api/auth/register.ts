import API from "..";
import { IUser } from "../../models/user.model";

export interface IRegisterBody {
  userName: string;
  password: string;
  repeatPasswordConfirmation: string;
  email: string;
}

const authRegister = async (registerBody: IRegisterBody): Promise<IUser> => {
  const { data } = await API.post<IUser>("/Register", registerBody);
  return data;
};

export default authRegister;
