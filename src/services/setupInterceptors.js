import axios from "axios";
import { getToken } from "@/utils/auth";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
