import API from "../../shared/services/Api.intercepor";
import type { User } from "../../auth/interfaces/Auth.interface";

export const getAllUsers = async ():Promise<User[]> => {
  const response = await API.get("/api/users");
  return response.data;
};