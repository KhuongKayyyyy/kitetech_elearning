import React from "react";
import { Users } from "lucide-react";
import PeopleInClassItem from "@/components/item/PeopleInClassItem";

export default function PeopleInClassList() {
  // Fake data for people in class
  const classMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "teacher" as const,
      avatar: "",
      phone: "+1 (555) 123-4567",
      status: "online" as const,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 234-5678",
      status: "online" as const,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 345-6789",
      status: "offline" as const,
    },
    {
      id: 4,
      name: "David Park",
      email: "david.park@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 456-7890",
      status: "online" as const,
    },
    {
      id: 5,
      name: "Prof. James Wilson",
      email: "james.wilson@university.edu",
      role: "teacher" as const,
      avatar: "",
      phone: "+1 (555) 567-8901",
      status: "offline" as const,
    },
    {
      id: 6,
      name: "Anna Thompson",
      email: "anna.thompson@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 678-9012",
      status: "online" as const,
    },
    {
      id: 7,
      name: "Alex Kim",
      email: "alex.kim@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 789-0123",
      status: "offline" as const,
    },
    {
      id: 8,
      name: "Lisa Wang",
      email: "lisa.wang@student.edu",
      role: "student" as const,
      avatar: "",
      phone: "+1 (555) 890-1234",
      status: "online" as const,
    },
  ];

  // Separate teachers and students
  const teachers = classMembers.filter((person) => person.role === "teacher");
  const students = classMembers.filter((person) => person.role === "student");

  const handleMessage = (person: any) => {
    console.log("Messaging:", person);
    // TODO: Implement messaging functionality
  };

  const handleCall = (person: any) => {
    console.log("Calling:", person);
    // TODO: Implement calling functionality
  };

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm my-5'>
      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700'>
          <Users className='h-5 w-5 text-blue-600 dark:text-blue-400' />
        </div>
        <div>
          <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
            People in Class
          </h3>
          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
            {teachers.length} teacher{teachers.length !== 1 ? "s" : ""},{" "}
            {students.length} student{students.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Teachers Section */}
      {teachers.length > 0 && (
        <div className='mb-6'>
          <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 px-1'>
            Teachers ({teachers.length})
          </h4>
          <div className='space-y-3'>
            {teachers.map((teacher) => (
              <PeopleInClassItem
                key={teacher.id}
                person={teacher}
                onMessage={handleMessage}
                onCall={handleCall}
              />
            ))}
          </div>
        </div>
      )}

      {/* Students Section */}
      {students.length > 0 && (
        <div>
          <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 px-1'>
            Students ({students.length})
          </h4>
          <div className='space-y-3'>
            {students.map((student) => (
              <PeopleInClassItem
                key={student.id}
                person={student}
                onMessage={handleMessage}
                onCall={handleCall}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {classMembers.length === 0 && (
        <div className='text-center py-8'>
          <Users className='h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-3' />
          <h4 className='text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2'>
            No class members yet
          </h4>
          <p className='text-sm text-neutral-400 dark:text-neutral-500'>
            Class members will appear here once enrolled
          </p>
        </div>
      )}
    </div>
  );
}
