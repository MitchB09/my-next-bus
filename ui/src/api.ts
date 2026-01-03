import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PERSONAL_DOMAIN as string,
  timeout: 5000,
});

export default api;
