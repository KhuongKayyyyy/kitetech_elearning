"use client";

import React, { useMemo, useState } from "react";
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
import {
  StudentScore,
  getStudentScoresByCourse,
} from "@/app/data/api/score_data";
import { FakeData } from "@/app/data/FakeData";

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

// Fake student score data
const getFakeStudentScores = () => {
  return [
    {
      id: 1,
      courseCode: "CS 2110",
      courseName: "Computer Programming",
      qt1: 8.5,
      qt2: 9.0,
      midterm: 8.8,
      finalTerm: 9.2,
      average: 8.9,
      grade: "A",
      semester: "HK1 2023-2024",
    },
    {
      id: 2,
      courseCode: "MATH 2940",
      courseName: "Linear Algebra",
      qt1: 7.5,
      qt2: 8.0,
      midterm: 7.8,
      finalTerm: 8.2,
      average: 7.9,
      grade: "B",
      semester: "HK1 2023-2024",
    },
    {
      id: 3,
      courseCode: "PHIL 1101",
      courseName: "Introduction to Philosophy",
      qt1: 9.0,
      qt2: 8.5,
      midterm: 9.2,
      finalTerm: 8.8,
      average: 8.9,
      grade: "A",
      semester: "HK2 2023-2024",
    },
    {
      id: 4,
      courseCode: "PE 1440",
      courseName: "Physical Education",
      qt1: 8.0,
      qt2: 8.5,
      midterm: 8.2,
      finalTerm: 8.8,
      average: 8.4,
      grade: "B",
      semester: "HK2 2023-2024",
    },
    {
      id: 5,
      courseCode: "CS 3410",
      courseName: "Data Structures",
      qt1: 9.5,
      qt2: 9.0,
      midterm: 9.3,
      finalTerm: 9.1,
      average: 9.2,
      grade: "A",
      semester: "HK1 2024-2025",
    },
    {
      id: 6,
      courseCode: "PE 1220",
      courseName: "Swimming",
      qt1: 7.0,
      qt2: 7.5,
      midterm: 7.2,
      finalTerm: 7.8,
      average: 7.4,
      grade: "C",
      semester: "HK1 2024-2025",
    },
  ];
};

export default function StudentScorePage() {
  // Use fake data
  const allStudentScores = useMemo(() => {
    return getFakeStudentScores();
  }, []);

  const [selectedSemester, setSelectedSemester] = useState<string>("all");

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
              <SelectItem value='HK1 2023-2024'>HK1 2023-2024</SelectItem>
              <SelectItem value='HK2 2023-2024'>HK2 2023-2024</SelectItem>
              <SelectItem value='HK1 2024-2025'>HK1 2024-2025</SelectItem>
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
                  <TableHead className='w-32'>Course Code</TableHead>
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
                      colSpan={7}
                      className='text-center py-8 text-muted-foreground'>
                      No scores available
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScores.map((score) => (
                    <TableRow key={score.id} className='hover:bg-muted/50'>
                      <TableCell className='font-medium'>
                        {score.courseCode}
                      </TableCell>
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
