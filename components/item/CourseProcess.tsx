import React from "react";
import { FakeData } from "@/app/data/FakeData";

export default function CourseProcess() {
  // Get class sections from FakeData
  const classSections = FakeData.getClassSections();
  const totalSections = classSections.length;

  // For demo purposes, assume first 2 sections are completed
  // In a real app, this would come from user progress data
  const completedSections = 2;
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
          Course Progress
        </h3>
        <div className='flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-3'>
          <span>
            {completedSections} of {totalSections} sections completed
          </span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2'>
          <div
            className='bg-primary h-2 rounded-full transition-all duration-300'
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
}
