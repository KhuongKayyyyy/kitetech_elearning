import { courseRegisRepository } from "../respository/courseRegisRepository";
import { CourseRegistrationSubject } from "../model/courseRegisModel";
import { AvailableCourse } from "../model/availableCourse";

export const courseRegisService = {
  getRegisteredCourses: async (semesterId: string): Promise<CourseRegistrationSubject[]> => {
    return await courseRegisRepository.getRegisteredCourses(semesterId);
  },
  getAvailableCourses: async (): Promise<AvailableCourse[]> => {
    return await courseRegisRepository.getAvailableCourses();
  },
  registerCourse: async (courseRegistrationSubjectIds: number[]): Promise<void> => {
    return await courseRegisRepository.registerCourse(courseRegistrationSubjectIds);
  },
};