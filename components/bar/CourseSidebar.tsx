import React from "react";
import TodayCalendar from "../item_list/TodayCalendar";
import RecentAccessedCourse from "../item_list/RecentAccessedCourse";
export default function CourseSidebar() {
  return (
    <div className='w-full max-w-2xl'>
      <div className='p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2'>
          Course Sidebar
        </h2>
        <TodayCalendar />
        <RecentAccessedCourse />
      </div>
    </div>
  );
}
