import React, { useState } from "react";
import {
  FileText,
  Link,
  Video,
  Image,
  Megaphone,
  Upload,
  ChevronDown,
  ChevronUp,
  Check,
  Download,
  File,
} from "lucide-react";
import markdownit from "markdown-it";
import DOMPurify from "isomorphic-dompurify";
import router, { useRouter } from "next/navigation";
import { FakeData } from "@/app/data/FakeData";
import { CourseData } from "@/app/data/api/course_data";
import { ClassAssignmentEnum } from "@/app/data/enum/ClassAssignmentEnum";

const md = markdownit();

interface ClassSectionMaterialItemProps {
  material: ClassSectionMaterialModel;
  isExpanded?: boolean;
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case ClassAssignmentEnum.LINK:
      return <Link className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500' />;
    case "video":
      return <Video className='h-4 w-4 sm:h-5 sm:w-5 text-red-500' />;
    case "image":
      return <Image className='h-4 w-4 sm:h-5 sm:w-5 text-green-500' />;
    case ClassAssignmentEnum.ANNOUNCEMENT:
      return <Megaphone className='h-4 w-4 sm:h-5 sm:w-5 text-orange-500' />;
    case ClassAssignmentEnum.SUBMISSION:
      return <Upload className='h-4 w-4 sm:h-5 sm:w-5 text-purple-500' />;
    case ClassAssignmentEnum.DOCUMENT:
      return <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-indigo-500' />;
    default:
      return <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500' />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toUpperCase() || "";
};

export default function ClassSectionMaterialItem({
  material,
  isExpanded: propIsExpanded,
}: ClassSectionMaterialItemProps) {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const isExpanded =
    propIsExpanded !== undefined ? propIsExpanded : internalIsExpanded;
  const router = useRouter();
  const courseId = CourseData.getCourses()[0].id;
  const currentUserRole = FakeData.getCurrentUserRole();

  // Parse file information if it exists
  let fileInfo = null;
  try {
    if (material.files) {
      fileInfo = JSON.parse(material.files);
    }
  } catch (error) {
    console.error("Error parsing file information:", error);
  }

  const handleTitleClick = () => {
    // Handle navigation to detail page
    router.push(
      `/course/${courseId}/lesson/${material.classSectionId}/content/${material.id}`
    );
  };

  const handleLinkClick = () => {
    if (
      material.type === ClassAssignmentEnum.LINK &&
      material.content.startsWith("http")
    ) {
      window.open(material.content, "_blank");
    }
  };

  const handleFileDownload = () => {
    if (fileInfo?.fileUrl) {
      window.open(fileInfo.fileUrl, "_blank");
    }
  };

  const handleItemClick = () => {
    if (material.type === ClassAssignmentEnum.LINK) {
      handleLinkClick();
    } else if (material.type === ClassAssignmentEnum.DOCUMENT && fileInfo) {
      handleFileDownload();
    } else {
      handleTitleClick();
    }
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (propIsExpanded === undefined) {
      setInternalIsExpanded(!internalIsExpanded);
    }
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  const isMarkdownType =
    material.type === ClassAssignmentEnum.ANNOUNCEMENT ||
    material.type === ClassAssignmentEnum.SUBMISSION;

  const hasFileAttachment = fileInfo && fileInfo.originalName;

  // Parse markdown and sanitize
  const parsedContent = isMarkdownType
    ? DOMPurify.sanitize(md.render(material.content || ""))
    : "";

  return (
    <div
      className={`mx-2 sm:mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 sm:p-4 hover:border-black hover:border-3 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 ${
        material.type === ClassAssignmentEnum.LINK ||
        (material.type === ClassAssignmentEnum.DOCUMENT && hasFileAttachment)
          ? "cursor-pointer"
          : ""
      }`}
      onClick={
        material.type === ClassAssignmentEnum.LINK ||
        (material.type === ClassAssignmentEnum.DOCUMENT && hasFileAttachment)
          ? handleItemClick
          : undefined
      }>
      <div className='flex items-start sm:items-center gap-2 sm:gap-3'>
        {currentUserRole === "student" && (
          <div className='flex-shrink-0 mt-0.5 sm:mt-0'>
            <button
              onClick={handleCheckboxChange}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                isCompleted
                  ? "bg-primary border-primary text-white"
                  : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
              }`}>
              {isCompleted && <Check className='h-3 w-3' />}
            </button>
          </div>
        )}
        <div className='flex-shrink-0 mt-0.5 sm:mt-0'>
          {getIconForType(material.type)}
        </div>
        <div className='flex-1 min-w-0'>
          <h3
            className={`text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 sm:truncate transition-colors ${
              material.type === ClassAssignmentEnum.LINK ||
              (material.type === ClassAssignmentEnum.DOCUMENT &&
                hasFileAttachment)
                ? ""
                : "cursor-pointer hover:text-primary"
            }`}
            onClick={
              material.type === ClassAssignmentEnum.LINK ||
              (material.type === ClassAssignmentEnum.DOCUMENT &&
                hasFileAttachment)
                ? undefined
                : handleTitleClick
            }>
            {material.material}
          </h3>
          <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 sm:mt-2'>
            <span className='inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded w-fit'>
              {material.type}
            </span>
            {material.type === ClassAssignmentEnum.LINK && (
              <span className='text-xs text-neutral-500 dark:text-neutral-400 truncate block sm:inline'>
                {material.content}
              </span>
            )}
            {material.deadline && (
              <span className='text-xs text-red-500 dark:text-red-400'>
                Due: {new Date(material.deadline).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* File information display for all types that have files */}
          {hasFileAttachment && (
            <div className='mt-2 p-2 bg-neutral-50 dark:bg-neutral-700/50 rounded border border-neutral-200 dark:border-neutral-600'>
              <div className='flex items-center gap-2'>
                <File className='h-4 w-4 text-neutral-500' />
                <div className='flex-1 min-w-0'>
                  <p className='text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate'>
                    {fileInfo.originalName}
                  </p>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                      {getFileExtension(fileInfo.originalName)}
                    </span>
                    <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                      {formatFileSize(fileInfo.fileSize)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileDownload();
                  }}
                  className='p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded transition-colors'>
                  <Download className='h-4 w-4 text-neutral-500' />
                </button>
              </div>
            </div>
          )}
        </div>

        {(isMarkdownType || hasFileAttachment) &&
          propIsExpanded === undefined && (
            <button
              onClick={toggleExpanded}
              className='flex-shrink-0 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors'>
              {isExpanded ? (
                <ChevronUp className='h-4 w-4 text-neutral-500' />
              ) : (
                <ChevronDown className='h-4 w-4 text-neutral-500' />
              )}
            </button>
          )}
      </div>

      {isMarkdownType && isExpanded && (
        <div className='mt-3 sm:mt-4 transition-all duration-200'>
          {parsedContent ? (
            <div
              className='prose prose-xs sm:prose-sm max-w-none dark:prose-invert text-neutral-700 dark:text-neutral-300 overflow-hidden break-words'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className='text-xs sm:text-sm text-neutral-500 dark:text-neutral-400'>
              No content provided
            </p>
          )}
        </div>
      )}

      {hasFileAttachment &&
        isExpanded &&
        material.content &&
        material.content !== "temp" && (
          <div className='mt-3 sm:mt-4 transition-all duration-200'>
            <div className='prose prose-xs sm:prose-sm max-w-none dark:prose-invert text-neutral-700 dark:text-neutral-300'>
              <p className='text-xs sm:text-sm'>{material.content}</p>
            </div>
          </div>
        )}
    </div>
  );
}
