export const API_CONFIG = {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    GET_USER_INFO: "/api/auth/current-user",
  
    // Academic Year
    GET_ACADEMIC_YEARS: "/api/academic-years",
    GET_ACADEMIC_YEAR: (id: string) => `/api/academic-years/${id}`,
    ADD_ACADEMIC_YEAR: "/api/academic-years",
    UPDATE_ACADEMIC_YEAR: (id: string) => `/api/academic-years/${id}`,
    DELETE_ACADEMIC_YEAR: (id: string) => `/api/academic-years/${id}`,


    // Class
    GET_CLASSES: "/api/classrooms/my-classrooms ",
    GET_CLASS: (id: string) => `/api/classes/${id}`,
    ADD_CLASS: "/api/classes",
    UPDATE_CLASS: (id: string) => `/api/classes/${id}`,
    DELETE_CLASS: (id: string) => `/api/classes/${id}`,
}