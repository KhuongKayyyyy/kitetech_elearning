"use client";
import { FakeCurriclumnData } from "@/app/data/FakeCurriculumData";
import { CurriculumnSubjectModel } from "@/app/data/model/CurriculumnSubjectModel";

import CurriculumnBoard from "@/components/item_list/CurriculumnBoard";
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
import { GraduationCap, BookOpen, Calendar } from "lucide-react";

export default function page() {
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>("");
  const [showCurriculum, setShowCurriculum] = useState<boolean>(false);

  const majors = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Data Science",
    "Cybersecurity",
  ];

  const years = ["2021", "2022", "2023", "2024"];

  const specializations = [
    "Web Development",
    "Mobile Development",
    "AI/Machine Learning",
    "Database Systems",
    "Network Security",
  ];

  const handleViewCurriculum = () => {
    if (selectedMajor && selectedYear && selectedSpecialization) {
      setShowCurriculum(true);
    }
  };

  const handleReset = () => {
    setSelectedMajor("");
    setSelectedYear("");
    setSelectedSpecialization("");
    setShowCurriculum(false);
  };

  if (showCurriculum) {
    return (
      <div>
        <div className='p-6 bg-white border-b'>
          <div className='flex justify-between items-center max-w-7xl mx-auto'>
            <div className='flex items-center gap-3'>
              <GraduationCap className='w-6 h-6 text-primary' />
              <div>
                <h1 className='text-xl font-semibold'>
                  {selectedMajor} Curriculum
                </h1>
                <p className='text-sm text-gray-600'>
                  Year {selectedYear} • {selectedSpecialization}
                </p>
              </div>
            </div>
            <Button variant='outline' onClick={handleReset}>
              Change Selection
            </Button>
          </div>
        </div>
        <CurriculumnBoard
          subjects={FakeCurriclumnData as CurriculumnSubjectModel[]}
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-primary/10 rounded-full'>
              <GraduationCap className='w-8 h-8 text-primary' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold'>
            Select Your Curriculum
          </CardTitle>
          <CardDescription>
            Choose your major, academic year, and specialization to view your
            curriculum
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='major' className='flex items-center gap-2'>
              <BookOpen className='w-4 h-4' />
              Major
            </Label>
            <Select value={selectedMajor} onValueChange={setSelectedMajor}>
              <SelectTrigger>
                <SelectValue placeholder='Select your major' />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major} value={major}>
                    {major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='year' className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              Academic Year
            </Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder='Select your academic year' />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='specialization' className='flex items-center gap-2'>
              <GraduationCap className='w-4 h-4' />
              Specialization
            </Label>
            <Select
              value={selectedSpecialization}
              onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder='Select your specialization' />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className='w-full'
            onClick={handleViewCurriculum}
            disabled={
              !selectedMajor || !selectedYear || !selectedSpecialization
            }>
            View Curriculum
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
