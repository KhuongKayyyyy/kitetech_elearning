import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";

export const classRepository = {
  getClasses: () => axiosClient.get(API_CONFIG.GET_CLASSES),

  deleteClass: (classId: string) =>
    axiosClient.delete(API_CONFIG.DELETE_CLASS(classId)),
};
