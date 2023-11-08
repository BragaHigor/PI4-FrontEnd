import axios from 'axios';

const http = axios.create({
  baseURL: 'http://pi-4-server.vercel.app/api/v1',
});

export default http;
