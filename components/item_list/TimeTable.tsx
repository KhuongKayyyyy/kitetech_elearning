import React from "react";
import TimetableItem from "@/components/item/TimetableItem";

interface TimeTableProps {
  date?: Date;
}

export default function TimeTable({ date = new Date() }: TimeTableProps) {
  // Fake timetable data based on the provided course structure
  const courses = [
    {
      id: 1,
      name: "Introduction to Programming",
      description: "Fundamentals of programming using C language.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 2,
      schedule: "Wednesday",
      location: "C101",
      enrolled: 97,
      rating: 4.8,
      type: "elective",
      semester: "HK1 2025-2026",
    },
    {
      id: 2,
      name: "Data Structures and Algorithms",
      description: "Study of data organization and algorithm design.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 4,
      section: 4,
      schedule: "Saturday",
      location: "B202",
      enrolled: 167,
      rating: 3.6,
      type: "required",
      semester: "HK1 2025-2026",
    },
    {
      id: 3,
      name: "Database Systems",
      description: "Relational databases, SQL, and normalization.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 3,
      schedule: "Wednesday",
      location: "A201",
      enrolled: 237,
      rating: 4,
      type: "main",
      semester: "HK1 2025-2026",
    },
    {
      id: 4,
      name: "Operating Systems",
      description: "Principles of OS, processes, and memory management.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 1,
      schedule: "Saturday",
      location: "C101",
      enrolled: 56,
      rating: 4.4,
      type: "elective",
      semester: "HK1 2025-2026",
    },
    {
      id: 5,
      name: "Computer Networks",
      description: "Networking models, TCP/IP, routing and switching.",
      instructor: "Mrs Trần Thị Ngọc",
      credits: 3,
      section: 5,
      schedule: "Wednesday",
      location: "B202",
      enrolled: 126,
      rating: 4.8,
      type: "required",
      semester: "HK1 2025-2026",
    },
  ];

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

  // Create schedule data mapping based on course data
  const scheduleData = {
    "Wednesday-1": {
      className: courses[2].name,
      courseCode: courses[2].id.toString(),
      room: courses[2].location,
      period: "1-2",
      week: "1-16",
      group: courses[2].section.toString(),
      instructor: courses[2].instructor,
      credits: courses[2].credits,
    },
    "Wednesday-2": {
      className: courses[0].name,
      courseCode: courses[0].id.toString(),
      room: courses[0].location,
      period: "3-4",
      week: "1-16",
      group: courses[0].section.toString(),
      instructor: courses[0].instructor,
      credits: courses[0].credits,
    },
    "Wednesday-5": {
      className: courses[4].name,
      courseCode: courses[4].id.toString(),
      room: courses[4].location,
      period: "5-6",
      week: "1-16",
      group: courses[4].section.toString(),
      instructor: courses[4].instructor,
      credits: courses[4].credits,
    },
    "Saturday-1": {
      className: courses[3].name,
      courseCode: courses[3].id.toString(),
      room: courses[3].location,
      period: "5-6",
      week: "1-14",
      group: courses[3].section.toString(),
      instructor: courses[3].instructor,
      credits: courses[3].credits,
    },
    "Saturday-4": {
      className: courses[1].name,
      courseCode: courses[1].id.toString(),
      room: courses[1].location,
      period: "7-8",
      week: "1-15",
      group: courses[1].section.toString(),
      instructor: courses[1].instructor,
      credits: courses[1].credits,
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
                  const scheduleKey = `${day}-${sectionIndex + 1}`;
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
