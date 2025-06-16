import React from "react";
import TodayCalendar from "../item_list/TodayCalendar";
import RecentAccessedCourse from "../item_list/RecentAccessedCourse";
export default function CourseSidebar() {
  return (
    <div className='w-full lg:max-w-2xl'>
      <div className='p-4 sm:p-6'>
        <TodayCalendar />
        <RecentAccessedCourse />
      </div>
    </div>
  );
}
