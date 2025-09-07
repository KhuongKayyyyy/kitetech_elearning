import React from "react";
import { BookOpen, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/hooks/useAuthentication";
import { UserRole } from "@/app/data/enum/UserRole";
interface ClassScheduleItemProps {
  course: any;
}

export default function ClassScheduleItem({ course }: ClassScheduleItemProps) {
  const router = useRouter();
  const { user } = useAuthentication();
  const isStudent = (user?.role as string) === UserRole.STUDENT;
  const displayTitle = isStudent
    ? course.subject?.name || course.name
    : course.name || course.subject?.name;
  return (
    <div
      onClick={() => {
        router.push(`/course/${course.id}`);
      }}
      key={course.id}
      className='flex items-start justify-between p-3 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white transition-colors duration-200'>
      <div className='flex-1'>
        <div className='flex items-center gap-2 mb-1'>
          <BookOpen className='h-4 w-4 text-primary' />
          <span className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
            {course.type || "Class"}
          </span>
        </div>
        <p className='text-sm text-neutral-700 dark:text-neutral-300 mb-1'>
          {displayTitle}
        </p>
        <div className='flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400'>
          <span>{course.instructor}</span>
          <div className='flex items-center gap-1'>
            <MapPin className='h-3 w-3' />
            <span>{course.location}</span>
          </div>
        </div>
      </div>
      <div className='w-2 h-2 rounded-full bg-primary opacity-75'></div>
    </div>
  );
}
