import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user.model';


type UserState = {
  user: Partial<IUser> | null;
  isAuth: boolean;
};

const getDefaultValues = (): UserState => {
  const localUser = localStorage.getItem('User');
  let user: Partial<IUser> | null = null;
  let isAuth = false;

  if (localUser) {
    user = JSON.parse(localUser) as Partial<IUser>;
    // isAuth = !!user.jwt;
  }

  return {
    isAuth,
    user,
  };
};

const initialState: UserState = getDefaultValues();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
      localStorage.clear();
      localStorage.setItem('User', JSON.stringify({ ...action.payload }));
      state.isAuth = true;
    },
    logout(state) {
      state.user = null;
      localStorage.clear();
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
