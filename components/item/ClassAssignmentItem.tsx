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
    "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-[inset_0_2px_4px_rgba(59,130,246,0.1),_0_4px_8px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_2px_4px_rgba(59,130,246,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_2px_rgba(59,130,246,0.15),_0_6px_12px_rgba(59,130,246,0.15)] dark:hover:shadow-[inset_0_1px_2px_rgba(59,130,246,0.25),_0_6px_12px_rgba(0,0,0,0.4)]",
  missing:
    "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 shadow-[inset_0_2px_4px_rgba(239,68,68,0.1),_0_4px_8px_rgba(239,68,68,0.1)] dark:shadow-[inset_0_2px_4px_rgba(239,68,68,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_2px_rgba(239,68,68,0.15),_0_6px_12px_rgba(239,68,68,0.15)] dark:hover:shadow-[inset_0_1px_2px_rgba(239,68,68,0.25),_0_6px_12px_rgba(0,0,0,0.4)]",
  done: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 shadow-[inset_0_2px_4px_rgba(34,197,94,0.1),_0_4px_8px_rgba(34,197,94,0.1)] dark:shadow-[inset_0_2px_4px_rgba(34,197,94,0.2),_0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_2px_rgba(34,197,94,0.15),_0_6px_12px_rgba(34,197,94,0.15)] dark:hover:shadow-[inset_0_1px_2px_rgba(34,197,94,0.25),_0_6px_12px_rgba(0,0,0,0.4)]",
};

const statusLabelTailwind: Record<AssignmentStatus, string> = {
  assigned:
    "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 dark:from-blue-800/40 dark:to-blue-700/40 dark:text-blue-300 shadow-[inset_0_1px_2px_rgba(59,130,246,0.2),_0_2px_4px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_1px_2px_rgba(59,130,246,0.3),_0_2px_4px_rgba(0,0,0,0.2)]",
  missing:
    "bg-gradient-to-br from-red-100 to-red-200 text-red-800 dark:from-red-800/40 dark:to-red-700/40 dark:text-red-300 shadow-[inset_0_1px_2px_rgba(239,68,68,0.2),_0_2px_4px_rgba(239,68,68,0.1)] dark:shadow-[inset_0_1px_2px_rgba(239,68,68,0.3),_0_2px_4px_rgba(0,0,0,0.2)]",
  done: "bg-gradient-to-br from-green-100 to-green-200 text-green-800 dark:from-green-800/40 dark:to-green-700/40 dark:text-green-300 shadow-[inset_0_1px_2px_rgba(34,197,94,0.2),_0_2px_4px_rgba(34,197,94,0.1)] dark:shadow-[inset_0_1px_2px_rgba(34,197,94,0.3),_0_2px_4px_rgba(0,0,0,0.2)]",
};

const statusIcons: Record<AssignmentStatus, string> = {
  assigned: "📋",
  missing: "⚠️",
  done: "✅",
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
    const dueDateTime = new Date(date);
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
      className={`group relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer ${statusTailwind[status]} border border-white/20 dark:border-gray-700/30 backdrop-blur-sm transform hover:-translate-y-1 hover:scale-[1.02]`}
      tabIndex={0}
      role='button'>
      {/* Soft inner glow */}
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none' />

      {/* Status indicator with soft shadow */}
      <div className='absolute top-4 left-4'>
        <div
          className={`w-3 h-3 rounded-full shadow-lg ${
            status === "assigned"
              ? "bg-gradient-to-r from-blue-400 to-blue-600 shadow-blue-400/50"
              : status === "missing"
              ? "bg-gradient-to-r from-red-400 to-red-600 shadow-red-400/50"
              : "bg-gradient-to-r from-green-400 to-green-600 shadow-green-400/50"
          }`}
        />
      </div>

      <div className='p-8 pt-12'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-4 mb-3'>
              <div className='w-12 h-12 rounded-2xl bg-white/20 dark:bg-gray-800/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_0_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center text-xl backdrop-blur-sm'>
                {statusIcons[status]}
              </div>
              <h3 className='font-bold text-xl text-neutral-900 dark:text-white truncate group-hover:text-primary transition-colors drop-shadow-sm'>
                {title}
              </h3>
            </div>

            {course && (
              <div className='text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 px-3 py-1 rounded-xl bg-white/30 dark:bg-gray-800/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm inline-block'>
                {course}
              </div>
            )}

            {description && (
              <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed'>
                {description}
              </p>
            )}

            {dueDate && (
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-8 h-8 rounded-xl bg-white/20 dark:bg-gray-800/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center backdrop-blur-sm'>
                  📅
                </div>
                <span
                  className={`font-semibold px-3 py-1.5 rounded-xl backdrop-blur-sm ${
                    status === "missing"
                      ? "text-red-700 dark:text-red-300 bg-red-100/50 dark:bg-red-900/30 shadow-[inset_0_1px_2px_rgba(239,68,68,0.2),_0_2px_4px_rgba(239,68,68,0.1)] dark:shadow-[inset_0_1px_2px_rgba(239,68,68,0.3),_0_2px_4px_rgba(0,0,0,0.2)]"
                      : "text-neutral-700 dark:text-neutral-300 bg-white/30 dark:bg-gray-800/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.2)]"
                  }`}>
                  {formatDueDate(dueDate)}
                </span>
              </div>
            )}
          </div>

          <div className='flex flex-col items-end gap-3'>
            <span
              className={`px-4 py-2 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all duration-300 ${statusLabelTailwind[status]} backdrop-blur-sm group-hover:scale-105`}>
              {statusLabels[status]}
            </span>

            {/* Neumorphic action button */}
            <button className='opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 rounded-2xl bg-white/20 dark:bg-gray-800/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_6px_12px_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_6px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm transform hover:scale-110 active:scale-95'>
              <svg
                className='w-5 h-5 text-neutral-600 dark:text-neutral-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle highlight on hover */}
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
    </div>
  );
}
