import React from "react";
import { BookOpen, Plus } from "lucide-react";
import ClassworkItem from "@/components/item/ClassworkItem";
import { FakeData } from "@/app/data/FakeData";

export default function ClassworkList() {
  // Fake data for classwork
  const classworkData = [
    {
      id: 1,
      title: "Assignment 1: Introduction to React",
      description: "Create a simple React component with state management",
      dueDate: "2024-12-25",
      status: "pending" as const,
      points: 0,
      totalPoints: 100,
      courseId: 1,
      sectionId: 1,
      materialId: 1,
      submissionType: "file" as const,
    },
    {
      id: 2,
      title: "Quiz: JavaScript Fundamentals",
      description: "Multiple choice quiz covering basic JavaScript concepts",
      dueDate: "2024-12-20",
      status: "submitted" as const,
      points: 85,
      totalPoints: 100,
      courseId: 1,
      sectionId: 1,
      materialId: 2,
      submissionType: "quiz" as const,
      grade: 85,
    },
    {
      id: 3,
      title: "Project: Build a Todo App",
      description:
        "Create a full-featured todo application using React and TypeScript",
      dueDate: "2024-12-15",
      status: "graded" as const,
      points: 92,
      totalPoints: 100,
      courseId: 1,
      sectionId: 2,
      materialId: 3,
      submissionType: "file" as const,
      grade: 92,
    },
    {
      id: 4,
      title: "Essay: Modern Web Development",
      description:
        "Write a 1000-word essay on the evolution of web development",
      dueDate: "2024-12-10",
      status: "late" as const,
      points: 0,
      totalPoints: 50,
      courseId: 1,
      sectionId: 2,
      materialId: 4,
      submissionType: "text" as const,
    },
    {
      id: 5,
      title: "Lab Exercise: CSS Grid Layout",
      description: "Practice CSS Grid by recreating provided layouts",
      dueDate: "2024-12-30",
      status: "pending" as const,
      points: 0,
      totalPoints: 75,
      courseId: 1,
      sectionId: 3,
      materialId: 5,
      submissionType: "file" as const,
    },
  ];

  const handleCreateAssignment = () => {
    console.log("Creating new assignment");
    // TODO: Implement create assignment functionality
  };

  // Calculate statistics
  const totalPoints = classworkData.reduce(
    (sum, item) => sum + (item.points || 0),
    0
  );
  const maxPoints = classworkData.reduce(
    (sum, item) => sum + item.totalPoints,
    0
  );
  const completedCount = classworkData.filter(
    (item) => item.status === "submitted" || item.status === "graded"
  ).length;

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700'>
            <BookOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
              Classwork
            </h3>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              {completedCount} of {classworkData.length} completed •{" "}
              {totalPoints}/{maxPoints} points
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateAssignment}
          className='flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
          <Plus className='h-4 w-4' />
          Create Assignment
        </button>
      </div>

      {/* Classwork Items */}
      {classworkData.length > 0 ? (
        <div className='space-y-4'>
          {classworkData.map((classwork) => (
            <ClassworkItem key={classwork.id} classwork={classwork} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className='text-center py-12'>
          <BookOpen className='h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-3' />
          <h4 className='text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2'>
            No classwork yet
          </h4>
          <p className='text-sm text-neutral-400 dark:text-neutral-500 mb-4'>
            Create your first assignment to get started
          </p>
          {FakeData.getCurrentUserRole() === "teacher" && (
            <button
              onClick={handleCreateAssignment}
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
              <Plus className='h-4 w-4' />
              Create Assignment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
