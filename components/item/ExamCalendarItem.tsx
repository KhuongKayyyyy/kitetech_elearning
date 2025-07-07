import React from "react";
import { ExaminationModel } from "@/app/data/model/ExaminationModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, BookOpen, Timer } from "lucide-react";

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
    <Card className='w-full max-w-64 bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-blue-500 hover:to-blue-700 cursor-pointer transform'>
      <CardHeader className='pb-2'>
        <div className='text-center'>
          <CardTitle className='text-sm font-bold mb-1 leading-tight'>
            {examination.name}
          </CardTitle>
          <div className='text-xs opacity-90 mb-1'>
            {examination.class.code}
          </div>
          <div className='text-xs opacity-85 leading-tight'>
            ({examination.class.name})
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-0 space-y-2 text-xs'>
        <div className='border-t border-blue-300 pt-2'>
          <div className='grid grid-cols-2 gap-1 text-center'>
            <div>
              <div className='opacity-80'>Nhóm|Group:</div>
              <div className='font-bold'>01</div>
            </div>
            <div>
              <div className='opacity-80'>Tổ|Sub-group:</div>
              <div className='font-bold'>002</div>
            </div>
          </div>
        </div>

        <div className='space-y-1'>
          <div className='flex justify-between items-center'>
            <span className='opacity-80'>Ngày thi|Date:</span>
            <span className='font-medium'>{formatDate(examination.date)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='opacity-80'>Giờ thi|Time:</span>
            <span className='font-medium'>{formatTime(examination.time)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='opacity-80'>Phòng|Room:</span>
            <span className='font-medium'>{examination.location}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='opacity-80'>Thời lượng|Duration:</span>
            <span className='font-medium'>
              {formatDuration(examination.duration)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
