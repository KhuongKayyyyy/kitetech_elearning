"use client";

import React, { useState, useEffect } from "react";
import { FakeData } from "@/app/data/FakeData";
import { UserRole } from "@/app/data/enum/UserRole";
import TeacherScorePage from "./teacher_score_page";
import StudentScorePage from "./student_score_page";
import { CourseData } from "@/app/data/api/course_data";
import { classService } from "@/app/data/services/classService";

export default function page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const userRole = FakeData.getCurrentUserRole();

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

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Score</h1>
          <div className='animate-pulse'>
            <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mb-4'></div>
            <div className='space-y-3'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='h-16 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === UserRole.TEACHER) {
    return (
      <div className='p-6'>
        <TeacherScorePage courses={courses} />
      </div>
    );
  } else if (userRole === UserRole.STUDENT) {
    return (
      <div className='p-6'>
        <StudentScorePage />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Score</h1>
    </div>
  );
}
