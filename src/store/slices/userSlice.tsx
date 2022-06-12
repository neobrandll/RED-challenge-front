import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import authLogin, { ILoginBody } from "../../api/auth/login";
import { IUser } from "../../models/user.model";
import { AppThunk } from "../store";
import { hideLoader, showLoader } from "./generalSlice";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "../../constants/env";
import authRegister, { IRegisterBody } from "../../api/auth/register";

type UserState = {
  user: Partial<IUser> | null;
  isAuth: boolean;
};

const getDefaultValues = (): UserState => {
  const localUser = localStorage.getItem("user");
  let user: Partial<IUser> | null = null;
  let isAuth = false;

  if (localUser) {
    user = JSON.parse(localUser) as Partial<IUser>;
    isAuth = true;
  }

  return {
    isAuth,
    user,
  };
};

const initialState: UserState = getDefaultValues();

export const loginThunk = createAsyncThunk(
  "users/loginThunk",
  async (loginBody: ILoginBody, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "login" }));
      const data = await authLogin(loginBody);
      dispatch(hideLoader({ action: "login" }));
      return data;
    } catch (e) {
      dispatch(hideLoader({ action: "login" }));
      console.log(e);
      throw e;
    }
  }
);

export const registerThunk = createAsyncThunk(
  "users/registerThunk",
  async (registerBody: IRegisterBody, { dispatch }) => {
    try {
      dispatch(showLoader({ action: "register" }));
      const data = await authRegister(registerBody);
      dispatch(hideLoader({ action: "register" }));
      return data;
    } catch (e) {
      dispatch(hideLoader({ action: "register" }));
      console.log(e);
      throw e;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.clear();
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<UserState["user"]>) => {
        state.user = action.payload;
        localStorage.clear();
        state.isAuth = true;
        localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      }
    );
    builder.addCase(
      registerThunk.fulfilled,
      (state, action: PayloadAction<UserState["user"]>) => {
        state.user = action.payload;
        localStorage.clear();
        state.isAuth = true;
        localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      }
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
