export interface CourseRegistrationSchedule {
  id: number;
  sections: number;
  schedule: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface CourseRegistration {
  id: number;
  semester_id: number;
  start_date: string;
  end_date: string;
  status: string;
  semester: Semester;
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  description: string;
}

export interface AvailableCourse {
  id: number;
  subject_id: number;
  start_date: string;
  end_date: string;
  max_student: number;
  current_registrations: number;
  available_slots: number;
  description: string;
  location: string;
  subject: Subject;
  courseRegistration: CourseRegistration;
  courseRegistrationSchedules: CourseRegistrationSchedule[];
  isRegistered: boolean;
  registrationStatus?: string;
}
