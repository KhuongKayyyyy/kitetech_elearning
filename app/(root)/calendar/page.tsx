"use client";
import React, { useState } from "react";
import TimeTable from "@/components/item_list/TimeTable";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();

  // Get week start (Monday) for the selected date
  const getWeekStart = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  // Get current week start and end
  const currentWeekStart = getWeekStart(new Date(selectedDate));
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  // Format week range display
  const formatWeekRange = () => {
    const start = format(currentWeekStart, "dd/MM/yyyy");
    const end = format(currentWeekEnd, "dd/MM/yyyy");
    return `${start} - ${end}`;
  };

  // Navigate to exam calendar
  const goToExamCalendar = () => {
    router.push("/calendar/exam-calendar");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto p-6 max-w-7xl'>
        {/* Header Section */}
        <div className='mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
              Academic Calendar
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Manage your schedule and view upcoming classes
            </p>
          </div>
          <Button
            onClick={goToExamCalendar}
            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl'>
            <BookOpen className='h-4 w-4 mr-2' />
            Exam Calendar
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className='mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
            {/* Date Picker Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                Select Date:
              </label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      "w-[280px] justify-start text-left font-normal h-11 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors",
                      !selectedDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className='mr-3 h-4 w-4 text-blue-600 dark:text-blue-400' />
                    {selectedDate
                      ? format(selectedDate, "EEEE, MMMM do, yyyy")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setIsCalendarOpen(false);
                      }
                    }}
                    initialFocus
                    className='rounded-lg shadow-lg'
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Week Navigation Section */}
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                Week Navigation:
              </label>
              <div className='flex items-center gap-3'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToPreviousWeek}
                  className='h-10 px-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all duration-200'>
                  <ChevronLeft className='h-4 w-4 mr-1' />
                  <span className='hidden sm:inline'>Previous</span>
                  <span className='sm:hidden'>Prev</span>
                </Button>

                <div className='px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm min-w-[220px] text-center shadow-md'>
                  {formatWeekRange()}
                </div>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToNextWeek}
                  className='h-10 px-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all duration-200'>
                  <span className='hidden sm:inline'>Next</span>
                  <span className='sm:hidden'>Next</span>
                  <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Section */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <TimeTable date={selectedDate} />
        </div>
      </div>
    </div>
  );
}
