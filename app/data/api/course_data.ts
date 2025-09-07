export class CourseData {
    static getCourses() {
        return [
            {
                id: 1,
                code: "CS101",
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
            },
            {
                id: 2,
                code: "CS201",
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
            },
            {
                id: 3,
                code: "CS301",
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
            },
            {
                id: 4,
                code: "CS401",
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
            },
            {
                id: 5,
                code: "CS501",
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
        ];
    }
}