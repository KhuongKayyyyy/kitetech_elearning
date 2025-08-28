import { classSessionRepository } from "../respository/classSesstionRepository";

export const classSessionService = {
  getClassSessions: async (id: string) => {
    try {
      const response = await classSessionRepository.getClassSessions(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching class sessions:", error);
      throw error;
    }
  },
  getClassDetail: async (id: string) => {
    try {
      const response = await classSessionRepository.getClassDetail(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching class detail:", error);
      throw error;
    }
  },
};
