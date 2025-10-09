// src/services/api.js

import axios from 'axios';

// Create an instance of Axios with a base URL
const apiClient = axios.create({
  // The base URL of your Spring Boot backend
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;