import React from "react";
import { FakeData } from "@/app/data/FakeData";
interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: CoursePageProps) {
  // fake data
  const course = FakeData.getCourses().find(
    (c) => c.id === parseInt(params.id)
  );

  return <div>{course?.name}</div>;
}
