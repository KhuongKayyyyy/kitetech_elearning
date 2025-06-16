import React from "react";
import { FakeData } from "@/app/data/FakeData";
import ClassSectionItem from "../item/ClassSectionItem";

export default function ClassSectionList() {
  const classSections = FakeData.getClassSections();
  return (
    <div className='flex flex-col gap-4'>
      {classSections.map((classSection) => (
        <ClassSectionItem key={classSection.id} classSection={classSection} />
      ))}
    </div>
  );
}
