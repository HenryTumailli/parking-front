import axios from "axios";
import API from "../../shared/services/Api.intercepor";
import { getApiURL } from "../../shared/services/Shared.service";
import type { AuthResponse, Login } from "../interfaces/Auth.interface";

const API_URL = getApiURL()

export const login = async (credentials: Login): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login/`, credentials);
  return response.data;
};

export const logout = async () => {
  const response = await API.post("/logout/"); // token se manda automático
  return response.data;
};