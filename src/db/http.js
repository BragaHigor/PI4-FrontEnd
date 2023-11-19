import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const token = async () => {
  return (await AsyncStorage.getItem('token_API')) || null;
};

const http = axios.create({
  baseURL: 'http://pi-4-server.vercel.app/api/v1',
  timeout: 5000,
});

http.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${await token()}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default http;
