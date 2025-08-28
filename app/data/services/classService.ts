import { toast } from "sonner";
import { classRepository } from "../respository/classRepository";

export const classService = {
  getClasses: async () => {
    try {
      const response = await classRepository.getClasses();
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Failed to fetch classes");
      throw error;
    }
  },

  deleteClass: async (classId: string) => {
    try {
      const response = await classRepository.deleteClass(classId);
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Failed to delete class");
      throw error;
    }
  },

  getClassMembers: async (classId: string) => {
    try {
      const response = await classRepository.getClassMembers(classId);
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Failed to fetch class members");
      throw error;
    }
  },

  getClassGrades: async (classId: string) => {
    try {
      const response = await classRepository.getClassGrades(classId);
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Failed to fetch class grades");
      throw error;
    }
  },

  updateClassGrade: async (classId: string, studentId: string, gradeData: any) => {
    try {
      const response = await classRepository.updateClassGrade(classId, studentId, gradeData);
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Failed to update class grade");
      throw error;
    }
  },
};

function handleServiceError(error: any, fallbackMessage: string) {
  toast.error(error.response?.data?.message || fallbackMessage);
  throw error;
}
