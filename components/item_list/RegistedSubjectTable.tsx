"use client";
import React from "react";
import { BookOpen, Calendar, Check } from "lucide-react";

export default function RegistedSubjectTable({
  registeredSubjects,
}: {
  registeredSubjects: any[];
}) {
  return (
    <div className='w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen p-6'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-green-600 rounded-lg'>
            <BookOpen className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Registered Subjects
            </h1>
            <p className='text-gray-600'>
              View your registered courses for the current semester
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
        {registeredSubjects.length === 0 ? (
          <div className='p-8 text-center text-gray-600'>
            You have not registered any subjects yet.
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gradient-to-r from-green-600 to-emerald-600 text-white'>
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
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {registeredSubjects.map((course, index) => {
                  const registrationDate = new Date().toLocaleDateString(
                    "en-GB"
                  );

                  return (
                    <tr
                      key={course.id}
                      className='hover:bg-green-50 transition-all duration-200 bg-green-50/30 border-l-4 border-green-500'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                        {index + 1}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <div className='p-2 bg-green-100 rounded-lg'>
                            <BookOpen className='w-4 h-4 text-green-600' />
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
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {registrationDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className='mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Registration Summary
            </h3>
            <p className='text-gray-600'>
              {registeredSubjects.length} course
              {registeredSubjects.length !== 1 ? "s" : ""} registered •{" "}
              {registeredSubjects.reduce(
                (total, course) => total + course.credits,
                0
              )}{" "}
              total credits
            </p>
          </div>
        </div>
      </div>
      <div className='mt-30'></div>
    </div>
  );
}
