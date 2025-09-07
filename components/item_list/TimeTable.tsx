import React, { useState, useEffect } from "react";
import TimetableItem from "@/components/item/TimetableItem";
import { classService } from "@/app/data/services/classService";
import { FakeData } from "@/app/data/FakeData";
import { UserRole } from "@/app/data/enum/UserRole";

interface TimeTableProps {
  date?: Date;
}

interface Schedule {
  id: number;
  sections: number;
  schedule: string;
  created_at: string;
  updated_at: string;
}

interface Subject {
  id: number;
  name: string;
  credits: number;
  description: string;
  gradingFormulaId: number;
  faculty_id: number;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  location: string;
  enrolled: number;
  is_active: boolean;
  allow_grade_editing: boolean;
  semester: string;
  type: string;
  instructor: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  subject: Subject;
  schedules: Schedule[];
}

export default function TimeTable({ date = new Date() }: TimeTableProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await classService.getClasses();

        // Ensure we have an array and filter out any duplicates
        const uniqueCourses =
          data?.filter(
            (course: Course, index: number, self: Course[]) =>
              index === self.findIndex((c: Course) => c.id === course.id)
          ) || [];

        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  // Generate unique colors for each course
  const generateCourseColor = (courseId: number): string => {
    const colors = [
      "#8B966D", // Original olive
      "#4A90E2", // Blue
      "#F5A623", // Orange
      "#7ED321", // Green
      "#BD10E0", // Purple
      "#50E3C2", // Teal
      "#B8E986", // Light green
      "#F8E71C", // Yellow
      "#D0021B", // Red
      "#9013FE", // Dark purple
      "#417505", // Dark green
      "#FF6900", // Bright orange
    ];
    return colors[courseId % colors.length];
  };

  // Filter courses that are active during the selected week
  const isCourseActiveInWeek = (
    course: Course,
    selectedDate: Date
  ): boolean => {
    if (!course.start_date || !course.end_date) {
      return true; // Show courses without date restrictions
    }

    const courseStartDate = new Date(course.start_date);
    const courseEndDate = new Date(course.end_date);

    // Get the start and end of the selected week
    const weekStart = getWeekStart(new Date(selectedDate));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Course is active if it overlaps with the selected week
    return courseStartDate <= weekEnd && courseEndDate >= weekStart;
  };

  // Filter courses based on the selected date
  const activeCourses = courses.filter((course) => {
    const isActive = isCourseActiveInWeek(course, date);
    console.log(
      `Course ${course.id} (${course.name}): ${course.start_date} to ${course.end_date} - Active: ${isActive}`
    );
    return isActive;
  });

  const userRole = FakeData.getCurrentUserRole();

  // Create schedule data mapping based on filtered courses
  const scheduleData: { [key: string]: any } = {};

  activeCourses.forEach((course) => {
    course.schedules.forEach((schedule) => {
      const key = `${schedule.schedule}-${schedule.sections}`;
      scheduleData[key] = {
        className:
          userRole === UserRole.STUDENT ? course.subject.name : course.name, // Use course name instead of subject name
        courseCode: course.id.toString(),
        room: course.location,
        period: getPeriodForSection(schedule.sections),
        week: getWeekRange(course.start_date, course.end_date),
        group: course.name.split("_").pop() || course.id.toString(), // Extract section from name like "N1", "N2"
        instructor: course.instructor,
        credits: course.credits,
        courseId: course.id,
        color: generateCourseColor(course.id), // Add unique color for each course
      };
    });
  });

  // Helper function to get period based on section number
  function getPeriodForSection(section: number): string {
    switch (section) {
      case 1:
        return "1-2";
      case 2:
        return "3-4";
      case 3:
        return "5-6";
      case 4:
        return "7-8";
      default:
        return `${section}-${section + 1}`;
    }
  }

  // Helper function to get week range
  function getWeekRange(
    startDate: string | null,
    endDate: string | null
  ): string {
    if (!startDate || !endDate) return "1-16";

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate the number of weeks between start and end dates
      const timeDiff = end.getTime() - start.getTime();
      const weeksDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));

      // For simplicity, return the calculated weeks or default to 1-16
      return weeksDiff > 0 ? `1-${weeksDiff}` : "1-16";
    } catch (error) {
      console.error("Error calculating week range:", error);
      return "1-16";
    }
  }

  if (isLoading) {
    return (
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Weekly Timetable
        </h2>
        <div className='flex items-center justify-center h-64'>
          <div className='text-gray-500'>Loading timetable...</div>
        </div>
      </div>
    );
  }

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
                          color={courseData.color}
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
