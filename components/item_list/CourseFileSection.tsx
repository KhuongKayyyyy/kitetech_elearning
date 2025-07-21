import React, { useState } from "react";
import { FakeData } from "@/app/data/FakeData";
import CourseFileItem from "../item/CourseFileItem";
import { FileText, Upload, Image, Video, File } from "lucide-react";
import AddMaterialItem from "../ui/AddMaterialItem";
import { ClassAssignmentEnum } from "@/app/data/enum/ClassAssignmentEnum";

type FileCategory = "all" | "images" | "videos" | "files";

export default function CourseFileSection() {
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FileCategory>("all");

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

  // Categorize files
  const images = courseFiles.filter((file) => file.type === "image");
  const videos = courseFiles.filter((file) => file.type === "video");
  const files = courseFiles.filter(
    (file) => !["image", "video"].includes(file.type)
  );

  // Get filtered files based on selected category
  const getFilteredFiles = () => {
    switch (selectedCategory) {
      case "images":
        return images;
      case "videos":
        return videos;
      case "files":
        return files;
      default:
        return courseFiles;
    }
  };

  const filteredFiles = getFilteredFiles();

  const handleViewFile = (file: any) => {
    console.log("Viewing file:", file);
    // TODO: Implement file viewer
  };

  const handleDownloadFile = (file: any) => {
    console.log("Downloading file:", file);
    // TODO: Implement file download
  };

  const categories = [
    {
      id: "all" as FileCategory,
      label: "All",
      count: courseFiles.length,
      icon: <FileText className='h-4 w-4' />,
    },
    {
      id: "images" as FileCategory,
      label: "Images",
      count: images.length,
      icon: <Image className='h-4 w-4' />,
    },
    {
      id: "videos" as FileCategory,
      label: "Videos",
      count: videos.length,
      icon: <Video className='h-4 w-4' />,
    },
    {
      id: "files" as FileCategory,
      label: "Files",
      count: files.length,
      icon: <File className='h-4 w-4' />,
    },
  ];

  return (
    <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-white dark:bg-neutral-800 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm'>
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
              className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm'>
              <Upload className='h-4 w-4' />
              Upload File
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className='px-6 py-4 border-b border-neutral-200 dark:border-neutral-700'>
        <div className='overflow-x-auto scrollbar-hide'>
          <div className='flex gap-2 min-w-max'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap border ${
                  selectedCategory === category.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 shadow-sm"
                    : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600"
                }`}>
                {category.icon}
                <span>{category.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                      : "bg-neutral-100 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400"
                  }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className='max-h-96 overflow-y-auto'>
        {filteredFiles.length > 0 ? (
          <div className='bg-white dark:bg-neutral-800'>
            {filteredFiles.map((file, index) => (
              <div
                key={file.id}
                className={`${
                  index !== filteredFiles.length - 1
                    ? "border-b border-neutral-100 dark:border-neutral-700"
                    : ""
                }`}>
                <CourseFileItem
                  file={file}
                  onView={handleViewFile}
                  onDownload={handleDownloadFile}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 px-6'>
            <FileText className='h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-3' />
            <h4 className='text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2'>
              {selectedCategory === "all"
                ? "No files uploaded yet"
                : `No ${selectedCategory} uploaded yet`}
            </h4>
            <p className='text-sm text-neutral-400 dark:text-neutral-500'>
              {selectedCategory === "all"
                ? "Course files will appear here once uploaded"
                : `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } will appear here once uploaded`}
            </p>
          </div>
        )}
      </div>

      <AddMaterialItem
        open={isUploadFileModalOpen}
        onOpenChange={setIsUploadFileModalOpen}
        onSave={handleViewFile}
        type={ClassAssignmentEnum.DOCUMENT}
      />
    </div>
  );
}
