import { courseRegisRepository } from "../respository/courseRegisRepository";
import { CourseRegistrationSubject } from "../model/courseRegisModel";

export const courseRegisService = {
  getRegisteredCourses: async (semesterId: string): Promise<CourseRegistrationSubject[]> => {
    return await courseRegisRepository.getRegisteredCourses(semesterId);
  },
};