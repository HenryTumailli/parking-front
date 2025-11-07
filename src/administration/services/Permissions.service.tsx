import API from "../../shared/services/Api.intercepor";
import type { Permission } from "../interfaces/Administration.interface";

export const getAllPermissions = async ():Promise<Permission[]> => {
  const response = await API.get("/api/permissions");
  return response.data;
};