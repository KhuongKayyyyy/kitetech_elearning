import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";

export const classRepository = {
  getClasses: () => axiosClient.get(API_CONFIG.GET_CLASSES),

  deleteClass: (classId: string) =>
    axiosClient.delete(API_CONFIG.DELETE_CLASS(classId)),

  getClassMembers: (classId: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_MEMBERS(classId)),

  getClassGrades: (classId: string) =>
    axiosClient.get(API_CONFIG.GET_CLASS_GRADES(classId)),

  updateClassGrade: (classId: string, studentId: string, gradeData: {
    qt1Grade: number;
    qt2Grade: number;
    midtermGrade: number;
    finalGrade: number;
  }) =>
    axiosClient.put(API_CONFIG.UPDATE_CLASS_GRADE(classId, studentId), gradeData),
};
