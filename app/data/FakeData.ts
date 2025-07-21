import { UserRole } from "./enum/UserRole";

export class FakeData {
  static getCourses() {
    return [
            {
              id: 1,
              code: "CS 2110",
              name: "Object-Oriented Programming and Data Structures",
              instructor: "Dr. Sarah Johnson",
              credits: 4,
              section: 1,
              schedule: "Thursday",
              location: "C001",
              enrolled: 245,
              rating: 4.8,
              description:
                "Introduction to object-oriented programming with Java and fundamental data structures.",
              type: "main",
              semester: "HK1 2023-2024",
            },
            {
              id: 2,
              code: "PE 1440",
              name: "Swimming for Beginners",
              instructor: "Coach Mike Wilson",
              credits: 1,
              section: 1,
              schedule: "Thursday",
              location: "TDTU Pool",
              enrolled: 18,
              rating: 4.9,
              description:
                "Learn basic swimming techniques and water safety in a supportive environment.",
              type: "pe",
              semester: "HK1 2023-2024",
            },
            {
              id: 3,
              code: "PHIL 1101",
              name: "Introduction to Philosophy",
              instructor: "Prof. Emily Chen",
              credits: 3,
              section: 1,
              schedule: "Thursday",
              location: "D304",
              enrolled: 89,
              rating: 4.6,
              description:
                "Explore fundamental questions about existence, knowledge, and ethics through classic texts.",
              type: "philosophy",
              semester: "HK1 2023-2024",
            },
            {
              id: 4,
              code: "CS 3410",
              name: "Computer System Organization and Programming",
              instructor: "Dr. Michael Brown",
              credits: 4,
              section: 1,
              schedule: "Monday & Wednesday",
              location: "B205",
              enrolled: 167,
              rating: 4.5,
              description:
                "Computer organization, instruction sets, assembly language, and system-level programming.",
              type: "main",
              semester: "HK1 2023-2024",
            },
            {
              id: 5,
              code: "MATH 2940",
              name: "Linear Algebra for Engineers",
              instructor: "Prof. Lisa Anderson",
              credits: 4,
              section: 1,
              schedule: "Tuesday & Friday",
              location: "A301",
              enrolled: 134,
              rating: 4.3,
              description:
                "Vector spaces, linear transformations, eigenvalues, and applications to engineering.",
              type: "main",
              semester: "HK1 2023-2024",
            },
            {
              id: 6,
              code: "PE 1220",
              name: "Basketball Fundamentals",
              instructor: "Coach David Rodriguez",
              credits: 1,
              section: 1,
              schedule: "Tuesday",
              location: "Main Gym",
              enrolled: 22,
              rating: 4.7,
              description:
                "Learn basketball basics including shooting, dribbling, passing, and game strategy.",
              type: "pe",
              semester: "HK1 2023-2024",
            },
            {
              id: 7,
              code: "PE 1350",
              name: "Yoga and Mindfulness",
              instructor: "Instructor Maria Santos",
              credits: 1,
              section: 1,
              schedule: "Thursday",
              location: "Studio A",
              enrolled: 15,
              rating: 4.9,
              description:
                "Practice yoga poses, breathing techniques, and mindfulness meditation for wellness.",
              type: "pe",
              semester: "HK1 2023-2024",
            },
            {
              id: 8,
              code: "PHIL 2200",
              name: "Ethics and Moral Philosophy",
              instructor: "Dr. James Thompson",
              credits: 3,
              section: 1,
              schedule: "Monday & Wednesday",
              location: "C203",
              enrolled: 76,
              rating: 4.4,
              description:
                "Examination of major ethical theories and their applications to contemporary moral issues.",
              type: "philosophy",
              semester: "HK1 2023-2024",
            },
            {
              id: 9,
              code: "PHIL 3150",
              name: "Philosophy of Mind",
              instructor: "Prof. Rachel Green",
              credits: 3,
              section: 1,
              schedule: "Tuesday & Thursday",
              location: "D201",
              enrolled: 45,
              rating: 4.6,
              description:
                "Explore consciousness, personal identity, and the mind-body problem in philosophy.",
              type: "philosophy",
              semester: "HK1 2023-2024",
            },
            {
              id: 10,
              code: "ENGL 1110",
              name: "Academic Writing and Research",
              instructor: "Prof. Jennifer Lee",
              credits: 3,
              section: 1,
              schedule: "Tuesday & Thursday",
              location: "E102",
              enrolled: 98,
              rating: 4.2,
              description:
                "Develop academic writing skills, research methods, and critical thinking through essays.",
              type: "english",
              semester: "HK1 2023-2024",
            },
            {
              id: 11,
              code: "ENGL 2030",
              name: "American Literature Survey",
              instructor: "Dr. Robert Kim",
              credits: 3,
              section: 1,
              schedule: "Monday & Wednesday",
              location: "E205",
              enrolled: 67,
              rating: 4.5,
              description:
                "Survey of American literature from colonial times to the present, including major authors and movements.",
              type: "english",
            semester: "HK2 2023-2024",
            },
            {
              id: 12,
              code: "ENGL 3420",
              name: "Creative Writing Workshop",
              instructor: "Prof. Amanda White",
              credits: 3,
              section: 1,
              schedule: "Wednesday",
              location: "E108",
              enrolled: 18,
              rating: 4.8,
              description:
                "Workshop-based course focusing on developing original fiction and poetry writing skills.",
        type: "english",
        semester: "HK2 2023-2024",
      },
    ];
  }


  static getCourseSchedule() {
    return [
      {
        id: 1,
        courseId: 1,
        section: 1,
        date: "18/06/2025",
      },
      {
        id: 2,
        courseId: 2,
        section: 1,
        date: "18/06/2025",
      },
    ];
  }

  static getCurrentUserRole() {
    return UserRole.TEACHER;
  }

  static getClassSections() {
    return [
      {
        id: 1,
        courseId: 1,
        section: 1,
        name: "Section 1",
      },
      {
        id: 2,
        courseId: 1,
        section: 2,
        name: "Section 2",
      },
      {
        id: 3,
        courseId: 1,
        section: 3,
        name: "Section 3",
      },
      {
        id: 4,
        courseId: 1,
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
        content: `# Fable - Manga Reading App
      Fable is a mobile application designed for manga lovers, providing an intuitive and seamless experience for discovering, reading, and managing manga collections.
      
      ## Features
      
      - **User Authentication**  
        - Sign up, log in, and manage user profiles.
      
      - **Read Manga**  
        - Enjoy reading manga directly within the app.  
        - Supports saving the current reading chapter for each book.
      
      - **Manga Library**  
        - Browse a vast collection of manga by genre and popularity.  
        - Save manga to your personal library for easy access.
      
      - **Search Functionality**  
        - Search manga by name or genre.  
        - View details such as title, author, and description.
      
      - **User Dashboard**  
        - Track reading progress and favorite books.  
        - Personalized recommendations based on reading history.
      
      - **Rich Visuals**  
        - Manga thumbnails and categorized sections for easy navigation.
      
      ## Screenshots
      
      ![Fable App](https://github.com/KhuongKayyyyy/fable_cosmic_read_app_fe/raw/main/Fable.png)
      
      ## Demo Video
      
      Watch the full demo of Fable on YouTube:  
      [![Watch the video](https://img.youtube.com/vi/mtDNdVpexxc/0.jpg)](https://youtu.be/mtDNdVpexxc?si=PJxa3RYyfuZANv3P)
      
      ## Installation
      
      1. Clone the repository:
         \`\`\`sh
         git clone https://github.com/KhuongKayyyyy/fable_cosmic_read_app_fe
         \`\`\`
      
      2. Navigate to the project directory:
         \`\`\`sh
         cd fable-manga-app
         \`\`\`
      
      3. Install dependencies:
         \`\`\`sh
         npm install
         \`\`\`
      
      4. Run the app:
         \`\`\`sh
         npm start
         \`\`\`
        `
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
