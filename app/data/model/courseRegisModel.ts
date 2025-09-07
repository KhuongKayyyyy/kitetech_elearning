export interface CourseRegistrationSchedule {
  id: number;
  course_registration_subject_id: number;
  sections: number;
  schedule: string;
  created_at: string;
  updated_at: string;
}

export interface Semester {
  id: number;
  academic_year_id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CourseRegistration {
  id: number;
  semester_id: number;
  start_date: string;
  end_date: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
  semester: Semester;
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  description: string;
  gradingFormulaId: number;
  faculty_id: number;
  created_at: string;
  updated_at: string;
}

export interface CourseRegistrationSubject {
  id: number;
  course_registration_id: number;
  subject_id: number;
  start_date: string;
  end_date: string;
  max_student: number;
  description: string;
  location: string;
  semester_id: number;
  created_at: string;
  updated_at: string;
  subject: Subject;
  courseRegistration: CourseRegistration;
  courseRegistrationSchedules: CourseRegistrationSchedule[];
}
