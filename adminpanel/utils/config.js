import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

AxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  // config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers.Authorization = accessToken;
  return config;
});

export const ClientSideAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

ClientSideAxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  // config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers.Authorization = accessToken;
  return config;
});
