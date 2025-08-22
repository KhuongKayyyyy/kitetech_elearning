"use client";

import React from "react";
import { FakeData } from "@/app/data/FakeData";
import { UserRole } from "@/app/data/enum/UserRole";
import TeacherScorePage from "./teacher_score_page";

export default function page() {
  const userRole = FakeData.getCurrentUserRole();
  if (userRole === UserRole.TEACHER) {
    return (
      <div className='p-6'>
        <TeacherScorePage />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Score</h1>
    </div>
  );
}
