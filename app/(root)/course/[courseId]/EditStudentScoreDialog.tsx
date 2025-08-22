"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentScore } from "@/app/data/api/score_data";

interface EditStudentScoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentScore | null;
  onSave: (updatedStudent: StudentScore) => void;
}

export function EditStudentScoreDialog({
  isOpen,
  onClose,
  student,
  onSave,
}: EditStudentScoreDialogProps) {
  const [scores, setScores] = useState({
    qt1: "",
    qt2: "",
    midterm: "",
    finalTerm: "",
  });

  useEffect(() => {
    if (student) {
      setScores({
        qt1: student.qt1?.toString() || "",
        qt2: student.qt2?.toString() || "",
        midterm: student.midterm?.toString() || "",
        finalTerm: student.finalTerm?.toString() || "",
      });
    }
  }, [student]);

  const calculateAverageAndGrade = (
    qt1: number,
    qt2: number,
    midterm: number,
    finalTerm: number
  ) => {
    const scoresArray = [qt1, qt2, midterm, finalTerm];
    const average =
      Math.round(
        (scoresArray.reduce((sum, score) => sum + score, 0) /
          scoresArray.length) *
          10
      ) / 10;

    let grade = "N/A";
    if (average >= 9) grade = "A";
    else if (average >= 8) grade = "B";
    else if (average >= 7) grade = "C";
    else if (average >= 6) grade = "D";
    else grade = "F";

    return { average, grade };
  };

  const handleSave = () => {
    if (!student) return;

    const qt1 = parseFloat(scores.qt1) || 0;
    const qt2 = parseFloat(scores.qt2) || 0;
    const midterm = parseFloat(scores.midterm) || 0;
    const finalTerm = parseFloat(scores.finalTerm) || 0;

    const { average, grade } = calculateAverageAndGrade(
      qt1,
      qt2,
      midterm,
      finalTerm
    );

    const updatedStudent: StudentScore = {
      ...student,
      qt1,
      qt2,
      midterm,
      finalTerm,
      average,
      grade,
    };

    onSave(updatedStudent);
    onClose();
  };

  const handleScoreChange = (field: keyof typeof scores, value: string) => {
    // Allow empty string or valid numbers (including decimals)
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      // Validate score is between 0 and 10
      if (value === "" || (numValue >= 0 && numValue <= 10)) {
        setScores((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Student Score</DialogTitle>
          <DialogDescription>
            Update scores for {student?.studentName}. Scores should be between 0
            and 10.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='qt1' className='text-right'>
              Quiz 1
            </Label>
            <Input
              id='qt1'
              value={scores.qt1}
              onChange={(e) => handleScoreChange("qt1", e.target.value)}
              className='col-span-3'
              placeholder='0-10'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='qt2' className='text-right'>
              Quiz 2
            </Label>
            <Input
              id='qt2'
              value={scores.qt2}
              onChange={(e) => handleScoreChange("qt2", e.target.value)}
              className='col-span-3'
              placeholder='0-10'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='midterm' className='text-right'>
              Midterm
            </Label>
            <Input
              id='midterm'
              value={scores.midterm}
              onChange={(e) => handleScoreChange("midterm", e.target.value)}
              className='col-span-3'
              placeholder='0-10'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='finalTerm' className='text-right'>
              Final
            </Label>
            <Input
              id='finalTerm'
              value={scores.finalTerm}
              onChange={(e) => handleScoreChange("finalTerm", e.target.value)}
              className='col-span-3'
              placeholder='0-10'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
