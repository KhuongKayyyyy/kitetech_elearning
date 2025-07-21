"use client";
import ClassAssignmentItem from "@/components/item/ClassAssignmentItem";
import React, { useState } from "react";
import { BookOpen, Calendar, Clock, Filter } from "lucide-react";

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
            <div className='space-y-4'>
              {/* Empty state */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 text-center'>
                <div className='w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <BookOpen className='w-6 h-6 text-blue-500' />
                </div>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  No assigned assignments
                </p>
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
            <div className='space-y-4'>
              {/* Empty state */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 text-center'>
                <div className='w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <Clock className='w-6 h-6 text-red-500' />
                </div>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  No missing assignments
                </p>
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
            <div className='space-y-4'>
              {/* Empty state */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 text-center'>
                <div className='w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <Calendar className='w-6 h-6 text-green-500' />
                </div>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  No completed assignments
                </p>
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
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-2xl font-semibold text-neutral-900 dark:text-white'>
              Assignments
            </h1>
            <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-1'>
              Manage your course assignments and deadlines
            </p>
          </div>

          {/* Class Filter */}
          <div className='flex items-center gap-3'>
            <Filter className='w-4 h-4 text-neutral-500' />
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(Number(e.target.value))}
              className='px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
              {classOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='mb-6'>
          <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-1'>
            <div className='flex'>
              <button
                onClick={() => setActiveTab("assigned")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "assigned"
                    ? "bg-blue-500 text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}>
                Assigned
              </button>
              <button
                onClick={() => setActiveTab("missing")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "missing"
                    ? "bg-red-500 text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}>
                Missing
              </button>
              <button
                onClick={() => setActiveTab("done")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "done"
                    ? "bg-green-500 text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}>
                Done
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden'>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
