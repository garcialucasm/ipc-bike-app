import axios from "axios";

// api.js
const apiUrl = 'http://localhost:3000';

export const api = {
  baseUrl: apiUrl,
};

export const ApiHeader = axios.create({
  baseURL: apiUrl,
});