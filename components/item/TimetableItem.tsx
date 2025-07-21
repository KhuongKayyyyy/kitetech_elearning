import { FakeData } from "@/app/data/FakeData";
import { useRouter } from "next/navigation";
import React from "react";

interface TimetableItemProps {
  className?: string;
  courseCode?: string;
  room?: string;
  period?: string;
  week?: string;
  group?: string;
  isBreakTime?: boolean;
}

export default function TimetableItem({
  className = "Nhập môn xử lý ngôn ngữ tự nhiên | Introduction to Natural Language Processing",
  courseCode = "1",
  room = "D0201-A",
  period = "456",
  week = "-234--7890-23456-890",
  group = "5",
  isBreakTime = false,
}: TimetableItemProps) {
  if (isBreakTime) {
    return (
      <div className='bg-orange-200 dark:bg-orange-800 p-3 rounded-lg border border-orange-300 dark:border-orange-700 h-24 flex items-center justify-center hover:bg-orange-300 dark:hover:bg-orange-700 hover:scale-105 transition-all duration-200 cursor-pointer'>
        <span className='text-orange-800 dark:text-orange-200 font-medium text-sm'>
          Break Time (12:00 - 13:00)
        </span>
      </div>
    );
  }
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/course/${courseCode}`);
      }}
      className=' bg-olive-500 text-white p-2 rounded-lg shadow-sm h-32 flex flex-col justify-between text-xs leading-tight hover:shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-200 cursor-pointer'
      style={{ backgroundColor: "#8B966D" }}>
      <div className='space-y-1'>
        <div className='font-extrabold text-center'>{className}</div>
        <div className='font-semibold text-center'>
          {" "}
          Course Code: {courseCode}
        </div>
      </div>
      <div className='space-y-1 text-center'>
        <div>(Phòng:|Room: {room})</div>
      </div>
    </div>
  );
}
