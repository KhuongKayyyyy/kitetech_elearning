import React from "react";
import EnrollInforSection from "@/components/item/EnrollInforSection";
import { EnrollmentStatus } from "@/app/data/enum/EnrollmentStatus";
import PersonalInformation from "@/components/item/PersonalInformation";

export default function page() {
  const enrollmentInfo = {
    studentId: "1234567890",
    studentName: "John Doe",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    semester: "Fall 2024",
    credits: 3,
    schedule: "Mon/Wed/Fri 10:00-11:00 AM",
    room: "Room A101",
    enrollmentDate: "2024-08-15",
    status: EnrollmentStatus.ENROLLED,
  };

  const personalInfo = {
    studentId: "1234567890",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    address: "123 Main St, Anytown, USA",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    emergencyContact: "Jane Smith",
    emergencyPhone: "123-456-7890",
    major: "Computer Science",
    year: "Junior",
    gpa: 3.5,
  };

  return (
    <div>
      <PersonalInformation personalInfo={personalInfo} />
      <div className='py-10'>
        <EnrollInforSection enrollmentInfo={enrollmentInfo} />
      </div>
    </div>
  );
}
