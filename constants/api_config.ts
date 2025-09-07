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
    GET_CLASS_SESSIONS: (id: string) => `/api/classrooms/my-classrooms/${id}`,
    GET_CLASS_DETAIL: (id: string) => `/api/classrooms/${id}/posts-by-session`,
    GET_CLASS_POST: (id: string) => `/api/classrooms/${id}/posts`,
    ADD_CLASS: "/api/classes",
    UPDATE_CLASS: (id: string) => `/api/classes/${id}`,
    DELETE_CLASS: (id: string) => `/api/classes/${id}`,
    GET_CLASS_MEMBERS: (id: string) => `/api/classrooms/${id}/members`,
    GET_CLASS_GRADES: (id: string) => `/api/classrooms/${id}/grades`,

    // class session
    // GET_CLASS_SESSION_DETAIL: (id: string) => `/api/classrooms/my-classrooms/${id}/sessions`,

    // Class Section material:
    CREATE_CLASS_SECTION_MATERIAL: (id: string) => `/api/classrooms/${id}/posts`,
    GET_CLASS_FILES: (id: string) => `/api/classrooms/${id}/files`,
    UPDATE_CLASS_GRADE: (id: string,studentId:string) => `/api/classrooms/${id}/grades/${studentId}`,
    GET_MATERIAL_DETAIL: (id: string, materialId: string) => `/api/classrooms/${id}/posts/${materialId}`,
    // ADD_CLASS_SECTION_MATERIAL: (id: string) => `/api/classrooms/my-classrooms/${id}/materials`,
    // UPDATE_CLASS_SECTION_MATERIAL: (id: string) => `/api/classrooms/my-classrooms/${id}/materials/${id}`,
    // DELETE_CLASS_SECTION_MATERIAL: (id: string) => `/api/classrooms/my-classrooms/${id}/materials/${id}`,



    // course registration
    GET_REGISTERED_COURSES: (semesterId: string) => `/api/student-course-registration/subjects-by-semester?semester_id=${semesterId}`,
    GET_REGISTERED_COURSE: (id: string) => `/api/course-registrations/${id}`,
    ADD_REGISTERED_COURSE: "/api/course-registrations",
    UPDATE_REGISTERED_COURSE: (id: string) => `/api/course-registrations/${id}`,
    DELETE_REGISTERED_COURSE: (id: string) => `/api/course-registrations/${id}`,

    // semester
    GET_SEMESTERS: "/api/semesters",
    GET_SEMESTER: (id: string) => `/api/semesters/${id}`,
    ADD_SEMESTER: "/api/semesters",
    UPDATE_SEMESTER: (id: string) => `/api/semesters/${id}`,
    DELETE_SEMESTER: (id: string) => `/api/semesters/${id}`,
    GET_BY_ACADEMIC_YEAR_ID: (academic_year_id: string) => `/api/semesters/academic-year/${academic_year_id}`,
}