import React from "react";
import { Calendar, Clock, MapPin, Users, Star, BookOpen } from "lucide-react";
interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <div className='h-full'>
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
              <div className='flex items-center gap-1'>
                <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
                  {course.rating}
                </span>
              </div>
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
        <div className='grid grid-cols-1 gap-2 mb-4'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-neutral-500 flex-shrink-0' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
              {course.schedule}
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
              {course.enrolled} enrolled
            </span>
          </div>
        </div>

        {/* Description */}
        <div className='flex-1 mb-4'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3'>
            {course.description}
          </p>
        </div>

        {/* Study Progress Bar */}
        <div className='mb-4'>
          <div className='flex items-center justify-between text-xs text-neutral-500 mb-1'>
            <span>Study Progress</span>
            <span>{Math.round((course.enrolled / 280) * 100)}% complete</span>
          </div>
          <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-500'
              style={{
                width: `${(course.enrolled / 280) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-between mt-auto'>
          <div className='flex gap-2'>
            <button className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20'>
              <BookOpen className='h-4 w-4' />
              Enroll
            </button>
            <button className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500/20'>
              View Details
            </button>
          </div>
          <div className='flex items-center gap-1 text-xs text-neutral-500'>
            <Calendar className='h-3 w-3' />
            <span>{course.semester}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
