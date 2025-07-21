"use client";
import React, { useState } from "react";
import RegisSubjectTable from "@/components/item_list/RegisSubjectTable";
import FloatingRegisedSubject from "@/components/item_list/FloatingRegisedSubject";
import RegistedSubjectTable from "@/components/item_list/RegistedSubjectTable";
import { FakeData } from "@/app/data/FakeData";
import { Toaster } from "sonner";
import { BookOpen, GraduationCap, Plus, List } from "lucide-react";

export default function Page() {
  const availableSubjects = FakeData.getCourses();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set()
  );
  const [selectedSemester, setSelectedSemester] = useState<string>("2024-1");
  const [activeTab, setActiveTab] = useState<"register" | "registered">(
    "register"
  );

  const registeredSubjects = Array.from(selectedSubjects)
    .map((id) => availableSubjects.find((subj) => subj.id.toString() === id))
    .filter(Boolean);

  const handleClear = () => setSelectedSubjects(new Set());
  const handleConfirm = () => {
    alert("Registration confirmed! (Implement your logic here)");
  };

  const semesters = [
    { value: "2024-1", label: "Spring 2024" },
    { value: "2024-2", label: "Fall 2024" },
    { value: "2023-2", label: "Fall 2023" },
    { value: "2023-1", label: "Spring 2023" },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='container mx-auto p-6'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Subject Registration
          </h1>
          <p className='text-gray-600 text-lg'>
            Manage your course registration and view enrolled subjects
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
          <div className='border-b border-gray-200'>
            <nav className='flex'>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === "register"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}>
                <Plus className='w-5 h-5' />
                Register New Subjects
              </button>
              <button
                onClick={() => setActiveTab("registered")}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === "registered"
                    ? "bg-green-50 text-green-700 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}>
                <List className='w-5 h-5' />
                My Registered Subjects
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === "register" && (
              <div className='space-y-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-2 bg-blue-600 rounded-lg'>
                    <BookOpen className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Available Subjects
                    </h2>
                    <p className='text-gray-600'>
                      Select subjects you want to register for the current
                      semester
                    </p>
                  </div>
                </div>

                <RegisSubjectTable
                  availableSubjects={availableSubjects}
                  selectedSubjects={selectedSubjects}
                  setSelectedSubjects={setSelectedSubjects}
                />

                <FloatingRegisedSubject
                  registeredSubjects={registeredSubjects}
                  onClear={handleClear}
                  onConfirm={handleConfirm}
                />
              </div>
            )}

            {activeTab === "registered" && (
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-green-600 rounded-lg'>
                      <GraduationCap className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        Registered Subjects
                      </h2>
                      <p className='text-gray-600'>
                        View your registered courses by semester
                      </p>
                    </div>
                  </div>

                  {/* Semester Selector */}
                  <div className='flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg'>
                    <label
                      htmlFor='semester'
                      className='text-sm font-medium text-gray-700 whitespace-nowrap'>
                      Semester:
                    </label>
                    <select
                      id='semester'
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className='px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm min-w-[140px]'>
                      {semesters.map((semester) => (
                        <option key={semester.value} value={semester.value}>
                          {semester.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <RegistedSubjectTable />
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster position='bottom-left'></Toaster>
    </div>
  );
}
