import React from "react";
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react";
import { FakeData } from "../../app/data/FakeData";
import ClassScheduleItem from "../item/ClassScheduleItem";
export default function TodayCalendar() {
  const timeSlots = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get courses and course schedule
  const courses = FakeData.getCourses();
  const courseSchedule = FakeData.getCourseSchedule();

  // Get today's date object (no time)
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const todaySchedule = courseSchedule.filter((schedule) => {
    const [day, month, year] = schedule.date.split("/").map(Number);
    const scheduleDate = new Date(year, month - 1, day); // month is 0-based
    scheduleDate.setHours(0, 0, 0, 0);
    return scheduleDate.getTime() === todayDate.getTime();
  });

  // Get full course details for today's schedule
  const todaysCourses = todaySchedule
    .map((schedule) => {
      const course = courses.find((c) => c.id === schedule.courseId);
      return course;
    })
    .filter(Boolean) as Course[];

  const getCoursesForTimeSlot = (timeSlot: string) => {
    // For demo purposes, we'll show courses in different time slots
    // You can modify this logic based on your actual scheduling needs
    const timeMapping: { [key: string]: Course[] } = {
      "Section 1": todaysCourses.slice(0, 1),
      "Section 2": todaysCourses.slice(1, 2),
      "Section 3": todaysCourses.slice(2, 3),
    };
    return timeMapping[timeSlot] || [];
  };

  return (
    <div className='p-6 w-full max-w-4xl'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Calendar className='h-5 w-5 text-primary' />
          </div>
          <h2 className='text-2xl font-bold text-neutral-900 dark:text-white'>
            Today's Schedule
          </h2>
        </div>
        <p className='text-neutral-600 dark:text-neutral-400 font-medium'>
          {today}
        </p>
      </div>

      <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden'>
        {timeSlots.map((time, index) => {
          const coursesInSlot = getCoursesForTimeSlot(time);
          return (
            <div
              key={index}
              className='group flex border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200'>
              <div className='w-40 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-750 border-r border-neutral-200 dark:border-neutral-700'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-neutral-500 dark:text-neutral-400' />
                  <span className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
                    {time}
                  </span>
                </div>
              </div>
              <div className='flex-1 p-4 bg-white dark:bg-neutral-800 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-750 transition-colors duration-200'>
                {coursesInSlot.length > 0 ? (
                  <div className='space-y-2'>
                    {coursesInSlot.map((course) => (
                      <ClassScheduleItem key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-neutral-500 dark:text-neutral-400 italic'>
                      No events scheduled
                    </span>
                    <div className='w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600 opacity-50'></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className='mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg'>
        <p className='text-sm text-primary/80 dark:text-primary/70 text-center'>
          {todaysCourses.length > 0
            ? `You have ${todaysCourses.length} class${
                todaysCourses.length > 1 ? "es" : ""
              } scheduled today. Stay focused! 📚`
            : "Your schedule is clear today. Perfect time to focus on your goals! 🎯"}
        </p>
      </div>
    </div>
  );
}
