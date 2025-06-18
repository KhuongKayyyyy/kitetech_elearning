import React from "react";
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Download,
  ExternalLink,
  Eye,
} from "lucide-react";

interface CourseFileItemProps {
  file: {
    id: number;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    url?: string;
  };
  onView?: (file: any) => void;
  onDownload?: (file: any) => void;
}

export default function CourseFileItem({
  file,
  onView,
  onDownload,
}: CourseFileItemProps) {
  const getFileIcon = (type: string) => {
    const fileType = type.toLowerCase();

    if (fileType.includes("pdf") || fileType.includes("document")) {
      return <FileText className='h-5 w-5 text-red-500' />;
    }
    if (
      fileType.includes("image") ||
      fileType.includes("png") ||
      fileType.includes("jpg") ||
      fileType.includes("jpeg")
    ) {
      return <Image className='h-5 w-5 text-green-500' />;
    }
    if (
      fileType.includes("video") ||
      fileType.includes("mp4") ||
      fileType.includes("avi")
    ) {
      return <Video className='h-5 w-5 text-blue-500' />;
    }
    if (
      fileType.includes("audio") ||
      fileType.includes("mp3") ||
      fileType.includes("wav")
    ) {
      return <Music className='h-5 w-5 text-purple-500' />;
    }
    if (
      fileType.includes("zip") ||
      fileType.includes("rar") ||
      fileType.includes("archive")
    ) {
      return <Archive className='h-5 w-5 text-orange-500' />;
    }

    return <FileText className='h-5 w-5 text-neutral-500' />;
  };

  const getFileTypeColor = (type: string) => {
    const fileType = type.toLowerCase();

    if (fileType.includes("pdf") || fileType.includes("document")) {
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    }
    if (fileType.includes("image")) {
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    }
    if (fileType.includes("video")) {
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    }
    if (fileType.includes("audio")) {
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
    }
    if (
      fileType.includes("zip") ||
      fileType.includes("rar") ||
      fileType.includes("archive")
    ) {
      return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800";
    }

    return "bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600";
  };

  return (
    <div className='group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200'>
      <div className='flex items-start justify-between gap-3'>
        {/* File Info */}
        <div className='flex items-start gap-3 flex-1 min-w-0'>
          {/* File Icon */}
          <div className='flex-shrink-0 p-2 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600'>
            {getFileIcon(file.type)}
          </div>

          {/* File Details */}
          <div className='flex-1 min-w-0'>
            <h4 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate mb-1'>
              {file.name}
            </h4>

            <div className='flex items-center gap-2 mb-2'>
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${getFileTypeColor(
                  file.type
                )}`}>
                {file.type.toUpperCase()}
              </span>
              <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                {file.size}
              </span>
            </div>

            <p className='text-xs text-neutral-500 dark:text-neutral-400'>
              Uploaded on {file.uploadDate}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          {onView && (
            <button
              onClick={() => onView(file)}
              className='p-2 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200'
              title='View file'>
              <Eye className='h-4 w-4' />
            </button>
          )}

          {file.url && (
            <a
              href={file.url}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200'
              title='Open in new tab'>
              <ExternalLink className='h-4 w-4' />
            </a>
          )}

          {onDownload && (
            <button
              onClick={() => onDownload(file)}
              className='p-2 text-neutral-500 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200'
              title='Download file'>
              <Download className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
