import React, { useState } from "react";
import { BookOpen, Hash, Users, FileText, Plus, Edit } from "lucide-react";
import { FakeData } from "@/app/data/FakeData";
import ClassSectionMaterialItem from "./ClassSectionMaterialItem";
import { useRouter } from "next/navigation";
import ClassSectionMaterialRearrangableList from "../item_list/ClassSectionMaterialRearrangableList";
interface ClassSectionItemProps {
  classSection: ClassSectionModel;
}

export default function ClassSectionItem({
  classSection,
}: ClassSectionItemProps) {
  const classSectionMaterials = FakeData.getClassSectionMaterial();
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div className='mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <BookOpen className='h-5 w-5 text-primary' />
          </div>
          <div>
            <span
              onClick={() =>
                router.push(
                  `/course/${classSection.courseId}/lesson/${classSection.id}`
                )
              }
              className='inline-flex items-center px-3 py-1.5 text-sm font-semibold bg-primary/15 text-primary rounded-full'>
              <Hash className='h-3 w-3 mr-1.5' /> {classSection.name}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400'>
            <FileText className='h-4 w-4' />
            <span>{classSectionMaterials.length} materials</span>
          </div>
          {FakeData.getCurrentUserRole() === "teacher" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditMode(!isEditMode);
              }}
              className={`p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ${
                isEditMode
                  ? "bg-primary/10 text-primary"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
              }`}>
              <Edit className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>

      {/* Materials Section */}
      {isEditMode ? (
        <ClassSectionMaterialRearrangableList
          initialMaterials={classSectionMaterials}
          onAddMaterial={() => {
            // TODO: Implement add material functionality
            console.log("Add material clicked");
          }}
          onRemoveMaterial={(materialId) => {
            // TODO: Implement remove material functionality
            console.log("Remove material clicked", materialId);
          }}
        />
      ) : (
        <div className='space-y-3'>
          <div className='space-y-2'>
            {classSectionMaterials.map((material, index) => (
              <div
                key={material.id}
                className='animate-in slide-in-from-left duration-300'
                style={{ animationDelay: `${index * 100}ms` }}>
                <ClassSectionMaterialItem material={material} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Material Button for Teachers */}
      {FakeData.getCurrentUserRole() === "teacher" && !isEditMode && (
        <div className='mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement add material functionality
              console.log("Add material clicked");
            }}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-neutral-300 dark:border-neutral-600 hover:border-primary dark:hover:border-primary rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-all duration-200 group/add'>
            <Plus className='h-4 w-4 group-hover/add:scale-110 transition-transform duration-200' />
            <span className='font-medium'>Add Material</span>
          </button>
        </div>
      )}
    </div>
  );
}
