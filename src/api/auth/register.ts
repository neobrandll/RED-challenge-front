import API from '..';

interface IRegisterBody {
        userName: string,
        password: string,
        repeatPasswordConfirmation: string,
        email: string
}

const authRegister = async (registerBody: IRegisterBody): Promise<void> => {
  const { data } = await API.post<void>('/Register', registerBody);
  return data;
};

export default authRegister;