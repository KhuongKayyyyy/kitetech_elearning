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
    <div className='group px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200'>
      <div className='flex flex-col gap-3'>
        {/* File Info */}
        <div className='flex items-center gap-4 flex-1 min-w-0'>
          {/* File Icon */}
          <div className='flex-shrink-0 p-2 bg-neutral-50 dark:bg-neutral-700 rounded-lg'>
            {getFileIcon(file.type)}
          </div>

          {/* File Details */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-3 mb-1'>
              <h4 className='text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate'>
                {file.name}
              </h4>
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${getFileTypeColor(
                  file.type
                )}`}>
                {file.type.toUpperCase()}
              </span>
            </div>

            <div className='flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400'>
              <span>{file.size}</span>
              <span>Uploaded {file.uploadDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 justify-end'>
          {onView && (
            <button
              onClick={() => onView(file)}
              className='p-2 text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200'
              title='View file'>
              <Eye className='h-4 w-4' />
            </button>
          )}

          {file.url && (
            <a
              href={file.url}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-200'
              title='Open in new tab'>
              <ExternalLink className='h-4 w-4' />
            </a>
          )}

          {onDownload && (
            <button
              onClick={() => onDownload(file)}
              className='p-2 text-neutral-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200'
              title='Download file'>
              <Download className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
