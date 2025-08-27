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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // filter state
  const [selectedSemester, setSelectedSemester] = useState("HK1 2023-2024");
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
            <div className='flex items-center justify-center py-8'>
              <div className='text-lg'>Loading courses...</div>
            </div>
          </div>
        </div>
        <div className='w-full xl:w-110 border-t xl:border-t-0 xl:border-l border-neutral-200 dark:border-neutral-700'>
          <CourseSidebar />
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
        <CourseSidebar />
      </div>
    </div>
  );
}
