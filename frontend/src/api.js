import axios from 'axios';

const API = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5001/api' 
    : 'https://femas-backend.onrender.com/api'
});

export default API;