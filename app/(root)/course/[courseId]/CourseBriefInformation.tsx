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
    <div className='flex flex-col gap-4 sm:gap-6 p-4 sm:p-6'>
      {/* Course Header */}
      <div className='bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
          <div className='flex-1'>
            {/* Level Badge */}
            <div className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 shadow-md'>
              {course.type.toUpperCase()}
            </div>

            {/* Course Title */}
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3 leading-tight'>
              {course.name}
            </h1>

            {/* Course Code */}
            <div className='inline-flex items-center px-2 sm:px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium rounded-lg mb-3 sm:mb-4'>
              {course.code}
            </div>

            {/* Course Description */}
            <p className='text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed'>
              {course.description}
            </p>

            {/* Course Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6'>
              <div className='flex items-center gap-2 text-xs sm:text-sm'>
                <div className='p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg'>
                  <Star className='h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {course.rating}
                  </p>
                  <p className='text-neutral-600 dark:text-neutral-400'>
                    Rating
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2 text-xs sm:text-sm'>
                <div className='p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  <Users className='h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {course.enrolled}
                  </p>
                  <p className='text-neutral-600 dark:text-neutral-400'>
                    Students
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2 text-xs sm:text-sm'>
                <div className='p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                  <BookOpen className='h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {course.credits}
                  </p>
                  <p className='text-neutral-600 dark:text-neutral-400'>
                    Credits
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2 text-xs sm:text-sm'>
                <div className='p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
                  <Clock className='h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    Sec {course.section}
                  </p>
                  <p className='text-neutral-600 dark:text-neutral-400'>
                    Section
                  </p>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className='flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='font-medium'>{course.instructor}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-3 w-3 sm:h-4 sm:w-4' />
                <span>{course.schedule}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='h-3 w-3 sm:h-4 sm:w-4' />
                <span>{course.location}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span>{course.semester}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Illustration */}
          <div className='flex justify-center lg:justify-end lg:ml-8'>
            <div className='relative'>
              <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300'>
                <div className='w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-lg lg:rounded-xl flex items-center justify-center'>
                  <BookOpen className='h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white' />
                </div>
              </div>
              <div className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center'>
                <Star className='h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-800' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
