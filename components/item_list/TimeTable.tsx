import React from "react";
import TimetableItem from "@/components/item/TimetableItem";

interface TimeTableProps {
  date?: Date;
}

export default function TimeTable({ date = new Date() }: TimeTableProps) {
  // Fake timetable data
  const sections = [
    "Section 1",
    "Section 2",
    "Section 3", // Break time
    "Section 4",
    "Section 5",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Function to get the start of the week (Monday) for a given date
  const getWeekStart = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
  };

  // Get the dates for the week
  const weekStart = getWeekStart(new Date(date));
  const weekDates = weekDays.map((_, index) => {
    const weekDate = new Date(weekStart);
    weekDate.setDate(weekStart.getDate() + index);
    return weekDate;
  });

  // Fake schedule data - mapping day and section to course info
  const scheduleData = {
    "Monday-1": {
      className: "Nhập môn xử lý ngôn ngữ tự nhiên",
      courseCode: "1",
      room: "D0201-A",
      period: "1-2",
      week: "1-16",
      group: "5",
    },
    "Tuesday-4": {
      className: "Web Development",
      courseCode: "2",
      room: "B102",
      period: "3-4",
      week: "1-15",
      group: "3",
    },
    "Wednesday-0": {
      className: "Database Systems",
      courseCode: "3",
      room: "A301",
      period: "1-2",
      week: "2-16",
      group: "2",
    },
    "Thursday-3": {
      className: "Software Engineering",
      courseCode: "4",
      room: "C201",
      period: "7-8",
      week: "1-14",
      group: "1",
    },
    "Friday-1": {
      className: "Machine Learning",
      courseCode: "5",
      room: "D301",
      period: "3-4",
      week: "3-16",
      group: "4",
    },
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Weekly Timetable</h2>

      <div className='overflow-x-auto'>
        <div className='min-w-[800px]'>
          {/* Header with days */}
          <div className='grid grid-cols-7 gap-2 mb-4'>
            <div className='p-3 text-center font-semibold bg-gray-100 dark:bg-gray-800 rounded-lg'>
              Time
            </div>
            {weekDays.map((day, index) => (
              <div
                key={day}
                className='p-3 text-center font-semibold bg-blue-100 dark:bg-blue-900 rounded-lg'>
                <div>{day}</div>
                <div className='text-xs text-gray-600 dark:text-gray-300 mt-1'>
                  {weekDates[index].toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Timetable grid */}
          {sections.map((section, sectionIndex) => {
            const isBreakTime = sectionIndex === 2; // Section 3 is break time

            if (isBreakTime) {
              // Special break time row - merged across all days
              return (
                <div key={sectionIndex} className='grid grid-cols-7 gap-2 mb-2'>
                  {/* Section column */}
                  <div className='p-3 text-center font-medium bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm'>
                    {section}
                  </div>
                  {/* Merged break time across all days */}
                  <div className='col-span-6'>
                    <TimetableItem isBreakTime={true} />
                  </div>
                </div>
              );
            }

            return (
              <div key={sectionIndex} className='grid grid-cols-7 gap-2 mb-2'>
                {/* Section column */}
                <div className='p-3 text-center font-medium bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm'>
                  {section}
                </div>

                {/* Course slots for each day */}
                {weekDays.map((day, dayIndex) => {
                  const scheduleKey = `${day}-${sectionIndex}`;
                  const courseData =
                    scheduleData[scheduleKey as keyof typeof scheduleData];

                  return (
                    <div
                      key={`${day}-${sectionIndex}`}
                      className='min-h-[8rem]'>
                      {courseData ? (
                        <TimetableItem
                          className={courseData.className}
                          courseCode={courseData.courseCode}
                          room={courseData.room}
                          period={courseData.period}
                          week={courseData.week}
                          group={courseData.group}
                        />
                      ) : (
                        <div className='bg-gray-50 dark:bg-gray-800 rounded-lg h-32 border-2 border-dashed border-gray-200 dark:border-gray-600 flex items-center justify-center'></div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
