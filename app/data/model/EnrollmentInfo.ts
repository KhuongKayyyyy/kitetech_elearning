import { EnrollmentStatus } from "../enum/EnrollmentStatus";

export interface EnrollmentInfo {
    studentId: string;
    studentName: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    semester: string;
    credits: number;
    schedule: string;
    room: string;
    enrollmentDate: string;
    status: EnrollmentStatus;
  }
  