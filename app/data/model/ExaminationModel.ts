export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  section: number;
  schedule: string;
  location: string;
  enrolled: number;
  rating: number;
  type: string;
  semester: string;
}

export interface ExaminationModel {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  duration: number;
  class: Course;
}

export const MockExaminationData: ExaminationModel[] = [
  {
    id: 1,
    name: "Midterm Examination",
    description: "Midterm exam covering programming fundamentals and C language basics",
    date: "2025-11-15",
    time: "09:00",
    location: "C101",
    duration: 90,
    class: {
      id: 1,
      name: "Introduction to Programming",
      description: "Fundamentals of programming using C language.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 2,
      schedule: "Wednesday",
      location: "C101",
      enrolled: 97,
      rating: 4.8,
      type: "elective",
      semester: "HK1 2025-2026"
    }
  },
  {
    id: 2,
    name: "Final Examination",
    description: "Comprehensive final exam covering all data structures and algorithms",
    date: "2025-12-20",
    time: "14:00",
    location: "B202",
    duration: 120,
    class: {
      id: 2,
      name: "Data Structures and Algorithms",
      description: "Study of data organization and algorithm design.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 4,
      section: 4,
      schedule: "Saturday",
      location: "B202",
      enrolled: 167,
      rating: 3.6,
      type: "required",
      semester: "HK1 2025-2026"
    }
  },
  {
    id: 3,
    name: "Midterm Examination",
    description: "Database design, SQL queries, and normalization concepts",
    date: "2025-11-18",
    time: "10:00",
    location: "A201",
    duration: 90,
    class: {
      id: 3,
      name: "Database Systems",
      description: "Relational databases, SQL, and normalization.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 1,
      schedule: "Wednesday",
      location: "A201",
      enrolled: 237,
      rating: 4,
      type: "main",
      semester: "HK1 2025-2026"
    }
  },
  {
    id: 4,
    name: "Final Examination",
    description: "OS principles, process management, and memory allocation",
    date: "2025-12-22",
    time: "08:00",
    location: "C101",
    duration: 120,
    class: {
      id: 4,
      name: "Operating Systems",
      description: "Principles of OS, processes, and memory management.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 1,
      schedule: "Saturday",
      location: "C101",
      enrolled: 56,
      rating: 4.4,
      type: "elective",
      semester: "HK1 2025-2026"
    }
  },
  {
    id: 5,
    name: "Quiz",
    description: "Quiz on networking protocols and TCP/IP fundamentals",
    date: "2025-10-25",
    time: "13:00",
    location: "B202",
    duration: 45,
    class: {
      id: 5,
      name: "Computer Networks",
      description: "Networking models, TCP/IP, routing and switching.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 5,
      schedule: "Wednesday",
      location: "B202",
      enrolled: 126,
      rating: 4.8,
      type: "required",
      semester: "HK1 2025-2026"
    }
  },
  {
    id: 6,
    name: "Final Examination",
    description: "Comprehensive networking exam covering all course topics",
    date: "2025-12-18",
    time: "15:00",
    location: "B202",
    duration: 120,
    class: {
      id: 5,
      name: "Computer Networks",
      description: "Networking models, TCP/IP, routing and switching.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 5,
      schedule: "Wednesday",
      location: "B202",
      enrolled: 126,
      rating: 4.8,
      type: "required",
      semester: "HK1 2025-2026"
    }
  }
];
