"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ScoreCell = ({ value }: { value: number | null }) => {
  if (value === null) {
    return <span className='text-muted-foreground'>-</span>;
  }

  let colorClass = "";
  if (value >= 9) colorClass = "text-emerald-600 font-semibold";
  else if (value >= 8) colorClass = "text-blue-600 font-medium";
  else if (value >= 7) colorClass = "text-yellow-600 font-medium";
  else if (value >= 6) colorClass = "text-orange-600 font-medium";
  else colorClass = "text-red-600 font-semibold";

  return <span className={colorClass}>{value}</span>;
};

const GradeBadge = ({ grade }: { grade: string }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let className = "";

  switch (grade) {
    case "A":
      variant = "default";
      className = "bg-emerald-100 text-emerald-800 border-emerald-200";
      break;
    case "B":
      variant = "default";
      className = "bg-blue-100 text-blue-800 border-blue-200";
      break;
    case "C":
      variant = "default";
      className = "bg-yellow-100 text-yellow-800 border-yellow-200";
      break;
    case "D":
      variant = "default";
      className = "bg-orange-100 text-orange-800 border-orange-200";
      break;
    case "F":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }

  return (
    <Badge variant={variant} className={grade !== "F" ? className : ""}>
      {grade}
    </Badge>
  );
};

// Student score data based on provided classes
const getFakeStudentScores = () => {
  return [
    {
      id: 1,
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      qt1: 8.5,
      qt2: 9.0,
      midterm: 8.8,
      finalTerm: 9.2,
      average: 8.9,
      grade: "A",
      semester: "HK1 2025-2026",
    },
    {
      id: 2,
      courseCode: "CS201",
      courseName: "Data Structures and Algorithms",
      qt1: 7.5,
      qt2: 8.0,
      midterm: 7.8,
      finalTerm: 8.2,
      average: 7.9,
      grade: "B",
      semester: "HK1 2025-2026",
    },
    {
      id: 3,
      courseCode: "CS301",
      courseName: "Database Systems",
      qt1: 9.0,
      qt2: 8.5,
      midterm: 9.2,
      finalTerm: 8.8,
      average: 8.9,
      grade: "A",
      semester: "HK1 2025-2026",
    },
    {
      id: 4,
      courseCode: "CS401",
      courseName: "Operating Systems",
      qt1: 8.0,
      qt2: 8.5,
      midterm: 8.2,
      finalTerm: 8.8,
      average: 8.4,
      grade: "B",
      semester: "HK1 2025-2026",
    },
    {
      id: 5,
      courseCode: "CS501",
      courseName: "Computer Networks",
      qt1: 9.5,
      qt2: 9.0,
      midterm: 9.3,
      finalTerm: 9.1,
      average: 9.2,
      grade: "A",
      semester: "HK1 2025-2026",
    },
  ];
};

export default function StudentScorePage() {
  const [loading, setLoading] = useState(true);

  // Use fake data
  const allStudentScores = useMemo(() => {
    return getFakeStudentScores();
  }, []);

  const [selectedSemester, setSelectedSemester] =
    useState<string>("HK1 2025-2026");

  // Loading effect for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter scores by semester
  const filteredScores = useMemo(() => {
    if (selectedSemester === "all") {
      return allStudentScores;
    }
    return allStudentScores.filter(
      (score) => score.semester === selectedSemester
    );
  }, [allStudentScores, selectedSemester]);

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    if (filteredScores.length === 0) {
      return { averageGPA: 0, totalCredits: 0, gradeDistribution: {} };
    }

    const totalAverage =
      filteredScores.reduce((sum, score) => sum + (score.average || 0), 0) /
      filteredScores.length;
    const gradeDistribution = filteredScores.reduce((acc, score) => {
      acc[score.grade] = (acc[score.grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      averageGPA: Math.round(totalAverage * 100) / 100,
      totalCredits: filteredScores.length * 3, // Assuming 3 credits per course
      gradeDistribution,
    };
  }, [filteredScores]);

  if (loading) {
    return (
      <div className='container mx-auto p-6 space-y-6'>
        {/* Header Skeleton */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='space-y-2'>
            <div className='h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-64 animate-pulse'></div>
            <div className='h-5 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-80 animate-pulse'></div>
          </div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-48 animate-pulse'></div>
        </div>

        {/* Table Skeleton */}
        <Card>
          <CardHeader>
            <div className='h-6 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-32 animate-pulse'></div>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse'></div>
                    </TableHead>
                    <TableHead className='text-center w-20'>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                    </TableHead>
                    <TableHead className='text-center w-20'>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                    </TableHead>
                    <TableHead className='text-center w-24'>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mx-auto animate-pulse'></div>
                    </TableHead>
                    <TableHead className='text-center w-24'>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-12 mx-auto animate-pulse'></div>
                    </TableHead>
                    <TableHead className='text-center w-24'>
                      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mx-auto animate-pulse'></div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-48 animate-pulse'></div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-8 mx-auto animate-pulse'></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>My Academic Scores</h1>
          <p className='text-muted-foreground'>
            View your academic performance and grades
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='Select semester' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Semesters</SelectItem>
              <SelectItem value='HK1 2025-2026'>HK1 2025-2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead className='text-center w-20'>QT1</TableHead>
                  <TableHead className='text-center w-20'>QT2</TableHead>
                  <TableHead className='text-center w-24'>Midterm</TableHead>
                  <TableHead className='text-center w-24'>Final</TableHead>
                  <TableHead className='text-center w-24'>Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScores.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center py-8 text-muted-foreground'>
                      No scores available
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScores.map((score) => (
                    <TableRow key={score.id} className='hover:bg-muted/50'>
                      <TableCell>{score.courseName}</TableCell>
                      <TableCell className='text-center'>
                        <ScoreCell value={score.qt1} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <ScoreCell value={score.qt2} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <ScoreCell value={score.midterm} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <ScoreCell value={score.finalTerm} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <ScoreCell value={score.average} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
