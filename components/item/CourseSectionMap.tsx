import React from "react";
import { useRouter } from "next/navigation";

interface CourseSectionMapProps {
  currentSectionId: number;
  classSession: ClassSectionModel[];
}

export default function CourseSectionMap({
  classSession,
}: CourseSectionMapProps) {
  const router = useRouter();

  const handleSectionClick = (sectionId: number) => {
    const sectionElement = document.getElementById(`section-${sectionId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 shadow-sm'>
      <h3 className='text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 sm:mb-4'>
        Course Sections
      </h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3'>
        {classSession.map((section, index) => (
          <button
            key={`section-${section.id}-${index}`}
            onClick={() => handleSectionClick(section.id)}
            className={`
              relative p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 text-center min-h-[60px] sm:min-h-[70px]
              border-neutral-200 dark:border-neutral-600 hover:border-primary hover:bg-primary/5
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
            `}>
            <div className='text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1'>
              Section
            </div>
            <div className='text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100'>
              {section.section}
            </div>
            <div className='text-xs text-neutral-500 dark:text-neutral-400 truncate px-1'>
              {section.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
