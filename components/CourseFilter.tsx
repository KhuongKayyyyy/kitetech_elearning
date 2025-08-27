"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Dumbbell,
  Brain,
  Globe,
} from "lucide-react";

const SEMESTERS = [
  "HK1 2023-2024",
  "HK2 2023-2024",
  "HK1 2024-2045",
  "HK2 2024-2045",
];

const COURSE_TYPES = [
  {
    id: "all",
    label: "All Subjects",
    icon: <BookOpen className='h-4 w-4' />,
    color: "text-neutral-600 dark:text-neutral-400",
    bgColor: "bg-neutral-100 dark:bg-neutral-700",
  },
  {
    id: "main",
    label: "Main",
    icon: <GraduationCap className='h-4 w-4' />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "elective",
    label: "Elective",
    icon: <Brain className='h-4 w-4' />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "required",
    label: "Required",
    icon: <Globe className='h-4 w-4' />,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
];

export default function CourseFilter({
  selectedSemester,
  setSelectedSemester,
  selectedType,
  setSelectedType,
}: {
  selectedSemester: string;
  setSelectedSemester: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center'>
      {/* Academic Period Section */}
      <div className='space-y-3'>
        <label className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
          Academic Period
        </label>
        <div className='relative'>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='w-full sm:w-64 h-12 flex items-center justify-between px-4 py-3 text-sm font-medium border-2 rounded-xl bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'>
            <span className='text-neutral-900 dark:text-neutral-100'>
              {selectedSemester}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className='absolute top-full left-0 w-full sm:w-64 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-20 overflow-hidden backdrop-blur-sm'>
              {SEMESTERS.map((semester, index) => (
                <button
                  key={semester}
                  onClick={() => {
                    setSelectedSemester(semester);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150 ${
                    selectedSemester === semester
                      ? "bg-primary/5 text-primary border-r-2 border-primary"
                      : "text-neutral-700 dark:text-neutral-300"
                  } ${index === 0 ? "rounded-t-xl" : ""} ${
                    index === SEMESTERS.length - 1 ? "rounded-b-xl" : ""
                  }`}>
                  {semester}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Separator Line - Only visible on large screens */}
      <div className='hidden lg:block h-8 border-l border-neutral-200 dark:border-neutral-700'></div>

      {/* Course Categories Section */}
      <div className='space-y-3 flex-1'>
        <label className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
          Course Categories
        </label>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3'>
          {COURSE_TYPES.map((type) => (
            <FilterSubjectButton
              key={type.id}
              label={type.label}
              icon={type.icon}
              color={type.color}
              bgColor={type.bgColor}
              isSelected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FilterSubjectButton({
  label,
  icon,
  color,
  bgColor,
  isSelected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 h-12 text-sm font-medium border rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 ${
        isSelected
          ? "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/25"
          : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300"
      }`}>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
          isSelected
            ? "bg-primary/20 text-primary"
            : `${bgColor} ${color} group-hover:scale-110`
        }`}>
        {icon}
      </div>
      <span className='font-medium truncate'>{label}</span>
    </button>
  );
}
