import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
});

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.get(url, config);
};

export const Post = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.post(url, data, config);
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.delete(url, config);
};

export const Patch = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.patch(url, data, config);
};

export const Put = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.put(url, data, config);
};
