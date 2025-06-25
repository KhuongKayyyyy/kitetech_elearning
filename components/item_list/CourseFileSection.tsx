import React, { useState } from "react";
import { FakeData } from "@/app/data/FakeData";
import CourseFileItem from "../item/CourseFileItem";
import { FileText, Upload } from "lucide-react";
import AddMaterialItem from "../ui/AddMaterialItem";
import { ClassAssignmentEnum } from "@/app/data/enum/ClassAssignmentEnum";

export default function CourseFileSection() {
  // Get fake course files data

  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const courseFiles = [
    {
      id: 1,
      name: "Course Syllabus.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      url: "#",
    },
    {
      id: 2,
      name: "Lecture Notes - Week 1.docx",
      type: "document",
      size: "1.8 MB",
      uploadDate: "2024-01-16",
      url: "#",
    },
    {
      id: 3,
      name: "Assignment Template.pdf",
      type: "pdf",
      size: "856 KB",
      uploadDate: "2024-01-17",
      url: "#",
    },
    {
      id: 4,
      name: "Introduction Video.mp4",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-18",
      url: "#",
    },
    {
      id: 5,
      name: "Sample Code.zip",
      type: "archive",
      size: "3.7 MB",
      uploadDate: "2024-01-19",
      url: "#",
    },
    {
      id: 6,
      name: "Diagram Examples.png",
      type: "image",
      size: "1.2 MB",
      uploadDate: "2024-01-20",
      url: "#",
    },
  ];

  const handleViewFile = (file: any) => {
    console.log("Viewing file:", file);
    // TODO: Implement file viewer
  };

  const handleDownloadFile = (file: any) => {
    console.log("Downloading file:", file);
    // TODO: Implement file download
  };

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700'>
            <FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
              Course Files
            </h3>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              {courseFiles.length} files available
            </p>
          </div>
        </div>

        {FakeData.getCurrentUserRole() === "teacher" && (
          <button
            onClick={() => setIsUploadFileModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200'>
            <Upload className='h-4 w-4' />
            Upload File
          </button>
        )}
      </div>

      {/* Files List */}
      <div className='space-y-3'>
        {courseFiles.map((file) => (
          <CourseFileItem
            key={file.id}
            file={file}
            onView={handleViewFile}
            onDownload={handleDownloadFile}
          />
        ))}
      </div>

      {courseFiles.length === 0 && (
        <div className='text-center py-8'>
          <FileText className='h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-3' />
          <h4 className='text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2'>
            No files uploaded yet
          </h4>
          <p className='text-sm text-neutral-400 dark:text-neutral-500'>
            Course files will appear here once uploaded
          </p>
        </div>
      )}
      <AddMaterialItem
        open={isUploadFileModalOpen}
        onOpenChange={setIsUploadFileModalOpen}
        onSave={handleViewFile}
        type={ClassAssignmentEnum.DOCUMENT}
      />
    </div>
  );
}
