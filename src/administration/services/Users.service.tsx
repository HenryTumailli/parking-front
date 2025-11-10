import API from "../../shared/services/Api.intercepor";
import type { User } from "../../auth/interfaces/Auth.interface";

export const getAllUsers = async ():Promise<User[]> => {
  const response = await API.get("/api/users");
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await API.post("/api/users/",user)
  return response.data;
}

export const updateUser = async (userId: number,user: User): Promise<User> => {
  const response = await API.put(`/api/users/${userId}/`,user)
  return response.data;
}