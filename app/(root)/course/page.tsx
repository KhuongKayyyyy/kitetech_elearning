"use client";
import CourseFilter from "@/components/CourseFilter";
import CourseItem from "@/components/item/CourseItem";
import { useMemo, useState } from "react";
import { FakeData } from "@/app/data/FakeData";
import CourseSidebar from "@/components/bar/CourseSidebar";

export default function Home() {
  const course = FakeData.getCourses();

  // filter state
  const [selectedSemester, setSelectedSemester] = useState("HK1 2023-2024");
  const [selectedType, setSelectedType] = useState("all");

  // filter logic
  const filteredCourses = useMemo(() => {
    return course.filter((courseItem) => {
      const matchSemester =
        selectedSemester === "all" || courseItem.semester === selectedSemester;
      const matchType =
        selectedType === "all" || courseItem.type === selectedType;
      return matchSemester && matchType;
    });
  }, [course, selectedSemester, selectedType]);

  return (
    <div className='flex flex-col lg:flex-row w-full'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {filteredCourses.map((courseItem) => (
              <CourseItem key={courseItem.id} course={courseItem} />
            ))}
          </div>
        </div>
      </div>
      <div className='w-full lg:w-110 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-700'>
        <CourseSidebar />
      </div>
    </div>
  );
}
