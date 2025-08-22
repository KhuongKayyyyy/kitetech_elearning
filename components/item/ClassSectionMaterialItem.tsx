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
} from "lucide-react";
import markdownit from "markdown-it";
import DOMPurify from "isomorphic-dompurify";
import router, { useRouter } from "next/navigation";
import { FakeData } from "@/app/data/FakeData";

const md = markdownit();

interface ClassSectionMaterialItemProps {
  material: ClassSectionMaterialModel;
  isExpanded?: boolean;
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case "link":
      return <Link className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500' />;
    case "video":
      return <Video className='h-4 w-4 sm:h-5 sm:w-5 text-red-500' />;
    case "image":
      return <Image className='h-4 w-4 sm:h-5 sm:w-5 text-green-500' />;
    case "announcement":
      return <Megaphone className='h-4 w-4 sm:h-5 sm:w-5 text-orange-500' />;
    case "submission":
      return <Upload className='h-4 w-4 sm:h-5 sm:w-5 text-purple-500' />;
    default:
      return <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500' />;
  }
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

  const handleTitleClick = () => {
    // Handle navigation to detail page
    router.push(
      `/course/${courseId}/lesson/${material.classSectionId}/content/${material.id}`
    );
  };

  const handleLinkClick = () => {
    if (material.type === "link" && material.content.startsWith("http")) {
      window.open(material.content, "_blank");
    }
  };

  const handleItemClick = () => {
    if (material.type === "link") {
      handleLinkClick();
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
    material.type === "announcement" || material.type === "submission";

  // Parse markdown and sanitize
  const parsedContent = isMarkdownType
    ? DOMPurify.sanitize(md.render(material.content || ""))
    : "";

  return (
    <div
      className={`mx-2 sm:mx-5 group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 sm:p-4 hover:border-black hover:border-3 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 ${
        material.type === "link" ? "cursor-pointer" : ""
      }`}>
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
              material.type === "link"
                ? ""
                : "cursor-pointer hover:text-primary"
            }`}
            onClick={material.type === "link" ? undefined : handleTitleClick}>
            {material.material}
          </h3>
          <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 sm:mt-2'>
            <span className='inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded w-fit'>
              {material.type}
            </span>
            {material.type === "link" && (
              <span className='text-xs text-neutral-500 dark:text-neutral-400 truncate block sm:inline'>
                {material.content}
              </span>
            )}
          </div>
        </div>

        {isMarkdownType && propIsExpanded === undefined && (
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
    </div>
  );
}
