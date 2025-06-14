import { User } from "lucide-react";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface RecentAccessCourseItemProps {
  course: Course;
}

export default function RecentAccessCourseItem({
  course,
}: RecentAccessCourseItemProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/course/${course.id}`);
      }}
      key={course.id}
      className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer group'>
      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-2'>
          <BookOpen className='h-4 w-4 text-primary' />
          <span className='text-sm font-semibold text-primary'>
            {course.code}
          </span>
        </div>
        <div className='w-2 h-2 rounded-full bg-green-500'></div>
      </div>

      <h3 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors'>
        {course.name}
      </h3>

      <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2'>
        <User className='h-3 w-3' />
        <span>{course.instructor}</span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-xs text-neutral-500 dark:text-neutral-400'>
          {course.semester}
        </span>
        <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'>
          {course.type}
        </span>
      </div>
    </div>
  );
}
