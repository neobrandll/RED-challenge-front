import Axios, { AxiosError } from 'axios';

import store from '../store/store';
import { SERVICE_URL } from "../constants/env"


const API = Axios.create({
  baseURL: SERVICE_URL,
});



export default API;
