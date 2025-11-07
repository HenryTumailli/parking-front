import API from "../../shared/services/Api.intercepor";
import type { Group } from "../interfaces/Administration.interface";

export const getAllGroups = async ():Promise<Group[]> => {
  const response = await API.get("/api/groups");
  return response.data;
};

export const updateGroup = async(groupId:number,data:Group):Promise<Group>=>{
    const response = await API.patch(`/api/groups/${groupId}/`,data)
    return response.data;
}

export const createGroup = async(data:Group):Promise<Group>=>{
    const response = await API.post(`/api/groups/`,data)
    return response.data;
}