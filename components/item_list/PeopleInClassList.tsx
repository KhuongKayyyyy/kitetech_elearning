import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import PeopleInClassItem from "@/components/item/PeopleInClassItem";
import { classRepository } from "@/app/data/respository/classRepository";

interface PeopleInClassListProps {
  courseId: number;
}

interface ClassMember {
  id: number;
  user_id: number;
  role: "Teacher" | "Student";
  joined_at: string;
  is_active: boolean;
  user: {
    id: number;
    username: string;
    full_name: string;
    email: string;
  };
}

export default function PeopleInClassList({
  courseId,
}: PeopleInClassListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [classMembers, setClassMembers] = useState<ClassMember[]>([]);

  useEffect(() => {
    const fetchClassMembers = async () => {
      try {
        setIsLoading(true);
        const response = await classRepository.getClassMembers(
          courseId.toString()
        );
        setClassMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch class members:", error);
        setClassMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassMembers();
  }, [courseId]);

  // Transform class members to match expected format
  const transformedMembers = classMembers.map((member: ClassMember) => ({
    id: member.user.id,
    name: member.user.full_name,
    email: member.user.email,
    role: member.role.toLowerCase() as "teacher" | "student",
    avatar: null, // No avatar in API response
    phone: "",
    status: member.is_active ? ("online" as const) : ("offline" as const),
  }));

  // Separate teachers and students
  const teachers = transformedMembers.filter(
    (member) => member.role === "teacher"
  );
  const students = transformedMembers.filter(
    (member) => member.role === "student"
  );

  const handleMessage = (person: any) => {
    console.log("Messaging:", person);
    // TODO: Implement messaging functionality
  };

  const handleCall = (person: any) => {
    console.log("Calling:", person);
    // TODO: Implement calling functionality
  };

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm my-5'>
        {/* Header Skeleton */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-9 h-9 animate-pulse'></div>
          <div>
            <div className='h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mb-2 animate-pulse'></div>
            <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 animate-pulse'></div>
          </div>
        </div>

        {/* Teachers Section Skeleton */}
        <div className='mb-6'>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20 mb-3 animate-pulse'></div>
          <div className='space-y-3'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='flex items-center gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700'>
                <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-1 animate-pulse'></div>
                  <div className='h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse'></div>
                </div>
                <div className='flex gap-2'>
                  <div className='w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                  <div className='w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Section Skeleton */}
        <div>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20 mb-3 animate-pulse'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='flex items-center gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700'>
                <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-1 animate-pulse'></div>
                  <div className='h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse'></div>
                </div>
                <div className='flex gap-2'>
                  <div className='w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                  <div className='w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            {teachers.map((teacher: any) => (
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
            {students.map((student: any) => (
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
      {teachers.length === 0 && students.length === 0 && (
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
