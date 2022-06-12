import Axios, { AxiosError } from "axios";

import store from "../store/store";
import { SERVICE_URL } from "../constants/env";

const API = Axios.create({
  baseURL: SERVICE_URL,
});

// API.interceptors.request.use((config) => {
//   const localUser = localStorage.getItem("adacaUser");

//   if (localUser) {
//     const user = JSON.parse(localUser) as IUser;
//     if (!config.headers.Authorization)
//       config.headers.Authorization = `Bearer ${user.jwt}`;
//   }
//   return config;
// });

export default API;
