import React from "react";
import TodayCalendar from "../item_list/TodayCalendar";
import RecentAccessedCourse from "../item_list/RecentAccessedCourse";

interface CourseSidebarProps {
  courses: Course[];
}

export default function CourseSidebar({ courses }: CourseSidebarProps) {
  return (
    <div className='w-full lg:max-w-2xl'>
      <div className='p-4 sm:p-6'>
        <TodayCalendar />
        <RecentAccessedCourse courses={courses} />
      </div>
    </div>
  );
}
