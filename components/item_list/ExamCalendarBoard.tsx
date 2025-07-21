"use client";
import React from "react";
import { ExaminationModel } from "@/app/data/model/ExaminationModel";
import ExamCalendarItem from "../item/ExamCalendarItem";
import { Calendar, Clock } from "lucide-react";

interface ExamCalendarBoardProps {
  examinations: ExaminationModel[];
}

export default function ExamCalendarBoard({
  examinations,
}: ExamCalendarBoardProps) {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayAbbreviations = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get day of week from date string (0 = Sunday, 1 = Monday, etc.)
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDay();
  };

  // Convert Sunday-based index to Monday-based index for our array
  const convertToMondayBasedIndex = (dayIndex: number) => {
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  // Group examinations by day of week
  const getExamsForDay = (dayIndex: number) => {
    return examinations.filter((exam) => {
      const examDayIndex = getDayOfWeek(exam.date);
      const mondayBasedIndex = convertToMondayBasedIndex(examDayIndex);
      return mondayBasedIndex === dayIndex;
    });
  };

  const totalExams = examinations.length;

  return (
    <div className='w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen p-6'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-blue-600 rounded-lg'>
            <Calendar className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Exam Calendar</h1>
            <p className='text-gray-600'>
              Weekly overview of your examinations
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium text-gray-700'>
                  {totalExams} exams scheduled
                </span>
              </div>
              <div className='text-sm text-gray-500'>
                This week's examination schedule
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl'>
        <div className='grid grid-cols-1 lg:grid-cols-7 gap-4'>
          {dayNames.map((dayName, index) => {
            const dayExams = getExamsForDay(index);
            const isToday =
              new Date().getDay() === (index === 6 ? 0 : index + 1);

            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-xl p-4 min-h-[600px] transition-all duration-300
                  ${
                    isToday
                      ? "bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-lg"
                      : "bg-white/80 border border-gray-200/50 hover:shadow-md hover:bg-white/90"
                  }
                `}>
                {/* Day Header */}
                <div className='mb-4 pb-3 border-b border-gray-200/50'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3
                        className={`font-semibold text-lg ${
                          isToday ? "text-blue-700" : "text-gray-800"
                        }`}>
                        <span className='hidden md:block'>{dayName}</span>
                        <span className='md:hidden'>
                          {dayAbbreviations[index]}
                        </span>
                      </h3>
                      {isToday && (
                        <span className='text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full'>
                          Today
                        </span>
                      )}
                    </div>
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${
                        dayExams.length > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-400"
                      }
                    `}>
                      {dayExams.length}
                    </div>
                  </div>
                </div>

                {/* Exams List */}
                <div className='space-y-3 max-h-96 overflow-y-auto custom-scrollbar'>
                  {dayExams.length > 0 ? (
                    dayExams.map((exam, examIndex) => (
                      <div key={examIndex}>
                        <ExamCalendarItem examination={exam} />
                      </div>
                    ))
                  ) : (
                    <div className='flex flex-col items-center justify-center h-32 text-center'>
                      <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2'>
                        <Calendar className='w-6 h-6 text-gray-400' />
                      </div>
                      <p className='text-gray-400 text-sm font-medium'>
                        No exams scheduled
                      </p>
                      <p className='text-gray-300 text-xs'>
                        Enjoy your free day!
                      </p>
                    </div>
                  )}
                </div>

                {/* Today Indicator */}
                {isToday && (
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500'></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
