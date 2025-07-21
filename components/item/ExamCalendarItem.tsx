import React from "react";
import { ExaminationModel } from "@/app/data/model/ExaminationModel";
import { Calendar, Clock, MapPin, Timer } from "lucide-react";

interface ExamCalendarItemProps {
  examination: ExaminationModel;
}

export default function ExamCalendarItem({
  examination,
}: ExamCalendarItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes} phút`;
  };

  return (
    <div className='group relative w-full max-w-64 bg-white dark:bg-neutral-800 border-l-4 border-blue-500 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-5 flex flex-col gap-3'>
      {/* Exam Title & Class */}
      <div className='mb-1'>
        <div className='flex items-center gap-2 mb-1'>
          <Calendar className='w-4 h-4 text-blue-500' />
          <span className='font-semibold text-base text-neutral-900 dark:text-neutral-100 truncate'>
            {examination.name}
          </span>
        </div>
        <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400'>
          <span className='font-medium'>{examination.class.code}</span>
          <span className='opacity-60'>({examination.class.name})</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className='grid grid-cols-2 gap-2 text-xs mb-2'>
        <div className='flex flex-col items-start'>
          <span className='text-neutral-400 dark:text-neutral-500'>
            Nhóm|Group:
          </span>
          <span className='font-semibold text-neutral-700 dark:text-neutral-200'>
            01
          </span>
        </div>
        <div className='flex flex-col items-start'>
          <span className='text-neutral-400 dark:text-neutral-500'>
            Tổ|Sub-group:
          </span>
          <span className='font-semibold text-neutral-700 dark:text-neutral-200'>
            002
          </span>
        </div>
      </div>

      {/* Details */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-sm'>
          <Calendar className='w-4 h-4 text-blue-400' />
          <span className='text-neutral-500 dark:text-neutral-400'>
            Ngày thi|Date:
          </span>
          <span className='font-medium text-neutral-900 dark:text-neutral-100 ml-auto'>
            {formatDate(examination.date)}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <Clock className='w-4 h-4 text-blue-400' />
          <span className='text-neutral-500 dark:text-neutral-400'>
            Giờ thi|Time:
          </span>
          <span className='font-medium text-neutral-900 dark:text-neutral-100 ml-auto'>
            {formatTime(examination.time)}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <MapPin className='w-4 h-4 text-blue-400' />
          <span className='text-neutral-500 dark:text-neutral-400'>
            Phòng|Room:
          </span>
          <span className='font-medium text-neutral-900 dark:text-neutral-100 ml-auto'>
            {examination.location}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <Timer className='w-4 h-4 text-blue-400' />
          <span className='text-neutral-500 dark:text-neutral-400'>
            Thời lượng|Duration:
          </span>
          <span className='font-medium text-neutral-900 dark:text-neutral-100 ml-auto'>
            {formatDuration(examination.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
