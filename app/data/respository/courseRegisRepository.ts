import { API_CONFIG } from "@/constants/api_config";
import axiosClient from "../client/axios_client";
import { CourseRegistrationSubject } from "../model/courseRegisModel";
import { AvailableCourse } from "../model/availableCourse";

export const courseRegisRepository = {
  getRegisteredCourses: async (semesterId: string): Promise<CourseRegistrationSubject[]> => {
    const response = await axiosClient.get(API_CONFIG.GET_REGISTERED_COURSES(semesterId));
    return response.data;
  },
  getAvailableCourses: async (): Promise<AvailableCourse[]> => {
    const response = await axiosClient.get(API_CONFIG.GET_AVAILABLE_COURSES);
    return response.data;
  },
  registerCourse: async (courseRegistrationSubjectIds: number[]): Promise<void> => {
    const requestData = {
      course_registration_subject_ids: courseRegistrationSubjectIds,
    };
    console.log('Register course request:', requestData);
    console.log('API endpoint:', API_CONFIG.REGISTER_COURSE);
    console.log('Request data type:', typeof requestData);
    console.log('Course IDs type:', typeof courseRegistrationSubjectIds);
    console.log('Course IDs array:', courseRegistrationSubjectIds);
    
    try {
      const response = await axiosClient.post(API_CONFIG.REGISTER_COURSE, requestData);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        requestData: requestData,
        headers: error.config?.headers,
        url: error.config?.url,
        method: error.config?.method
      });
      
      // If it's a 400 error, let's try to provide more specific error information
      if (error.response?.status === 400) {
        const errorData = error.response?.data;
        console.error('400 Bad Request - Server response:', errorData);
        
        // Check if the error message gives us clues about what's wrong
        if (errorData?.message) {
          console.error('Server error message:', errorData.message);
        }
        if (errorData?.errors) {
          console.error('Server validation errors:', errorData.errors);
        }
      }
      
      throw error;
    }
  },
};