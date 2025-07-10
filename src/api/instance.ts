import axios, { InternalAxiosRequestConfig } from 'axios'


export const API_BASE_URL = 'https://shift-intensive.ru/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
},
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('authToken'); 
  const isLoginRequest = config.url?.includes('/users/signin'); 

  if (accessToken && config.headers && !isLoginRequest) { 
      config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});