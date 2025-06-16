"use client";
import React from "react";
import {
  BookOpen,
  Hash,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FakeData } from "@/app/data/FakeData";
import ClassSectionMaterialItem from "@/components/item/ClassSectionMaterialItem";
import Link from "next/link";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default function page({ params }: LessonPageProps) {
  const resolvedParams = React.use(params);
  const classSections = FakeData.getClassSections();
  const classSection = classSections.find(
    (section) => section.id === parseInt(resolvedParams.lessonId)
  );
  const classSectionMaterials = FakeData.getClassSectionMaterial();

  // Find current section index and get previous/next sections
  const currentSectionIndex = classSections.findIndex(
    (section) => section.id === parseInt(resolvedParams.lessonId)
  );
  const previousSection =
    currentSectionIndex > 0 ? classSections[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < classSections.length - 1
      ? classSections[currentSectionIndex + 1]
      : null;

  if (!classSection) {
    return <div className='p-4 text-center'>Lesson not found</div>;
  }

  return (
    <div className='flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-10'>
      <div className='mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <BookOpen className='h-5 w-5 text-primary' />
            </div>
            <div>
              <span className='inline-flex items-center px-3 py-1.5 text-sm font-semibold bg-primary/15 text-primary rounded-full'>
                <Hash className='h-3 w-3 mr-1.5' /> {classSection.name}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400'>
            <FileText className='h-4 w-4' />
            <span>{classSectionMaterials.length} materials</span>
          </div>
        </div>

        {/* Materials Section */}
        <div className='space-y-3'>
          <div className='space-y-2'>
            {classSectionMaterials.map((material, index) => (
              <div
                key={material.id}
                className='animate-in slide-in-from-left duration-300'
                style={{ animationDelay: `${index * 100}ms` }}>
                <ClassSectionMaterialItem
                  material={material}
                  isExpanded={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className='flex items-center justify-between mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='flex-1'>
            {previousSection ? (
              <Link
                href={`/course/${resolvedParams.courseId}/lesson/${previousSection.id}`}
                className='group inline-flex items-center gap-3 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-sm'>
                <div className='p-1.5 bg-white dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors'>
                  <ChevronLeft className='h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide'>
                    Previous Lesson
                  </span>
                  <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors'>
                    {previousSection.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className='opacity-50 cursor-not-allowed'>
                <div className='inline-flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm'>
                  <div className='p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md border border-neutral-200 dark:border-neutral-600'>
                    <ChevronLeft className='h-4 w-4 text-neutral-400' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-xs font-medium text-neutral-400 uppercase tracking-wide'>
                      Previous Lesson
                    </span>
                    <span className='font-semibold text-neutral-400'>
                      No previous lesson
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='flex-1 flex justify-end'>
            {nextSection ? (
              <Link
                href={`/course/${resolvedParams.courseId}/lesson/${nextSection.id}`}
                className='group inline-flex items-center gap-3 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-sm'>
                <div className='flex flex-col text-right'>
                  <span className='text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide'>
                    Next Lesson
                  </span>
                  <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors'>
                    {nextSection.name}
                  </span>
                </div>
                <div className='p-1.5 bg-white dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors'>
                  <ChevronRight className='h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200' />
                </div>
              </Link>
            ) : (
              <div className='opacity-50 cursor-not-allowed'>
                <div className='inline-flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm'>
                  <div className='flex flex-col text-right'>
                    <span className='text-xs font-medium text-neutral-400 uppercase tracking-wide'>
                      Next Lesson
                    </span>
                    <span className='font-semibold text-neutral-400'>
                      No next lesson
                    </span>
                  </div>
                  <div className='p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md border border-neutral-200 dark:border-neutral-600'>
                    <ChevronRight className='h-4 w-4 text-neutral-400' />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
