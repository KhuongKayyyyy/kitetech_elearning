import { useRouter } from "next/navigation";
import React from "react";

type AssignmentStatus = "assigned" | "missing" | "done";

interface ClassAssignmentItemProps {
  title: string;
  dueDate?: string;
  status: AssignmentStatus;
  course?: string;
  description?: string;
}

const statusTailwind: Record<AssignmentStatus, string> = {
  assigned:
    "bg-white dark:bg-neutral-800 border-l-4 border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/10",
  missing:
    "bg-white dark:bg-neutral-800 border-l-4 border-red-500 hover:shadow-lg hover:shadow-red-500/10 hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/10",
  done: "bg-white dark:bg-neutral-800 border-l-4 border-green-500 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 hover:bg-green-50 dark:hover:bg-green-900/10",
};

const statusDotColors: Record<AssignmentStatus, string> = {
  assigned: "bg-blue-500 group-hover:animate-pulse",
  missing: "bg-red-500 group-hover:animate-pulse",
  done: "bg-green-500 group-hover:animate-pulse",
};

const statusLabels: Record<AssignmentStatus, string> = {
  assigned: "Assigned",
  missing: "Missing",
  done: "Completed",
};

export default function ClassAssignmentItem({
  title,
  dueDate,
  status,
  course,
  description,
}: ClassAssignmentItemProps) {
  const formatDueDate = (date: string) => {
    // date may be DD/MM/YYYY
    let dueDateTime = new Date(date);
    const ddmmyyyy = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (ddmmyyyy) {
      const [, dd, mm, yyyy] = ddmmyyyy;
      dueDateTime = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
    const now = new Date();
    const diffTime = dueDateTime.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${
        Math.abs(diffDays) !== 1 ? "s" : ""
      }`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/course/${1}/lesson/${1}/content/${3}`);
      }}
      className={`group relative w-full max-w-sm sm:max-w-64 md:max-w-72 lg:max-w-80 ${statusTailwind[status]} rounded-2xl shadow-sm transition-all duration-300 cursor-pointer p-3 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 active:scale-95`}
      tabIndex={0}
      role='button'>
      {/* Subtle gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none' />

      {/* Header with title and status dot */}
      <div className='mb-1 relative z-10'>
        <div className='flex items-center gap-2 mb-1'>
          <div
            className={`w-2 h-2 rounded-full ${statusDotColors[status]} transition-all duration-300 group-hover:w-3 group-hover:h-3`}
          />
          <span className='font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 truncate group-hover:text-neutral-700 dark:group-hover:text-neutral-50 transition-colors duration-300'>
            {title}
          </span>
        </div>
        {course && (
          <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300'>
            <span className='font-medium'>{course}</span>
          </div>
        )}
      </div>

      {/* Status label */}
      <div className='flex flex-col items-start relative z-10'>
        <span className='text-neutral-400 dark:text-neutral-500 text-xs group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-300'>
          Status:
        </span>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-100 transition-colors duration-300'>
          {statusLabels[status]}
        </span>
      </div>

      {/* Description */}
      {description && (
        <div className='flex flex-col items-start relative z-10'>
          <span className='text-neutral-400 dark:text-neutral-500 text-xs group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-300'>
            Description:
          </span>
          <span className='font-semibold text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm line-clamp-2 group-hover:text-neutral-800 dark:group-hover:text-neutral-100 transition-colors duration-300'>
            {description}
          </span>
        </div>
      )}

      {/* Due date */}
      {dueDate && (
        <div className='space-y-1 sm:space-y-2 relative z-10'>
          <div className='flex items-center gap-2 text-xs sm:text-sm'>
            <span className='text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300'>
              Due Date:
            </span>
            <span className='font-medium text-neutral-900 dark:text-neutral-100 ml-auto group-hover:text-neutral-800 dark:group-hover:text-neutral-50 transition-colors duration-300'>
              {dueDate}
            </span>
          </div>
          <div className='flex items-center gap-2 text-xs sm:text-sm'>
            <span className='text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300'>
              Status:
            </span>
            <span
              className={`font-medium ml-auto transition-colors duration-300 ${
                status === "missing"
                  ? "text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300"
                  : "text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-800 dark:group-hover:text-neutral-50"
              }`}>
              {formatDueDate(dueDate)}
            </span>
          </div>
        </div>
      )}

      {/* Animated border effect */}
      <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
            status === "assigned"
              ? "from-blue-500/20 via-transparent to-blue-500/20"
              : status === "missing"
              ? "from-red-500/20 via-transparent to-red-500/20"
              : "from-green-500/20 via-transparent to-green-500/20"
          } animate-pulse`}
        />
      </div>
    </div>
  );
}
