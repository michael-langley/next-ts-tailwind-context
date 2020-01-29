import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
