import axios from 'axios';

import credentials from '../config/credentials';

const api = axios.create({
  baseURL: 'https://api-sandbox.bitfyapp.com'
});

api.defaults.headers.common['Authorization'] =
  `Basic ${btoa(`${credentials.apiKey}:${credentials.apiSecret}`)}`;

export default api;
