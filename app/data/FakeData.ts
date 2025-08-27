import { UserRole } from "./enum/UserRole";
import { getStudentsByClass, getTeacherByClass } from "./api/user_data";
import { CourseData } from "./api/course_data";
import { useAuthentication } from "@/hooks/useAuthentication";

export class FakeData {
  static getCourseSchedule() {
    return [
      {
        id: 1,
        courseId: 1,
        section: 1,
        date: "22/08/2025",
      },
      {
        id: 2,
        courseId: 2,
        section: 1,
        date: "22/08/2025",
      },
    ];
  }

  static getCurrentUserRole() {
    const user = useAuthentication();
    return user.user?.role;
  }

  // Get enrolled students for a specific course
  static getEnrolledStudentsForCourse(courseId: number) {
    // For now, we'll map course IDs to class IDs for demonstration
    // In a real system, this would come from enrollment data
    const courseToClassMapping: { [courseId: number]: number } = {
      1: 1, // CS 2110 -> Class 1
      2: 2, // PE 1440 -> Class 2  
      3: 3, // PHIL 1101 -> Class 3
      4: 4, // CS 3410 -> Class 4
      5: 5, // MATH 2940 -> Class 5
      6: 6, // PE 1220 -> Class 6
    };
    
    const classId = courseToClassMapping[courseId];
    if (!classId) {
      // Default to class 1 if no mapping exists
      return [];
    }
    
    // Get students for the class
    const students = getStudentsByClass(classId);
    
    // For course 1 (CS 2110), limit to 22 students to match the UI
    if (courseId === 1) {
      return students.slice(0, 22);
    }
    
    return students;
  }

  // Get teacher for a specific course
  static getTeacherForCourse(courseId: number) {
    // For now, we'll map course IDs to class IDs for demonstration
    // In a real system, this would come from course assignment data
    const courseToClassMapping: { [courseId: number]: number } = {
      1: 1, // CS 2110 -> Class 1
      2: 2, // PE 1440 -> Class 2  
      3: 3, // PHIL 1101 -> Class 3
      4: 4, // CS 3410 -> Class 4
      5: 5, // MATH 2940 -> Class 5
      6: 6, // PE 1220 -> Class 6
    };
    
    const classId = courseToClassMapping[courseId];
    if (!classId) {
      // Default to class 1 if no mapping exists
      return null;
    }
    
    // Import the function to get teacher by class
    return getTeacherByClass(classId);
  }

  // Get enrolled student count for a specific course
  static getEnrolledStudentCount(courseId: number): number {
    const students = this.getEnrolledStudentsForCourse(courseId);
    return students.length;
  }

  static getClassSections() {
    return [
      {
        id: 1,
        course: CourseData.getCourses()[0],
        section: 1,
        name: "Section 1",
      },
      {
        id: 2,
        course: CourseData.getCourses()[0],
        section: 2,
        name: "Section 2",
      },
      {
        id: 3,
        course: CourseData.getCourses()[0],
        section: 3,
        name: "Section 3",
      },
      {
        id: 4,
        course: CourseData.getCourses()[0],
        section: 4,
        name: "Section 4",
      },
    ];
  }

  static getClassSectionMaterial() {
    return [
      {
        id: 1,
        classSectionId: 1,
        material: "Course Outline",
        type: "link",
        content: "https://example.com/material1.pdf",
      },
       {
        id: 2,
        classSectionId: 1,
        material: "Announcement",
        type: "announcement",
        content: "This is a test announcement"
      },
      {
        id: 3,
        classSectionId: 1,
        material: "Submission",
        type: "submission",
        content: `# Fable - Manga Reading App `
      },
      {
        id: 4,
        classSectionId: 1,
        material: "Announcement",
        type: "announcement",
        content: `# Fable - Manga Reading App `
      },

      {
        id: 5,
        classSectionId: 2,
        material: "Announcement",
        type: "announcement",
        content: `# Fable - Manga Reading App `
      },
      {
        id: 6,
        classSectionId: 2,
        material: "Announcement",
        type: "announcement",
        content: `# Fable - Manga Reading App `
      },
    ];
  }

  static getSubjects() {
    return [
      {
        id: "1",
        subjectId: "101",
        name: "Financial Accounting",
        description: "Introduction to financial reporting and analysis.",
        majorId: "101",
      departmentId: 1,
      credits: 3,
    },
    {
      id: "2", 
      subjectId: "102",
      name: "Marketing Strategies",
      description: "Study of consumer behavior and branding techniques.",
      majorId: "102",
      departmentId: 1,
      credits: 3,
    },
    {
      id: "3",
      subjectId: "103",
      name: "Corporate Finance",
      description: "Focus on investment and financial management.",
      majorId: "103",
      departmentId: 1,
      credits: 4,
    },
    {
      id: "4",
      subjectId: "104",
      name: "Organizational Leadership",
      description: "Principles of management and leadership in organizations.",
      majorId: "104",
      departmentId: 1,
      credits: 3,
    },
    {
      id: "5",
      subjectId: "201",
      name: "Music Theory",
      description: "Study of musical structures and composition.",
      majorId: "201",
      departmentId: 2,
      credits: 3,
    },
    {
      id: "6",
      subjectId: "202",
      name: "Art History",
      description: "Exploration of visual arts across cultures and time.",
      majorId: "202",
      departmentId: 2,
      credits: 3,
    },
    {
      id: "7",
      subjectId: "203",
      name: "Theater Performance",
      description: "Practical and theoretical aspects of performing arts.",
      majorId: "203",
      departmentId: 2,
      credits: 4,
    },
    {
      id: "8",
      subjectId: "204",
      name: "World Literature",
      description: "Analysis of literary works from various cultures.",
      majorId: "204",
      departmentId: 2,
      credits: 3,
    },
    {
      id: "9",
      subjectId: "301",
      name: "Cell Biology",
      description: "Study of cellular structures and functions.",
      majorId: "301",
      departmentId: 3,
      credits: 4,
    },
    {
      id: "10",
      subjectId: "302",
      name: "Organic Chemistry",
      description:
        "Understanding the structure and reactions of organic compounds.",
      majorId: "302",
      departmentId: 3,
      credits: 4,
    },
    {
      id: "11",
      subjectId: "303",
      name: "Classical Mechanics",
      description: "Exploration of motion and forces in physical systems.",
      majorId: "303",
      departmentId: 3,
      credits: 4,
    },
    {
      id: "12",
      subjectId: "304",
      name: "Linear Algebra",
      description: "Study of vector spaces and linear transformations.",
      majorId: "304",
      departmentId: 3,
      credits: 3,
    },
    {
      id: "13",
      subjectId: "401",
      name: "Criminal Justice",
      description: "Overview of criminal law and justice systems.",
      majorId: "401",
      departmentId: 4,
      credits: 3,
    },
    {
      id: "14",
      subjectId: "402",
      name: "Corporate Governance",
      description: "Study of laws governing corporate practices.",
      majorId: "402",
      departmentId: 4,
      credits: 3,
    },
    {
      id: "15",
      subjectId: "403",
      name: "International Treaties",
      description: "Legal frameworks for international agreements.",
      majorId: "403",
      departmentId: 4,
      credits: 3,
    },
    {
      id: "16",
      subjectId: "404",
      name: "Constitutional Law",
      description:
        "Analysis of constitutional principles and their applications.",
      majorId: "404",
      departmentId: 4,
      credits: 4,
    },
    {
      id: "17",
      subjectId: "501",
      name: "Database Systems",
      description: "Design and management of database systems.",
      majorId: "501",
      departmentId: 5,
      credits: 3,
    },
    {
      id: "18",
      subjectId: "502",
      name: "Machine Learning",
      description: "Introduction to algorithms and models in AI.",
      majorId: "502",
      departmentId: 5,
      credits: 4,
    },
    {
      id: "19",
      subjectId: "503",
      name: "Network Security",
      description: "Techniques for securing digital networks.",
      majorId: "503",
      departmentId: 5,
      credits: 3,
    },
    {
      id: "20",
      subjectId: "504",
      name: "Data Structures",
      description: "Core principles of data organization and manipulation.",
      majorId: "504",
      departmentId: 5,
      credits: 3,
    },
  ];
  
  }
}
