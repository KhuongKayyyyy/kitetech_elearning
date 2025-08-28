import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";

export const classSessionRepository = {
  getClassSessions: (id: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_SESSIONS(id)),
  getClassDetail: (id: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_DETAIL(id)),
};
