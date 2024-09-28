const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // AuthService base URL
  timeout: 5000, // 5 seconds timeout
});

module.exports = axiosInstance;
