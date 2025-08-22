"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Clock, MapPin } from "lucide-react";
import { FakeData } from "@/app/data/FakeData";
import ClassScoreTable from "../course/[courseId]/ClassScoreTable";
import { CourseData } from "@/app/data/api/course_data";

export default function TeacherScorePage() {
  // Get all courses from FakeData
  const allCourses = useMemo(() => CourseData.getCourses(), []);

  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");

  // Get unique course types for filtering
  const courseTypes = useMemo(() => {
    const types = [...new Set(allCourses.map((course) => course.type))];
    return types;
  }, [allCourses]);

  // Filter courses by selected type
  const filteredCourses = useMemo(() => {
    if (selectedCourseId === "all") {
      return allCourses;
    }
    return allCourses.filter(
      (course) => course.id === parseInt(selectedCourseId)
    );
  }, [allCourses, selectedCourseId]);

  // Get course options for dropdown
  const courseOptions = useMemo(() => {
    return [
      { value: "all", label: "All Courses" },
      ...allCourses.map((course) => ({
        value: course.id.toString(),
        label: `${course.code} - ${course.name}`,
      })),
    ];
  }, [allCourses]);

  // Get course type options for filtering
  const courseTypeOptions = useMemo(() => {
    return [
      { value: "all", label: "All Types" },
      ...courseTypes.map((type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
      })),
    ];
  }, [courseTypes]);

  const [selectedCourseType, setSelectedCourseType] = useState<string>("all");

  // Filter courses by type
  const coursesByType = useMemo(() => {
    if (selectedCourseType === "all") {
      return filteredCourses;
    }
    return filteredCourses.filter(
      (course) => course.type === selectedCourseType
    );
  }, [filteredCourses, selectedCourseType]);

  const handleCourseClick = (courseId: number) => {
    setSelectedCourseId(courseId.toString());
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Course Management Dashboard
        </h1>
        <p className='text-muted-foreground'>
          View and manage student scores across all courses
        </p>
      </div>

      {/* Filters */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          {/* Course Type Filter */}
          <Select
            value={selectedCourseType}
            onValueChange={setSelectedCourseType}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Course Type' />
            </SelectTrigger>
            <SelectContent>
              {courseTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Course Filter */}
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger className='w-80'>
              <SelectValue placeholder='Select Course' />
            </SelectTrigger>
            <SelectContent>
              {courseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {coursesByType.map((course) => (
          <div key={course.id} className='h-full'>
            <div
              onClick={() => handleCourseClick(course.id)}
              className='group bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col cursor-pointer'>
              {/* Header */}
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <span className='inline-flex items-center px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20'>
                      {course.code}
                    </span>
                    <Badge
                      variant={
                        course.type === "main" ? "default" : "secondary"
                      }>
                      {course.type.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className='text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
                    {course.name}
                  </h3>
                </div>
                <div className='text-right'>
                  <div className='text-lg font-bold text-primary'>
                    {course.credits}{" "}
                    {course.credits === 1 ? "credit" : "credits"}
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className='grid grid-cols-1 gap-3 mb-4'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-neutral-500 flex-shrink-0' />
                  <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
                    Section {course.section} - {course.schedule}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-neutral-500 flex-shrink-0' />
                  <span className='text-sm text-neutral-700 dark:text-neutral-300 truncate'>
                    {course.location}
                  </span>
                </div>
              </div>

              <div className='mt-15'></div>
              {/* Actions */}
              <div className='flex items-center justify-between mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700'>
                <button className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm'>
                  <BookOpen className='h-4 w-4' />
                  View Scores
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Score Table for Selected Course */}
      {selectedCourseId !== "all" && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>
              Student Scores -{" "}
              {
                allCourses.find((c) => c.id === parseInt(selectedCourseId))
                  ?.code
              }
            </h2>
            <Button variant='ghost' onClick={() => setSelectedCourseId("all")}>
              Back to All Courses
            </Button>
          </div>
          <ClassScoreTable courseId={parseInt(selectedCourseId)} />
        </div>
      )}

      {/* No courses message */}
      {coursesByType.length === 0 && (
        <div className='text-center py-12'>
          <GraduationCap className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
          <h3 className='text-lg font-medium mb-2'>No courses found</h3>
          <p className='text-muted-foreground'>
            Try adjusting your filters to see available courses.
          </p>
        </div>
      )}
    </div>
  );
}
