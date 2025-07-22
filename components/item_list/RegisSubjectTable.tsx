"use client";
import { FakeData } from "@/app/data/FakeData";
import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Check,
  Plus,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function RegisSubjectTable({
  availableSubjects,
  selectedSubjects,
  setSelectedSubjects,
}: {
  availableSubjects: any[];
  selectedSubjects: Set<string>;
  setSelectedSubjects: (subjects: Set<string>) => void;
}) {
  const handleRegister = (courseId: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(courseId)) {
      toast.success(
        "Subject " +
          availableSubjects.find((c) => c.id.toString() === courseId)?.name +
          " removed from registration"
      );
      newSelected.delete(courseId);
    } else {
      toast.success(
        "Subject " +
          availableSubjects.find((c) => c.id.toString() === courseId)?.name +
          " added to registration"
      );
      newSelected.add(courseId);
    }
    setSelectedSubjects(newSelected);
  };

  const getEnrollmentStatus = (enrolled: number, capacity: number = 40) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100) {
      return { color: "bg-red-500", label: "Full" };
    } else if (percentage >= 80) {
      return { color: "bg-orange-500", label: "Nearly Full" };
    } else {
      return { color: "bg-green-500", label: "Available" };
    }
  };

  return (
    <div className='w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen p-6'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-blue-600 rounded-lg'>
            <BookOpen className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Course Registration
            </h1>
            <p className='text-gray-600'>
              Select courses for the upcoming semester
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-200'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <BookOpen className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Available Courses</p>
                <p className='text-xl font-bold text-gray-900'>
                  {availableSubjects.length}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-200'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <Check className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Selected Courses</p>
                <p className='text-xl font-bold text-gray-900'>
                  {selectedSubjects.size}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-200'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Users className='w-5 h-5 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Credits</p>
                <p className='text-xl font-bold text-gray-900'>
                  {Array.from(selectedSubjects).reduce((total, id) => {
                    const course = availableSubjects.find(
                      (c) => c.id.toString() === id.toString()
                    );
                    return total + (course ? course.credits : 0);
                  }, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No Available Subjects Message */}
      {availableSubjects.length === 0 ? (
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-12'>
          <div className='text-center'>
            <div className='mx-auto flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4'>
              <AlertCircle className='w-8 h-8 text-orange-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No Available Subjects
            </h3>
            <p className='text-gray-600 text-lg'>
              There are currently no available subjects for registration. Please
              check back later or contact the academic office for more
              information.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Table Section */}
          <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      STT
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Course Code
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Course Name
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Credits
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Schedule
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Period
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                      Enrollment
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {availableSubjects.map((course, index) => {
                    const isSelected = selectedSubjects.has(
                      course.id.toString()
                    );
                    const enrollmentStatus = getEnrollmentStatus(
                      course.enrolled,
                      40
                    );

                    return (
                      <tr
                        key={course.id}
                        className={`hover:bg-blue-50 transition-all duration-200 ${
                          isSelected
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : ""
                        }`}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                          {index + 1}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center gap-2'>
                            <div className='p-2 bg-indigo-100 rounded-lg'>
                              <BookOpen className='w-4 h-4 text-indigo-600' />
                            </div>
                            <span className='text-sm font-bold text-gray-900'>
                              {course.code}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm font-medium text-gray-900 leading-tight'>
                            {course.name}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                            {course.credits} TC
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-900'>
                              {course.schedule}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          1-3
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                              <Users className='w-4 h-4 text-gray-400' />
                              <span className='text-sm text-gray-900'>
                                {course.enrolled}/40
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <div
                                className={`w-2 h-2 rounded-full ${enrollmentStatus.color}`}></div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <button
                            onClick={() => handleRegister(course.id.toString())}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                              isSelected
                                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                            }`}>
                            {isSelected ? (
                              <>
                                <Check className='w-4 h-4' />
                                Registered
                              </>
                            ) : (
                              <>
                                <Plus className='w-4 h-4' />
                                Register
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Actions */}
          {selectedSubjects.size > 0 && (
            <div className='mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Registration Summary
                  </h3>
                  <p className='text-gray-600'>
                    {selectedSubjects.size} course
                    {selectedSubjects.size !== 1 ? "s" : ""} selected •{" "}
                    {Array.from(selectedSubjects).reduce((total, id) => {
                      const course = availableSubjects.find(
                        (c) => c.id.toString() === id.toString()
                      );
                      return total + (course ? course.credits : 0);
                    }, 0)}{" "}
                    total credits
                  </p>
                </div>
                <button className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-green-500/25'>
                  Confirm Registration
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <div className='mt-30'></div>
    </div>
  );
}
