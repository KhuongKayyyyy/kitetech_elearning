import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";
import { CourseRegistrationSubject } from "../model/courseRegisModel";

export const courseRegisRepository = {
  getRegisteredCourses: async (semesterId: string): Promise<CourseRegistrationSubject[]> => {
    const response = await axiosClient.get(API_CONFIG.GET_REGISTERED_COURSES(semesterId));
    return response.data;
  },
};