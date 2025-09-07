"use client";
import CourseFilter from "@/components/CourseFilter";
import CourseItem from "@/components/item/CourseItem";
import { useMemo, useState, useEffect } from "react";
import CourseSidebar from "@/components/bar/CourseSidebar";
import AcademicYearList from "@/components/item_list/AcaList";
import CreateAcademicYearTestButton from "@/components/item/temp_item";
import { FakeData } from "@/app/data/FakeData";
import { CourseData } from "@/app/data/api/course_data";
import { classService } from "@/app/data/services/classService";

// Skeleton Components
const CourseSkeleton = () => (
  <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 animate-pulse'>
    <div className='flex items-center gap-3 mb-4'>
      <div className='w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl'></div>
      <div className='flex-1'>
        <div className='h-5 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-3/4 mb-2'></div>
        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-1/2'></div>
      </div>
    </div>
    <div className='space-y-3'>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-full'></div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-5/6'></div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-2/3'></div>
    </div>
    <div className='flex items-center justify-between mt-6'>
      <div className='h-6 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-20'></div>
      <div className='h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-24'></div>
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className='p-4 space-y-4'>
    <div className='h-6 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-32 animate-pulse'></div>
    <div className='space-y-3'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='flex items-center gap-3 p-3 animate-pulse'>
          <div className='w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg'></div>
          <div className='flex-1'>
            <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-3/4 mb-1'></div>
            <div className='h-3 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-1/2'></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // filter state
  const [selectedSemester, setSelectedSemester] = useState("HK1 2025-2026");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await classService.getClasses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        // Fallback to static data if API fails
        setCourses(CourseData.getCourses());
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((courseItem) => {
      const matchSemester =
        selectedSemester === "all" || courseItem.semester === selectedSemester;
      const matchType =
        selectedType === "all" || courseItem.type === selectedType;
      return matchSemester && matchType;
    });
  }, [courses, selectedSemester, selectedType]);

  if (loading) {
    return (
      <div className='flex flex-col xl:flex-row w-full'>
        <div className='flex-1 p-4 max-w-full'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>Courses</h1>
            </div>
            {/* Filter skeleton */}
            <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center'>
              <div className='space-y-3'>
                <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-32 animate-pulse'></div>
                <div className='w-full sm:w-64 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
              </div>
              <div className='flex flex-wrap gap-3'>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className='h-10 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse'></div>
                ))}
              </div>
            </div>
            {/* Course grid skeleton */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
              {[...Array(6)].map((_, i) => (
                <CourseSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className='w-full xl:w-110 border-t xl:border-t-0 xl:border-l border-neutral-200 dark:border-neutral-700'>
          <SidebarSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col xl:flex-row w-full'>
      <div className='flex-1 p-4 max-w-full'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Courses</h1>
          </div>
          <CourseFilter
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
            {filteredCourses.map((courseItem) => (
              <CourseItem key={courseItem.id} course={courseItem} />
            ))}
          </div>
        </div>
      </div>
      <div className='w-full xl:w-110 border-t xl:border-t-0 xl:border-l border-neutral-200 dark:border-neutral-700'>
        <CourseSidebar courses={courses} />
      </div>
    </div>
  );
}
