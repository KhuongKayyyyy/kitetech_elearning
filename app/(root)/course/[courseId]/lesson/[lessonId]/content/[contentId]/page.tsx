"use client";
import React from "react";
import {
  FileText,
  Link,
  Video,
  Image,
  Megaphone,
  Upload,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import MarkdownIt from "markdown-it";
import { FakeData } from "@/app/data/FakeData";
import NextLink from "next/link";

// Initialize markdown-it with proper configuration
const md = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
});

interface PageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
    contentId: string;
  }>;
}

const getIconForType = (type: string, size = "h-6 w-6") => {
  switch (type.toLowerCase()) {
    case "link":
      return <Link className={`${size} text-blue-500`} />;
    case "video":
      return <Video className={`${size} text-red-500`} />;
    case "image":
      return <Image className={`${size} text-green-500`} />;
    case "announcement":
      return <Megaphone className={`${size} text-orange-500`} />;
    case "submission":
      return <Upload className={`${size} text-purple-500`} />;
    default:
      return <FileText className={`${size} text-gray-500`} />;
  }
};

export default function page({ params }: PageProps) {
  const resolvedParams = React.use(params);

  // Get real material data based on the contentId
  const classSectionMaterials = FakeData.getClassSectionMaterial();
  const material = classSectionMaterials.find(
    (m) => m.id === parseInt(resolvedParams.contentId)
  );

  // Find current material index and get previous/next materials
  const currentMaterialIndex = classSectionMaterials.findIndex(
    (m) => m.id === parseInt(resolvedParams.contentId)
  );
  const previousMaterial =
    currentMaterialIndex > 0
      ? classSectionMaterials[currentMaterialIndex - 1]
      : null;
  const nextMaterial =
    currentMaterialIndex < classSectionMaterials.length - 1
      ? classSectionMaterials[currentMaterialIndex + 1]
      : null;

  if (!material) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6'>
        <div className='text-center bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg p-12 max-w-md w-full'>
          <div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center'>
            <FileText className='h-10 w-10 text-red-500' />
          </div>
          <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3'>
            Material not found
          </h1>
          <p className='text-neutral-500 dark:text-neutral-400 leading-relaxed'>
            The requested material could not be found. Please check the URL or
            contact support.
          </p>
        </div>
      </div>
    );
  }

  const handleLinkClick = () => {
    if (material.type === "link" && material.content.startsWith("http")) {
      window.open(material.content, "_blank");
    }
  };

  const isMarkdownType =
    material.type === "announcement" || material.type === "submission";

  // Parse markdown and sanitize with error handling
  const parsedContent = React.useMemo(() => {
    if (!isMarkdownType || !material.content) return "";

    try {
      const rendered = md.render(material.content);
      return DOMPurify.sanitize(rendered);
    } catch (error) {
      console.error("Error parsing markdown:", error);
      return "";
    }
  }, [isMarkdownType, material.content]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Material Card */}
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
          {/* Material Header */}
          <div className='p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-700'>
            <div className='flex items-start gap-5'>
              <div className='flex-shrink-0 mt-1 p-3 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-xl border border-neutral-200 dark:border-neutral-600 hover:scale-105 transition-transform duration-200'>
                {getIconForType(material.type, "h-8 w-8")}
              </div>
              <div className='flex-1 min-w-0'>
                <h1 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 leading-tight'>
                  {material.material}
                </h1>
                <div className='flex items-center gap-4 flex-wrap'>
                  <span className='inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-sm transition-all duration-200'>
                    {material.type}
                  </span>
                  {material.type === "link" && (
                    <button
                      onClick={handleLinkClick}
                      className='inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 border border-blue-200 dark:border-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm'>
                      <ExternalLink className='h-4 w-4' />
                      Open Link
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Material Content */}
          <div className='p-6 sm:p-8'>
            {material.type === "link" ? (
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                    Link URL
                  </h3>
                  <div className='p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-sm transition-all duration-200'>
                    <a
                      href={material.content}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 break-all transition-colors text-sm sm:text-base'>
                      {material.content}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleLinkClick}
                  className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'>
                  <ExternalLink className='h-5 w-5' />
                  Visit Link
                </button>
              </div>
            ) : isMarkdownType ? (
              <div>
                <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-5'>
                  Content
                </h3>
                {parsedContent ? (
                  <div className='p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-sm transition-all duration-200'>
                    <div
                      className='prose prose-neutral max-w-none dark:prose-invert prose-lg'
                      dangerouslySetInnerHTML={{ __html: parsedContent }}
                    />
                  </div>
                ) : (
                  <p className='text-neutral-500 dark:text-neutral-400 italic p-4'>
                    No content provided
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                  Content
                </h3>
                <div className='p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-sm transition-all duration-200'>
                  <p className='text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed'>
                    {material.content || "No content provided"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submission Section - Only show for submission type materials */}
          {material.type === "submission" && (
            <div className='mx-6 sm:mx-8 mb-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 sm:p-8 hover:shadow-md transition-all duration-300'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-xl border border-blue-200 dark:border-blue-600 hover:scale-105 transition-transform duration-200'>
                  <Upload className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
                <h3 className='text-xl font-bold text-blue-900 dark:text-blue-100'>
                  Submission Status
                </h3>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                <div className='bg-white dark:bg-neutral-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200 transform hover:scale-105'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>
                      Submission Status
                    </span>
                    <span className='inline-flex items-center px-3 py-1.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800'>
                      No Submission
                    </span>
                  </div>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                    You have not submitted anything yet.
                  </p>
                </div>

                <div className='bg-white dark:bg-neutral-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200 transform hover:scale-105'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>
                      Grading Status
                    </span>
                    <span className='inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700'>
                      Not Graded
                    </span>
                  </div>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                    Assignment not yet graded.
                  </p>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Due Date
                    </label>
                    <div className='flex flex-col gap-2'>
                      <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                        Sunday, 14 October 2024, 1:59 AM
                      </span>
                      <span className='inline-flex items-center px-3 py-1.5 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800 w-fit'>
                        Assignment is overdue by 3 days 2h 0m
                      </span>
                    </div>
                  </div>

                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Time Remaining
                    </label>
                    <div className='text-sm text-red-600 dark:text-red-400 font-medium'>
                      Assignment is overdue by 3 days 2h 0m
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Last Modified
                    </label>
                    <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                      -
                    </div>
                  </div>

                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Submission Comments
                    </label>
                    <div className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer font-medium'>
                      • Comments (0)
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 pt-6 border-t border-blue-200 dark:border-blue-700'>
                <button className='w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'>
                  <Upload className='h-5 w-5' />
                  Add Submission
                </button>
              </div>
            </div>
          )}

          {/* Navigation Section */}
          <div className='flex items-center justify-between p-6 sm:p-8 border-t border-neutral-200 dark:border-neutral-700 gap-4'>
            <div className='flex-1'>
              {previousMaterial ? (
                <NextLink
                  href={`/course/${resolvedParams.courseId}/lesson/${resolvedParams.lessonId}/content/${previousMaterial.id}`}
                  className='group inline-flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 dark:hover:from-neutral-600 dark:hover:to-neutral-500 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-md transform hover:scale-105'>
                  <div className='p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors shadow-sm'>
                    <ChevronLeft className='h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200' />
                  </div>
                  <div className='flex flex-col min-w-0'>
                    <span className='text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1'>
                      Previous Material
                    </span>
                    <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors truncate'>
                      {previousMaterial.material}
                    </span>
                  </div>
                </NextLink>
              ) : (
                <div className='opacity-50 cursor-not-allowed'>
                  <div className='inline-flex items-center gap-4 px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm'>
                    <div className='p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600 shadow-sm'>
                      <ChevronLeft className='h-5 w-5 text-neutral-400' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1'>
                        Previous Material
                      </span>
                      <span className='font-semibold text-neutral-400'>
                        No previous material
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='flex-1 flex justify-end'>
              {nextMaterial ? (
                <NextLink
                  href={`/course/${resolvedParams.courseId}/lesson/${resolvedParams.lessonId}/content/${nextMaterial.id}`}
                  className='group inline-flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 dark:hover:from-neutral-600 dark:hover:to-neutral-500 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-md transform hover:scale-105'>
                  <div className='flex flex-col text-right min-w-0'>
                    <span className='text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1'>
                      Next Material
                    </span>
                    <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors truncate'>
                      {nextMaterial.material}
                    </span>
                  </div>
                  <div className='p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors shadow-sm'>
                    <ChevronRight className='h-5 w-5 group-hover:translate-x-1 transition-transform duration-200' />
                  </div>
                </NextLink>
              ) : (
                <div className='opacity-50 cursor-not-allowed'>
                  <div className='inline-flex items-center gap-4 px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm'>
                    <div className='flex flex-col text-right'>
                      <span className='text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1'>
                        Next Material
                      </span>
                      <span className='font-semibold text-neutral-400'>
                        No next material
                      </span>
                    </div>
                    <div className='p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600 shadow-sm'>
                      <ChevronRight className='h-5 w-5 text-neutral-400' />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
