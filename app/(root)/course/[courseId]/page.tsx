"use client";
import React from "react";
import { FakeData } from "@/app/data/FakeData";
import CourseBriefInformation from "./CourseBriefInformation";
import { ArrowRight, BookOpen } from "lucide-react";
import AddSectionButton from "./AddSectionButton";
import ClassSectionList from "@/components/item_list/ClassSectionList";
interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function page({ params }: CoursePageProps) {
  // fake data
  const course = FakeData.getCourses().find(
    (c) => c.id === parseInt(params.courseId)
  );

  if (!course) {
    return <div className='p-4 text-center'>Course not found</div>;
  }

  return (
    <div className='flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='w-full'>
        <CourseBriefInformation course={course} />
      </div>

      <div className='w-full flex-1'>
        <ClassSectionList />
      </div>

      <div className='w-full mt-4 mb-8'>
        <AddSectionButton />
      </div>
    </div>
  );
}
