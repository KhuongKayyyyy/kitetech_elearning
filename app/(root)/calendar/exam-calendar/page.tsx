"use client";
import { MockExaminationData } from "@/app/data/model/ExaminationModel";
import { MOCK_SEMESTERS } from "@/app/data/model/SemesterModel";
import ExamCalendarBoard from "@/components/item_list/ExamCalendarBoard";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, BookOpen, Clock } from "lucide-react";

export default function page() {
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const examTypes = [
    "Midterm Examination",
    "Final Examination",
    "Quiz",
    "All Exams",
  ];

  // Filter semesters to only show HK1 2025-2026
  const availableSemesters = MOCK_SEMESTERS.filter(
    (semester) => semester.name === "Semester 1 2025-2026"
  );

  const handleViewCalendar = () => {
    if (selectedSemester && selectedExamType) {
      setShowCalendar(true);
    }
  };

  const handleReset = () => {
    setSelectedSemester("");
    setSelectedExamType("");
    setShowCalendar(false);
  };

  const getFilteredExaminations = () => {
    if (selectedExamType === "All Exams") {
      return MockExaminationData;
    }
    return MockExaminationData.filter((exam) => exam.name === selectedExamType);
  };

  if (showCalendar) {
    const selectedSemesterData = availableSemesters.find(
      (sem) => sem.id.toString() === selectedSemester
    );

    return (
      <div>
        <div className='p-6 bg-white border-b'>
          <div className='flex justify-between items-center max-w-7xl mx-auto'>
            <div className='flex items-center gap-3'>
              <Calendar className='w-6 h-6 text-primary' />
              <div>
                <h1 className='text-xl font-semibold'>
                  Exam Calendar - {selectedExamType}
                </h1>
                <p className='text-sm text-gray-600'>
                  {selectedSemesterData?.name}
                </p>
              </div>
            </div>
            <Button variant='outline' onClick={handleReset}>
              Change Selection
            </Button>
          </div>
        </div>
        <ExamCalendarBoard examinations={getFilteredExaminations()} />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-2xl'>
        <Card className='shadow-2xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='text-center pb-8'>
            <div className='flex justify-center mb-4'>
              <div className='p-4 bg-blue-600 rounded-full'>
                <Calendar className='w-8 h-8 text-white' />
              </div>
            </div>
            <CardTitle className='text-3xl font-bold text-gray-800 mb-2'>
              Exam Calendar
            </CardTitle>
            <CardDescription className='text-lg text-gray-600'>
              Select your semester and exam type to view the calendar
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-8 p-8'>
            <div className='grid gap-6'>
              {/* Semester Selection */}
              <div className='space-y-3'>
                <Label
                  htmlFor='semester'
                  className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                  <BookOpen className='w-4 h-4' />
                  Select Semester
                </Label>
                <Select
                  value={selectedSemester}
                  onValueChange={setSelectedSemester}>
                  <SelectTrigger className='h-12 text-base'>
                    <SelectValue placeholder='Choose your semester' />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSemesters.map((semester) => (
                      <SelectItem
                        key={semester.id}
                        value={semester.id.toString()}>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{semester.name}</span>
                          <span className='text-sm text-gray-500'>
                            {semester.start_date} to {semester.end_date}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Type Selection */}
              <div className='space-y-3'>
                <Label
                  htmlFor='examType'
                  className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  Select Exam Type
                </Label>
                <Select
                  value={selectedExamType}
                  onValueChange={setSelectedExamType}
                  disabled={!selectedSemester}>
                  <SelectTrigger className='h-12 text-base'>
                    <SelectValue placeholder='Choose exam type' />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6'>
              <Button
                onClick={handleViewCalendar}
                disabled={!selectedSemester || !selectedExamType}
                className='flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700'>
                <Calendar className='w-5 h-5 mr-2' />
                View Exam Calendar
              </Button>

              <Button
                variant='outline'
                onClick={handleReset}
                className='flex-1 h-12 text-base font-semibold border-gray-300 hover:bg-gray-50'>
                Reset Selection
              </Button>
            </div>

            {/* Selection Summary */}
            {(selectedSemester || selectedExamType) && (
              <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                <h4 className='font-semibold text-blue-800 mb-2'>
                  Current Selection:
                </h4>
                <div className='space-y-1 text-sm text-blue-700'>
                  {selectedSemester && (
                    <p>
                      <span className='font-medium'>Semester:</span>{" "}
                      {
                        availableSemesters.find(
                          (sem) => sem.id.toString() === selectedSemester
                        )?.name
                      }
                    </p>
                  )}
                  {selectedExamType && (
                    <p>
                      <span className='font-medium'>Exam Type:</span>{" "}
                      {selectedExamType}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
