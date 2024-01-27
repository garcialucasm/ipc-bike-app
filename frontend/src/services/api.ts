import { authHeader } from "@/utils/authUtils";
import axios from "axios";

// api.js
const apiUrl = 'http://localhost:3000';

export const ApiHeader = axios.create({
  baseURL: apiUrl,
  headers: authHeader().headers,
});