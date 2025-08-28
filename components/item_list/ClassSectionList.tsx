import React from "react";
import ClassSectionItem from "../item/ClassSectionItem";

interface ClassSectionListProps {
  classSections: ClassSectionModel[];
  course?: Course;
}

export default function ClassSectionList({
  classSections,
  course,
}: ClassSectionListProps) {
  return (
    <div className='flex flex-col gap-4'>
      {classSections.map((classSection) => (
        <ClassSectionItem
          key={classSection.id}
          classSection={classSection}
          course={course}
        />
      ))}
    </div>
  );
}
