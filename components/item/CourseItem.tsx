"use client"; // <-- Make sure to declare this at top

import React from "react";
import { Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation"; // <-- Correct import for App Router

interface CourseSchedule {
  id: number;
  sections: number; // section index/number
  schedule: string; // day or time info
  created_at?: string;
  updated_at?: string;
}

interface CourseSubject {
  id: number;
  name: string;
  credits: number;
  description?: string;
}

interface Course {
  id: number;
  name: string; // e.g., HK1_2025_Introduction to Programming_N1
  description?: string;
  credits: number;
  location: string;
  enrolled?: number;
  is_active?: boolean;
  allow_grade_editing?: boolean;
  semester: string; // e.g., HK1 2025-2026
  type?: string;
  instructor: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
  subject: CourseSubject;
  schedules: CourseSchedule[];
  // Optional legacy fields to maintain compatibility
  code?: string;
}

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/${course.id}`);
  };

  const sectionNumbers =
    course.schedules?.map((s) => s.sections).filter((v) => v !== undefined) ||
    [];
  const sectionLabel =
    sectionNumbers.length > 0
      ? `Section${sectionNumbers.length > 1 ? "s" : ""} ${sectionNumbers.join(
          ", "
        )}`
      : undefined;
  const scheduleDays =
    course.schedules?.map((s) => s.schedule).filter(Boolean) || [];
  const scheduleLabel =
    scheduleDays.length > 0 ? scheduleDays.join(", ") : undefined;

  return (
    <div className='h-full'>
      <div
        onClick={handleClick}
        key={course.id}
        className='group bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col'>
        {/* Header */}
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              {course.type && (
                <span className='inline-flex items-center px-3 py-1 text-xs font-semibold bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 rounded-full border border-neutral-200 dark:border-neutral-600'>
                  {course.type}
                </span>
              )}
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
              {sectionLabel || "Section N/A"}
              {scheduleLabel ? ` - ${scheduleLabel}` : ""}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-neutral-500 flex-shrink-0' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
              {course.location}
            </span>
          </div>
        </div>

        <div className='mt-15'></div>
        {/* Actions */}
        <div
          onClick={handleClick}
          className='flex items-center justify-between mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700'>
          <button className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm'>
            <BookOpen className='h-4 w-4' />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
