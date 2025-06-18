import React from "react";
import ClassSectionItem from "../item/ClassSectionItem";
interface ClassSectionListProps {
  classSections: Array<ClassSectionModel>;
}

export default function ClassSectionList({
  classSections,
}: ClassSectionListProps) {
  return (
    <div className='flex flex-col gap-4'>
      {classSections.map((classSection) => (
        <ClassSectionItem key={classSection.id} classSection={classSection} />
      ))}
    </div>
  );
}
