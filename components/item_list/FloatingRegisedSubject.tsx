"use client";
import React, { useState } from "react";
import { AvailableCourse } from "@/app/data/model/availableCourse";

export default function FloatingRegisedSubject({
  registeredSubjects,
  onClear,
  onConfirm,
}: {
  registeredSubjects: AvailableCourse[];
  onClear?: () => void;
  onConfirm?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalSubjects = registeredSubjects.length;
  const totalCredits = registeredSubjects.reduce(
    (sum, subj) => sum + (subj.subject?.credits || 0),
    0
  );

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-full transition-all duration-300 ease-in-out
      backdrop-blur-lg bg-white/20 dark:bg-black/20 
      border border-white/30 dark:border-white/20 
      rounded-2xl shadow-xl 
      p-4 flex flex-col gap-3
      sm:bottom-6 sm:right-6
      md:bottom-8 md:right-8
      
      // Responsive sizing based on mode
      ${
        isExpanded
          ? "max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md max-h-[60vh] overflow-y-auto"
          : "max-w-48 sm:max-w-52 max-h-20"
      }
      
      // Enhanced glassmorphism
      before:absolute before:inset-0 before:rounded-2xl 
      before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent
      before:pointer-events-none before:z-[-1]
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
      <div className='flex items-center gap-2 mb-2'>
        <span className='inline-block w-2 h-6 rounded bg-gradient-to-b from-blue-400 to-blue-600 shadow-sm' />
        <h3
          className={`font-bold text-blue-800 dark:text-blue-200 drop-shadow-sm transition-all duration-300 ${
            isExpanded ? "text-lg" : "text-sm truncate"
          }`}>
          {isExpanded ? "Registered Subjects" : "Registered"}
        </h3>
      </div>

      {isExpanded ? (
        <>
          <ul className='divide-y divide-white/20 dark:divide-white/10 mb-2'>
            {registeredSubjects.map((course) => (
              <li
                key={course.id}
                className='py-3 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg px-2 -mx-2 transition-all duration-200'>
                <div className='mb-2'>
                  <span className='font-medium text-gray-800 dark:text-gray-100 truncate drop-shadow-sm block'>
                    {course.subject?.name || "Unknown Course"}
                  </span>
                  <div className='flex items-center justify-end text-sm mt-1'>
                    <span className='text-blue-700 dark:text-blue-300 font-semibold drop-shadow-sm bg-blue-100/30 dark:bg-blue-900/30 px-2 py-1 rounded-full'>
                      {course.subject?.credits || 0} Credits
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex items-center justify-between mt-2 pt-2 border-t border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 rounded-lg p-2 -mx-2'>
            <span className='text-sm font-semibold text-gray-700 dark:text-gray-200 drop-shadow-sm'>
              Total: {totalSubjects} subject{totalSubjects !== 1 ? "s" : ""}
            </span>
            <span className='text-sm font-semibold text-blue-700 dark:text-blue-300 drop-shadow-sm'>
              {totalCredits} credits
            </span>
          </div>
          <div className='flex gap-2 mt-3'>
            <button
              onClick={onClear}
              className='flex-1 py-2 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200'
              type='button'>
              Clear Selection
            </button>
            <button
              onClick={onConfirm}
              className='flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-all duration-200'
              type='button'>
              Confirm Registration
            </button>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-700 dark:text-gray-200 font-medium drop-shadow-sm'>
            {totalSubjects} subjects
          </span>
          <span className='text-blue-700 dark:text-blue-300 font-semibold drop-shadow-sm'>
            {totalCredits} credits
          </span>
        </div>
      )}
    </div>
  );
}
