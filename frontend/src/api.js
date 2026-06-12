import axios from 'axios';

const API = axios.create({
  baseURL: 'https://femas-backend.onrender.com/api'
});

export default API;