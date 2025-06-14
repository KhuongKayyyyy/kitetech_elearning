"use client"; // <-- Make sure to declare this at top

import React from "react";
import { Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation"; // <-- Correct import for App Router

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  const router = useRouter();

  return (
    <div className='h-full' onClick={() => router.push(`/course/${course.id}`)}>
      <div
        key={course.id}
        className='group bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col'>
        {/* Header */}
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='inline-flex items-center px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20'>
                {course.code}
              </span>
            </div>
            <h3 className='text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
              {course.name}
            </h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400 mt-1'>
              {course.instructor}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-lg font-bold text-primary'>
              {course.credits} {course.credits === 1 ? "credit" : "credits"}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className='grid grid-cols-1 gap-3 mb-4'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-neutral-500 flex-shrink-0' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
              Section {course.section} - {course.schedule}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-neutral-500 flex-shrink-0' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
              {course.location}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-neutral-500 flex-shrink-0' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300'>
              {course.enrolled} students enrolled
            </span>
          </div>
        </div>

        {/* Description */}
        <div className='flex-1 mb-6'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-4'>
            {course.description}
          </p>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-between mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700'>
          <button className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm'>
            <BookOpen className='h-4 w-4' />
            View Details
          </button>
          <div className='flex items-center gap-1 text-xs text-neutral-500'>
            <Calendar className='h-3 w-3' />
            <span>{course.semester}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
