
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
    description: "Comprehensive midterm exam covering chapters 1-6",
    date: "2024-03-15",
    time: "09:00",
    location: "Room A101",
    duration: 120,
    class: {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Dr. Smith",
      credits: 3,
      section: 1,
      schedule: "MWF 10:00-11:00",
      location: "Room B205",
      enrolled: 45,
      rating: 4.5,
      description: "Fundamentals of computer science and programming",
      type: "Core",
      semester: "Fall 2024"
    }
  },
  {
    id: 2,
    name: "Final Examination",
    description: "Comprehensive final exam covering all course material",
    date: "2024-05-10",
    time: "14:00",
    location: "Room C301",
    duration: 180,
    class: {
      id: 2,
      code: "MATH201",
      name: "Calculus II",
      instructor: "Prof. Johnson",
      credits: 4,
      section: 2,
      schedule: "TTh 11:00-12:30",
      location: "Room D102",
      enrolled: 38,
      rating: 4.2,
      description: "Advanced calculus including integration techniques",
      type: "Core",
      semester: "Spring 2024"
    }
  },
  {
    id: 3,
    name: "Quiz 1",
    description: "Short quiz on basic algorithms",
    date: "2024-02-20",
    time: "10:00",
    location: "Room B205",
    duration: 30,
    class: {
      id: 3,
      code: "CS201",
      name: "Data Structures and Algorithms",
      instructor: "Dr. Davis",
      credits: 3,
      section: 1,
      schedule: "MWF 13:00-14:00",
      location: "Room B205",
      enrolled: 42,
      rating: 4.7,
      description: "Study of fundamental data structures and algorithms",
      type: "Core",
      semester: "Spring 2024"
    }
  }
];

