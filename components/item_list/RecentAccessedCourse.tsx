import React from "react";
import { BookOpen, Clock, User } from "lucide-react";
import { FakeData } from "../../app/data/FakeData";
import RecentAccessCourseItem from "../item/RecentAccessCourseItem";
import { CourseData } from "@/app/data/api/course_data";

interface RecentAccessedCourseProps {
  courses: Course[];
}

export default function RecentAccessedCourse({
  courses,
}: RecentAccessedCourseProps) {
  // Get first 5 courses from the passed real data as recent accessed courses
  const recentCourses = courses.slice(0, 5);

  return (
    <div className='p-6 w-full max-w-4xl'>
      <div className='mb-6'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Clock className='h-5 w-5 text-primary' />
          </div>
          <h2 className='text-2xl font-bold text-neutral-900 dark:text-white'>
            Recently Accessed Courses
          </h2>
        </div>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Your most recently viewed courses
        </p>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-1 gap-4'>
        {recentCourses.map((course) => (
          <RecentAccessCourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
