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
  Download,
  File,
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import MarkdownIt from "markdown-it";
import NextLink from "next/link";
import { classSessionService } from "@/app/data/services/classSessionService";

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
  params: {
    courseId: string;
    lessonId: string;
    contentId: string;
  };
}

const getIconForType = (type: string | undefined, size = "h-6 w-6") => {
  if (!type) return <FileText className={`${size} text-gray-500`} />;

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
    case "assignment":
      return <FileText className={`${size} text-indigo-500`} />;
    case "document":
      return <FileText className={`${size} text-blue-500`} />;
    case "quiz":
      return <FileText className={`${size} text-yellow-500`} />;
    default:
      return <FileText className={`${size} text-gray-500`} />;
  }
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes("word") || mimeType.includes("document")) {
    return <FileText className='h-5 w-5 text-blue-600' />;
  }
  if (mimeType.includes("pdf")) {
    return <FileText className='h-5 w-5 text-red-600' />;
  }
  if (mimeType.includes("image")) {
    return <Image className='h-5 w-5 text-green-600' />;
  }
  if (mimeType.includes("video")) {
    return <Video className='h-5 w-5 text-purple-600' />;
  }
  return <File className='h-5 w-5 text-gray-600' />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default async function page({ params }: PageProps) {
  const resolvedParams = await params;
  let classSections = [];
  let allMaterials = [];
  let currentSection;
  let material;

  try {
    // First, get all class sections for the course
    const courseSectionsResponse = await classSessionService.getClassesByCourse(
      resolvedParams.courseId
    );
    classSections = courseSectionsResponse || [];

    // Find the current section by lessonId
    currentSection = classSections.find(
      (section: { id: number }) =>
        section.id === parseInt(resolvedParams.lessonId)
    );

    if (currentSection) {
      // Get all materials from all sections for navigation
      classSections.forEach((section: any) => {
        if (section.materials) {
          allMaterials.push(
            ...section.materials.map((material: any) => ({
              ...material,
              sectionId: section.id,
              sectionName: section.name,
            }))
          );
        }
      });

      // Find the specific material by contentId
      material = allMaterials.find(
        (m: { id: number }) => m.id === parseInt(resolvedParams.contentId)
      );

      // Parse the files field if it exists and is a JSON string
      if (material && material.files && typeof material.files === "string") {
        try {
          const parsedFiles = JSON.parse(material.files);
          material = { ...material, fileInfo: parsedFiles };
        } catch (error) {
          console.error("Error parsing files JSON:", error);
          material = { ...material, fileInfo: null };
        }
      }
    }
  } catch (error) {
    console.error("Error fetching class sections or material:", error);
    classSections = [];
    material = null;
  }

  // Navigation logic using materials from all sections
  const currentMaterialIndex = allMaterials.findIndex(
    (m: { id: number }) => m.id === parseInt(resolvedParams.contentId)
  );
  const previousMaterial =
    currentMaterialIndex > 0 ? allMaterials[currentMaterialIndex - 1] : null;
  const nextMaterial =
    currentMaterialIndex < allMaterials.length - 1
      ? allMaterials[currentMaterialIndex + 1]
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

  const isMarkdownType =
    material.type === "announcement" || material.type === "submission";

  // Parse markdown and sanitize with error handling
  let parsedContent = "";
  if (
    isMarkdownType &&
    material.content &&
    typeof material.content === "string"
  ) {
    try {
      const rendered = md.render(material.content);
      parsedContent = DOMPurify.sanitize(rendered);
    } catch (error) {
      console.error("Error parsing markdown:", error);
      parsedContent = "";
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Course and Section Context */}
        {currentSection && (
          <div className='mb-6'>
            <nav className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4'>
              <NextLink
                href={`/course/${resolvedParams.courseId}`}
                className='hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors'>
                {currentSection.course?.name || "Course"}
              </NextLink>
              <span>/</span>
              <NextLink
                href={`/course/${resolvedParams.courseId}/lesson/${resolvedParams.lessonId}`}
                className='hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors'>
                {currentSection.name || "Class Section"}
              </NextLink>
              <span>/</span>
              <span className='text-neutral-700 dark:text-neutral-300 font-medium'>
                {material.material || "Material"}
              </span>
            </nav>
          </div>
        )}

        {/* Section Navigation */}
        {classSections.length > 1 && (
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
              All Sections
            </h3>
            <div className='flex flex-wrap gap-2'>
              {classSections.map((section: any) => (
                <NextLink
                  key={section.id}
                  href={`/course/${resolvedParams.courseId}/lesson/${section.id}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    parseInt(resolvedParams.lessonId) === section.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}>
                  {section.name}
                  {section.materials && (
                    <span className='ml-2 text-xs opacity-75'>
                      ({section.materials.length})
                    </span>
                  )}
                </NextLink>
              ))}
            </div>
          </div>
        )}

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
                  {material.material || "Untitled Material"}
                </h1>
                <div className='flex items-center gap-4 flex-wrap'>
                  <span className='inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-sm transition-all duration-200'>
                    {material.type || "Unknown"}
                  </span>
                  {material.sectionName && (
                    <span className='inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700'>
                      {material.sectionName}
                    </span>
                  )}
                  {material.createdAt && (
                    <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                      Created:{" "}
                      {new Date(material.createdAt).toLocaleDateString()}
                    </span>
                  )}
                  {material.type === "link" && (
                    <button
                      onClick={() => {
                        if (
                          material.content &&
                          material.content.startsWith("http")
                        ) {
                          window.open(material.content, "_blank");
                        }
                      }}
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
                      href={material.content || "#"}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 break-all transition-colors text-sm sm:text-base'>
                      {material.content || "No link provided"}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (
                      material.content &&
                      material.content.startsWith("http")
                    ) {
                      window.open(material.content, "_blank");
                    }
                  }}
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

            {/* File Attachments Section */}
            {material.fileInfo &&
              material.fileInfo.fileUrl &&
              material.fileInfo.originalName && (
                <div className='mt-8'>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                    Attachments
                  </h3>
                  <div className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600 p-4'>
                    <div className='flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-md transition-all duration-200'>
                      <div className='flex items-center gap-4'>
                        <div className='p-2 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 rounded-lg border border-neutral-200 dark:border-neutral-600'>
                          {getFileIcon(
                            material.fileInfo.mimeType ||
                              "application/octet-stream"
                          )}
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
                            {material.fileInfo.originalName}
                          </span>
                          <div className='flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400'>
                            <span>
                              {formatFileSize(material.fileInfo.fileSize || 0)}
                            </span>
                            {material.fileInfo.uploadedAt && (
                              <span>
                                Uploaded:{" "}
                                {new Date(
                                  material.fileInfo.uploadedAt
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (
                            material.fileInfo &&
                            material.fileInfo.fileUrl &&
                            material.fileInfo.originalName
                          ) {
                            const link = document.createElement("a");
                            link.href = material.fileInfo.fileUrl;
                            link.download = material.fileInfo.originalName;
                            link.target = "_blank";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                        }}
                        className='inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 border border-blue-200 dark:border-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm'>
                        <Download className='h-4 w-4' />
                        Download
                      </button>
                    </div>
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
                        {material.deadline && material.deadline.trim() !== ""
                          ? new Date(material.deadline).toLocaleString()
                          : "No deadline set"}
                      </span>
                      {material.deadline &&
                        material.deadline.trim() !== "" &&
                        new Date(material.deadline) < new Date() && (
                          <span className='inline-flex items-center px-3 py-1.5 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800 w-fit'>
                            Assignment is overdue
                          </span>
                        )}
                    </div>
                  </div>

                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Time Remaining
                    </label>
                    <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                      {material.deadline && material.deadline.trim() !== "" ? (
                        new Date(material.deadline) < new Date() ? (
                          <span className='text-red-600 dark:text-red-400 font-medium'>
                            Assignment is overdue
                          </span>
                        ) : (
                          <span className='text-green-600 dark:text-green-400 font-medium'>
                            Due{" "}
                            {new Date(material.deadline).toLocaleDateString()}
                          </span>
                        )
                      ) : (
                        "No deadline set"
                      )}
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='p-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg border border-blue-200 dark:border-blue-700'>
                    <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                      Last Modified
                    </label>
                    <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                      {material.updatedAt
                        ? new Date(material.updatedAt).toLocaleString()
                        : "-"}
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
                  href={`/course/${resolvedParams.courseId}/lesson/${previousMaterial.sectionId}/content/${previousMaterial.id}`}
                  className='group inline-flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 dark:hover:from-neutral-600 dark:hover:to-neutral-500 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-md transform hover:scale-105'>
                  <div className='p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors shadow-sm'>
                    <ChevronLeft className='h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200' />
                  </div>
                  <div className='flex flex-col min-w-0'>
                    <span className='text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1'>
                      Previous Material
                    </span>
                    <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors truncate'>
                      {previousMaterial.material || "Previous Material"}
                    </span>
                    {previousMaterial.sectionName && (
                      <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                        {previousMaterial.sectionName}
                      </span>
                    )}
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
                  href={`/course/${resolvedParams.courseId}/lesson/${nextMaterial.sectionId}/content/${nextMaterial.id}`}
                  className='group inline-flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 dark:hover:from-neutral-600 dark:hover:to-neutral-500 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:shadow-md transform hover:scale-105'>
                  <div className='flex flex-col text-right min-w-0'>
                    <span className='text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1'>
                      Next Material
                    </span>
                    <span className='font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors truncate'>
                      {nextMaterial.material || "Next Material"}
                    </span>
                    {nextMaterial.sectionName && (
                      <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                        {nextMaterial.sectionName}
                      </span>
                    )}
                  </div>
                  <div className='p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 group-hover:border-primary/20 transition-colors shadow-sm'>
                    <ChevronRight className='h-5 w-5 group-hover:translate-x-1 transition-transform duration-200' />
                  </div>
                </NextLink>
              ) : (
                <div className='opacity-50 cursor-not-allowed'>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
