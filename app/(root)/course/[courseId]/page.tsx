"use client";
import React, { useState, useEffect } from "react";
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
import { CourseTabEnum } from "@/app/data/enum/CourseTabEnum";
import ClassScoreTable from "./ClassScoreTable";
import { classSessionService } from "@/app/data/services/classSessionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { UserRole } from "@/app/data/enum/UserRole";
import { classSectionMaterialService } from "@/app/data/services/classSectionMaterialService";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function Page({ params }: CoursePageProps) {
  const actualParams = React.use(params);

  // Load initial class sessions
  const [classSections, setClassSections] = useState(() =>
    FakeData.getClassSections()
  );

  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<CourseTabEnum>(
    CourseTabEnum.STREAM
  );

  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const { user } = useAuthentication();
  const isTeacher = (user?.role as string) === UserRole.TEACHER;

  // Fetch class sessions from service
  useEffect(() => {
    const fetchClassSessions = async () => {
      if (actualParams.courseId) {
        try {
          setIsLoading(true);
          const data = await classSessionService.getClassSessions(
            actualParams.courseId
          );

          setClassSections(data);
        } catch (error) {
          console.error("Failed to fetch class sessions:", error);
          // Fall back to fake data if service fails
          setClassSections(FakeData.getClassSections());
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchClassSessions();
  }, [actualParams.courseId]);

  const course = classSections[0]?.course;

  const [classSectionWithMaterials, setClassSectionWithMaterials] = useState(
    []
  );

  useEffect(() => {
    const fetchClassSectionWithMaterials = async () => {
      try {
        const data = await classSessionService.getClassDetail(
          actualParams.courseId
        );
        console.log("Class section with materials:", data);
        setClassSectionWithMaterials(data);
      } catch (error) {
        console.error("Failed to fetch class section details:", error);
      }
    };

    if (actualParams.courseId) {
      fetchClassSectionWithMaterials();
    }
  }, [actualParams.courseId]);

  const handleAddSection = () => {
    setIsAddSectionModalOpen(true);
  };

  const handleConfirmAddSection = () => {
    if (newSectionName.trim() && course) {
      const newSection = {
        id: Date.now(),
        course: course,
        name: newSectionName.trim(),
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

  if (isLoading) {
    return <div className='p-4 text-center'>Loading class sessions...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "stream":
        return (
          <div className='w-full flex-1'>
            <ClassSectionList
              classSections={classSectionWithMaterials}
              course={course}
            />
            <div className='w-full mt-4 mb-8'>
              <AddSectionButton onAddSection={handleAddSection} />
            </div>
          </div>
        );
      case "classwork":
        return <ClassworkList />;
      case "people":
        return <PeopleInClassList courseId={course.id} />;
      case "score":
        return <ClassScoreTable courseId={course.id} />;
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
        <div className='flex-[3]'>
          <div className='w-full'>
            <CourseBriefInformation course={course} />
          </div>

          {/* Sidebar content for mobile/tablet (below brief information) */}
          <div className='block lg:hidden w-full space-y-6 mb-6 px-6'>
            <ClassMeetSection />
            <CourseProcess />
            <CourseSectionMap
              classSession={classSections}
              currentSectionId={classSections[0]?.id}
            />
            <CourseFileSection
              classSectionId={classSections[0]?.id.toString()}
            />
          </div>

          {/* Tab Navigation */}
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700 mb-6'>
            <nav className='flex space-x-8'>
              <button
                onClick={() => setActiveTab(CourseTabEnum.STREAM)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === CourseTabEnum.STREAM
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}>
                Stream
              </button>
              {isTeacher ? (
                <>
                  <button
                    onClick={() => setActiveTab(CourseTabEnum.PEOPLE)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === CourseTabEnum.PEOPLE
                        ? "border-primary text-primary"
                        : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}>
                    People
                  </button>
                  <button
                    onClick={() => setActiveTab(CourseTabEnum.SCORE)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === CourseTabEnum.SCORE
                        ? "border-primary text-primary"
                        : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}>
                    Score
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab(CourseTabEnum.CLASSWORK)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === CourseTabEnum.CLASSWORK
                        ? "border-primary text-primary"
                        : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}>
                    Classwork
                  </button>
                  <button
                    onClick={() => setActiveTab(CourseTabEnum.PEOPLE)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === CourseTabEnum.PEOPLE
                        ? "border-primary text-primary"
                        : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}>
                    People
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>

        {/* Right Sidebar (visible only on large screens) */}
        <aside className='hidden lg:block lg:w-80 shrink-0 py-6'>
          <ClassMeetSection />
          <div className='mt-6'></div>
          <CourseProcess />
          <div className='mt-6'></div>
          <CourseSectionMap
            classSession={classSections}
            currentSectionId={classSections[0]?.id}
          />
          <div className='mt-6'></div>
          <CourseFileSection classSectionId={classSections[0]?.id.toString()} />
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
