import axios from "axios";
import { getApiURL } from "./Shared.service";

const API = axios.create({
  baseURL: getApiURL(), // tu API base
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.url !== "/login/") {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export default API;