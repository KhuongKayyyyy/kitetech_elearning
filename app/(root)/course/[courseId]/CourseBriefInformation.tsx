import {
  ArrowRight,
  BookOpen,
  RefreshCcw,
  Star,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import React from "react";

interface CourseBriefInformationProps {
  course: Course;
}

export default function CourseBriefInformation({
  course,
}: CourseBriefInformationProps) {
  return (
    <div className='p-4 sm:p-6'>
      {/* Course Header */}
      <div className='bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg p-4 sm:p-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Main Content */}
          <div className='flex-1 space-y-4'>
            {/* Course Title & Badge Row */}
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
              <div className='flex-1'>
                <div className='inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full mb-2'>
                  {course.type.toUpperCase()}
                </div>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight'>
                  {course.name}
                </h1>
                <div className='inline-flex items-center px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-lg mt-2'>
                  {course.code}
                </div>
              </div>

              {/* Course Icon */}
              <div className='flex justify-center sm:justify-end'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                  <BookOpen className='h-8 w-8 sm:h-10 sm:w-10 text-white' />
                </div>
              </div>
            </div>

            {/* Course Description */}
            <p className='text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-2'>
              {course.description}
            </p>

            {/* Course Stats Grid */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  <Users className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {19}
                  </p>
                  <p className='text-xs text-neutral-600 dark:text-neutral-400'>
                    Students
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                  <BookOpen className='h-4 w-4 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {course.credits}
                  </p>
                  <p className='text-xs text-neutral-600 dark:text-neutral-400'>
                    Credits
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <div className='p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
                  <Clock className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    Sec {course.section}
                  </p>
                  <p className='text-xs text-neutral-600 dark:text-neutral-400'>
                    Section
                  </p>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className='flex flex-wrap items-center gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-700'>
              <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='font-medium'>{course.instructor}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <Clock className='h-4 w-4' />
                <span>{course.schedule}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <MapPin className='h-4 w-4' />
                <span>{course.location}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span>{course.semester}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
