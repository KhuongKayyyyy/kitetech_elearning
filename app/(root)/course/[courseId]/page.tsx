"use client";
import React, { useState } from "react";
import { FakeData } from "@/app/data/FakeData";
import CourseBriefInformation from "./CourseBriefInformation";
import AddSectionButton from "./AddSectionButton";
import ClassSectionList from "@/components/item_list/ClassSectionList";
import CourseProcess from "@/components/item/CourseProcess";
import CourseSectionMap from "@/components/item/CourseSectionMap";
import CourseFileSection from "@/components/item_list/CourseFileSection";
import PeopleInClassList from "@/components/item_list/PeopleInClassList";
import ClassworkList from "@/components/item_list/ClassworkList";
import ClassMeetSection from "@/components/item/ClassMeetSection";
import { toast, Toaster } from "sonner";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function Page({ params }: CoursePageProps) {
  const actualParams = React.use(params);

  const course = FakeData.getCourses().find(
    (c) => c.id === parseInt(actualParams.courseId)
  );

  // Load initial class sections
  const [classSections, setClassSections] = useState(() =>
    FakeData.getClassSections()
  );

  // Segmentation state
  const [activeTab, setActiveTab] = useState<"stream" | "classwork" | "people">(
    "stream"
  );

  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const handleAddSection = () => {
    setIsAddSectionModalOpen(true);
  };

  const handleConfirmAddSection = () => {
    if (newSectionName.trim()) {
      const newSection = {
        id: Date.now(),
        courseId: course?.id ?? 0,
        name: newSectionName.trim(),
        description: "New class section",
        materials: [],
        section: classSections.length + 1,
      };
      setClassSections((prev) => [...prev, newSection]);
    }
    setIsAddSectionModalOpen(false);
    setNewSectionName("");
    toast.success("Section has been created", {
      description: "Section name: " + newSectionName,
    });
  };

  const handleCancelAddSection = () => {
    setIsAddSectionModalOpen(false);
    setNewSectionName("");
  };

  if (!course) {
    return <div className='p-4 text-center'>Course not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "stream":
        return (
          <div className='w-full flex-1'>
            <ClassSectionList classSections={classSections} />
            <div className='w-full mt-4 mb-8'>
              <AddSectionButton onAddSection={handleAddSection} />
            </div>
          </div>
        );
      case "classwork":
        return <ClassworkList />;
      case "people":
        return <PeopleInClassList />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Main content */}
        <Toaster
          position='bottom-right'
          richColors
          expand
          visibleToasts={3}
          closeButton
          duration={4000}
        />
        <div className='flex-1'>
          <div className='w-full'>
            <CourseBriefInformation course={course} />
          </div>

          {/* Sidebar content for mobile/tablet (below brief information) */}
          <div className='block lg:hidden w-full space-y-6 mb-6 px-6'>
            <ClassMeetSection />
            <CourseProcess />
            <CourseSectionMap
              classSession={classSections}
              currentSectionId={classSections[0].id}
            />
            <CourseFileSection />
          </div>

          {/* Tab Navigation */}
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700 mb-6'>
            <nav className='flex space-x-8'>
              <button
                onClick={() => setActiveTab("stream")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "stream"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}>
                Stream
              </button>
              <button
                onClick={() => setActiveTab("classwork")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "classwork"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}>
                Classwork
              </button>
              <button
                onClick={() => setActiveTab("people")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "people"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}>
                People
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>

        {/* Right Sidebar (visible only on large screens) */}
        <aside className='hidden lg:block lg:w-120 shrink-0 py-6'>
          <ClassMeetSection />
          <div className='mt-6'></div>
          <CourseProcess />
          <div className='mt-6'></div>
          <CourseSectionMap
            classSession={classSections}
            currentSectionId={classSections[0].id}
          />
          <div className='mt-6'></div>
          <CourseFileSection />
        </aside>
      </div>

      {/* Add Section Modal */}
      {isAddSectionModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md mx-4 border border-neutral-200 dark:border-neutral-700'>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-white mb-4'>
              Add New Section
            </h3>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'>
                Section Name
              </label>
              <input
                type='text'
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder='Enter section name...'
                className='w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleConfirmAddSection();
                  } else if (e.key === "Escape") {
                    handleCancelAddSection();
                  }
                }}
              />
            </div>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={handleCancelAddSection}
                className='px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors'>
                Cancel
              </button>
              <button
                onClick={handleConfirmAddSection}
                disabled={!newSectionName.trim()}
                className='px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:bg-neutral-300 disabled:cursor-not-allowed rounded-lg transition-colors'>
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
