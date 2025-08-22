// Student Score Interface and fake data generator

import { UserModel, Role } from "../model/UserModel";
import { classDistribution } from "./user_data";

export interface StudentScore {
  id: string;
  studentId: number;
  studentName: string;
  qt1: number | null;
  qt2: number | null;
  midterm: number | null;
  finalTerm: number | null;
  average: number | null;
  grade: string;
}

export const generateScoreDataForStudents = (students: UserModel[]): StudentScore[] => {
  const fixedScores = [
    { qt1: 9, qt2: 8, midterm: 9, finalTerm: 9 },
    { qt1: 7, qt2: 8, midterm: 7, finalTerm: 8 },
    { qt1: 10, qt2: 9, midterm: 10, finalTerm: 10 },
    { qt1: 6, qt2: 7, midterm: 6, finalTerm: 7 },
    { qt1: 8, qt2: 9, midterm: 8, finalTerm: 9 },
    { qt1: 5, qt2: 6, midterm: 5, finalTerm: 6 },
    { qt1: 9, qt2: 10, midterm: 9, finalTerm: 10 },
    { qt1: 7, qt2: 6, midterm: 7, finalTerm: 7 },
    { qt1: 8, qt2: 8, midterm: 8, finalTerm: 8 },
    { qt1: 4, qt2: 5, midterm: 4, finalTerm: 5 },
    { qt1: 10, qt2: 10, midterm: 10, finalTerm: 10 },
    { qt1: 6, qt2: 6, midterm: 6, finalTerm: 6 },
    { qt1: 8, qt2: 7, midterm: 8, finalTerm: 7 },
    { qt1: 9, qt2: 9, midterm: 9, finalTerm: 9 },
    { qt1: 5, qt2: 4, midterm: 5, finalTerm: 4 },
    { qt1: 7, qt2: 8, midterm: 7, finalTerm: 8 },
    { qt1: 10, qt2: 9, midterm: 10, finalTerm: 9 },
    { qt1: 6, qt2: 7, midterm: 6, finalTerm: 7 },
    { qt1: 8, qt2: 8, midterm: 8, finalTerm: 8 },
    { qt1: 3, qt2: 4, midterm: 3, finalTerm: 4 },
    { qt1: 9, qt2: 8, midterm: 9, finalTerm: 8 },
    { qt1: 7, qt2: 7, midterm: 7, finalTerm: 7 },
    { qt1: 10, qt2: 10, midterm: 10, finalTerm: 10 },
    { qt1: 8, qt2: 9, midterm: 8, finalTerm: 9 },
    { qt1: 6, qt2: 5, midterm: 6, finalTerm: 5 },
    { qt1: 9, qt2: 9, midterm: 9, finalTerm: 9 },
    { qt1: 7, qt2: 8, midterm: 7, finalTerm: 8 },
    { qt1: 5, qt2: 6, midterm: 5, finalTerm: 6 },
    { qt1: 10, qt2: 8, midterm: 10, finalTerm: 8 },
    { qt1: 4, qt2: 3, midterm: 4, finalTerm: 3 }
  ];
  
  return students.map((student: UserModel, index: number) => {
    const scoreData = fixedScores[index % fixedScores.length];
    const qt1 = scoreData.qt1;
    const qt2 = scoreData.qt2;
    const midterm = scoreData.midterm;
    const finalTerm = scoreData.finalTerm;

    const scores = [qt1, qt2, midterm, finalTerm];
    const average = Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10;

    let grade = "N/A";
    if (average >= 9) grade = "A";
    else if (average >= 8) grade = "B";
    else if (average >= 7) grade = "C";
    else if (average >= 6) grade = "D";
    else grade = "F";

    return {
      id: `student-${student.id}`,
      studentId: student.id,
      studentName: student.full_name,
      qt1,
      qt2,
      midterm,
      finalTerm,
      average,
      grade,
    };
  });
};

export const getStudentScores = (students: UserModel[]): StudentScore[] => {
  return generateScoreDataForStudents(students);
};

export const generateScoreDataForClass = (classNumber: number): StudentScore[] => {
  const classKey = `class${classNumber}` as keyof typeof classDistribution;
  const studentsInClass = classDistribution[classKey] || [];
  
  return generateScoreDataForStudents(studentsInClass);
};

export const generateFakeScoreData = (): StudentScore[] => {
  // For backward compatibility, return scores for class 1
  return generateScoreDataForClass(1);
};

export const getAllClassesScoreData = (): { [classId: string]: StudentScore[] } => {
  const allScores: { [classId: string]: StudentScore[] } = {};
  
  for (let i = 1; i <= 8; i++) {
    allScores[`class${i}`] = generateScoreDataForClass(i);
  }
  
  return allScores;
};

export const getScoreDataByClassId = (classId: number): StudentScore[] => {
  if (classId < 1 || classId > 8) {
    return [];
  }
  return generateScoreDataForClass(classId);
};


