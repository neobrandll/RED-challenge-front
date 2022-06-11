import API from '..';

interface ILoginBody {
  userName: string;
  password: string;
}

const authLogin = async (loginBody: ILoginBody): Promise<void> => {
  const { data } = await API.post<void>('/Login', loginBody);
  return data;
};

export default authLogin;