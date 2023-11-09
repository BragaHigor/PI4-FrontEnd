import axios from 'axios';

const http = axios.create({
  baseURL: 'http://pi-4-server.vercel.app/api/v1',
});

export default http;

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const http = axios.create({
//   baseURL: 'http://pi-4-server.vercel.app/api/v1',
// });

// http.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token_API');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// export default http;
