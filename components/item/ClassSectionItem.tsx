import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Hash,
  Users,
  FileText,
  Plus,
  Edit,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { FakeData } from "@/app/data/FakeData";
import ClassSectionMaterialItem from "./ClassSectionMaterialItem";
import { useRouter } from "next/navigation";
import ClassSectionMaterialRearrangableList from "../item_list/ClassSectionMaterialRearrangableList";

interface ClassSectionItemProps {
  classSection: ClassSectionModel;
  onDeleteSection?: (sectionId: number) => void;
}

export default function ClassSectionItem({
  classSection,
  onDeleteSection,
}: ClassSectionItemProps) {
  const classSectionMaterials = FakeData.getClassSectionMaterial().filter(
    (material) => material.classSectionId === classSection.id
  );
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(classSection.name);
  const [isEditingName, setIsEditingName] = useState(false);

  // Add scroll effect for section jumping
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === `#section-${classSection.id}`) {
        const element = document.getElementById(`section-${classSection.id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          // Add a brief highlight effect
          element.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.3)";
          setTimeout(() => {
            element.style.boxShadow = "";
          }, 2000);
        }
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [classSection.id]);

  const handleSaveName = () => {
    // TODO: Implement save name functionality
    console.log("Save name:", editedName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setEditedName(classSection.name);
    setIsEditingName(false);
  };

  const handleDeleteSection = () => {
    if (onDeleteSection) {
      onDeleteSection(classSection.id);
    }
  };

  return (
    <div
      id={`section-${classSection.id}`}
      className='mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer scroll-mt-4'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl shadow-sm'>
            <BookOpen className='h-5 w-5 text-primary' />
          </div>
          <div>
            {isEditMode && isEditingName ? (
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className='px-4 py-2 text-sm font-semibold bg-white dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveName();
                    } else if (e.key === "Escape") {
                      handleCancelEdit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className='p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 transition-colors duration-200'>
                  <Check className='h-4 w-4' />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className='p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 transition-colors duration-200'>
                  <X className='h-4 w-4' />
                </button>
              </div>
            ) : (
              <span
                onClick={(e) => {
                  if (isEditMode) {
                    e.stopPropagation();
                    setIsEditingName(true);
                  } else {
                    router.push(
                      `/course/${classSection.courseId}/lesson/${classSection.id}`
                    );
                  }
                }}
                className={`inline-flex items-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary/15 to-primary/10 text-primary rounded-xl border border-primary/20 transition-all duration-200 ${
                  isEditMode
                    ? "cursor-text hover:from-primary/25 hover:to-primary/15 hover:shadow-sm"
                    : "cursor-pointer hover:shadow-md hover:scale-[1.02]"
                }`}>
                <Hash className='h-3 w-3 mr-2' /> {editedName}
              </span>
            )}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600'>
            <FileText className='h-4 w-4 text-neutral-500 dark:text-neutral-400' />
            <span className='text-xs font-medium text-neutral-600 dark:text-neutral-300'>
              {classSectionMaterials.length} materials
            </span>
          </div>
          {FakeData.getCurrentUserRole() === "teacher" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditMode(!isEditMode);
                  if (isEditMode) {
                    setIsEditingName(false);
                    setEditedName(classSection.name);
                  }
                }}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isEditMode
                    ? "bg-primary/15 text-primary border-2 border-primary/30 shadow-sm"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-700 border-2 border-transparent hover:border-primary/20"
                }`}>
                <Edit className='h-4 w-4' />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSection();
                }}
                className='p-2.5 rounded-xl transition-all duration-200 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-2 border-transparent hover:border-red-200 dark:hover:border-red-800'>
                <Trash2 className='h-4 w-4' />
              </button>
            </>
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
