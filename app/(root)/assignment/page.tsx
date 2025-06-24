"use client";
import ClassAssignmentItem from "@/components/item/ClassAssignmentItem";
import React, { useState } from "react";

// Dummy class list for dropdown, with "All Class" option
const classOptions = [
  { id: 0, name: "All Class" },
  { id: 1, name: "Math 101" },
  { id: 2, name: "Physics 201" },
  { id: 3, name: "History 301" },
];

export default function Page() {
  // Segmentation state
  const [activeTab, setActiveTab] = useState<"assigned" | "missing" | "done">(
    "assigned"
  );
  // State for selected class, default to "All Class"
  const [selectedClassId, setSelectedClassId] = useState<number>(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case "assigned":
        return (
          <div className='w-full flex-1 p-6'>
            <div className='space-y-6'>
              {/* Placeholder content for assigned assignments */}
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),_inset_0_-2px_8px_rgba(0,0,0,0.1),_0_8px_32px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),_inset_0_-2px_8px_rgba(0,0,0,0.3),_0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-2xl bg-white/40 dark:bg-gray-800/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center text-lg backdrop-blur-sm'>
                    📋
                  </div>
                  <p className='font-semibold text-blue-800 dark:text-blue-300 drop-shadow-sm'>
                    No assigned assignments
                  </p>
                </div>
              </div>
              <ClassAssignmentItem
                title='Assignment 1'
                dueDate='2023-01-01'
                status='assigned'
              />
            </div>
          </div>
        );
      case "missing":
        return (
          <div className='w-full flex-1 p-6'>
            <div className='space-y-6'>
              {/* Placeholder content for missing assignments */}
              <div className='bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),_inset_0_-2px_8px_rgba(0,0,0,0.1),_0_8px_32px_rgba(239,68,68,0.1)] dark:shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),_inset_0_-2px_8px_rgba(0,0,0,0.3),_0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-2xl bg-white/40 dark:bg-gray-800/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center text-lg backdrop-blur-sm'>
                    ⚠️
                  </div>
                  <p className='font-semibold text-red-800 dark:text-red-300 drop-shadow-sm'>
                    No missing assignments
                  </p>
                </div>
              </div>
              <ClassAssignmentItem
                title='Assignment 1'
                dueDate='2023-01-01'
                status='missing'
              />
            </div>
          </div>
        );
      case "done":
        return (
          <div className='w-full flex-1 p-6'>
            <div className='space-y-6'>
              {/* Placeholder content for completed assignments */}
              <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),_inset_0_-2px_8px_rgba(0,0,0,0.1),_0_8px_32px_rgba(34,197,94,0.1)] dark:shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),_inset_0_-2px_8px_rgba(0,0,0,0.3),_0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-2xl bg-white/40 dark:bg-gray-800/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center text-lg backdrop-blur-sm'>
                    ✅
                  </div>
                  <p className='font-semibold text-green-800 dark:text-green-300 drop-shadow-sm'>
                    No completed assignments
                  </p>
                </div>
              </div>
              <ClassAssignmentItem
                title='Assignment 1'
                dueDate='2023-01-01'
                status='done'
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 p-8 pb-6 gap-6'>
          <div className='relative'>
            <h1 className='text-3xl font-bold text-gray-800 dark:text-white drop-shadow-lg'>
              Assignments
            </h1>
            <div className='absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-lg'></div>
          </div>
          <div className='flex items-center gap-3'>
            <label
              htmlFor='class-select'
              className='text-sm font-semibold text-gray-700 dark:text-gray-300 drop-shadow-sm'>
              Class:
            </label>
            <div className='relative'>
              <select
                id='class-select'
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(Number(e.target.value))}
                className='px-4 py-3 pr-10 border-0 rounded-2xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.1),_0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),_0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md focus:outline-none focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),_0_0_0_3px_rgba(59,130,246,0.3)] transition-all duration-200 cursor-pointer hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.08),_0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.4),_0_6px_20px_rgba(0,0,0,0.4)]'>
                {classOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='w-full mb-8 px-8'>
          <div className='bg-white/60 dark:bg-gray-800/60 rounded-3xl p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1),_0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),_0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/30 dark:border-gray-700/30'>
            <nav className='flex space-x-2'>
              <button
                onClick={() => setActiveTab("assigned")}
                className={`flex-1 py-3 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "assigned"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)] transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-700/40 hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),_0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.1),_0_2px_8px_rgba(0,0,0,0.2)]"
                }`}>
                Assigned
              </button>
              <button
                onClick={() => setActiveTab("missing")}
                className={`flex-1 py-3 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "missing"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_4px_16px_rgba(239,68,68,0.4)] transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-700/40 hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),_0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.1),_0_2px_8px_rgba(0,0,0,0.2)]"
                }`}>
                Missing
              </button>
              <button
                onClick={() => setActiveTab("done")}
                className={`flex-1 py-3 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "done"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-[0_4px_16px_rgba(34,197,94,0.4)] transform scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-700/40 hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),_0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.1),_0_2px_8px_rgba(0,0,0,0.2)]"
                }`}>
                Done
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className='bg-white/40 dark:bg-gray-800/40 rounded-3xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),_inset_0_-2px_8px_rgba(0,0,0,0.1),_0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),_inset_0_-2px_8px_rgba(0,0,0,0.3),_0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/30 dark:border-gray-700/30 mx-8 mb-8 overflow-hidden'>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
