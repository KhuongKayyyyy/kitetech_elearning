import React from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ClassworkItemProps {
  classwork: {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    status: "pending" | "submitted" | "late" | "graded";
    points?: number;
    totalPoints?: number;
    courseId: number;
    sectionId: number;
    materialId: number;
    submissionType: "file" | "text" | "quiz";
    grade?: number;
  };
}

export default function ClassworkItem({ classwork }: ClassworkItemProps) {
  const router = useRouter();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-700",
          label: "Submitted",
        };
      case "late":
        return {
          icon: AlertCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-700",
          label: "Late",
        };
      case "graded":
        return {
          icon: CheckCircle,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-700",
          label: "Graded",
        };
      default:
        return {
          icon: Clock,
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
          borderColor: "border-orange-200 dark:border-orange-700",
          label: "Pending",
        };
    }
  };

  const handleClick = () => {
    router.push(
      `/course/${classwork.courseId}/section/${classwork.sectionId}/material/${classwork.materialId}`
    );
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const statusConfig = getStatusConfig(classwork.status);
  const StatusIcon = statusConfig.icon;
  const isOverdue =
    new Date(classwork.dueDate) < new Date() && classwork.status === "pending";

  return (
    <div
      onClick={handleClick}
      className={`group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer ${
        isOverdue ? "border-red-200 dark:border-red-700/50" : ""
      }`}>
      <div className='flex items-start gap-4'>
        {/* Icon */}
        <div className='flex-shrink-0'>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/30 dark:from-primary/30 dark:to-primary/40 flex items-center justify-center border border-primary/20 dark:border-primary/30'>
            <FileText className='h-5 w-5 text-primary dark:text-primary' />
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          {/* Header */}
          <div className='flex items-start justify-between gap-3 mb-2'>
            <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200'>
              {classwork.title}
            </h4>
            <div
              className={`flex-shrink-0 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor}`}>
              <StatusIcon className='h-3 w-3 mr-1' />
              {statusConfig.label}
            </div>
          </div>

          {/* Description */}
          {classwork.description && (
            <p className='text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3'>
              {classwork.description}
            </p>
          )}

          {/* Due Date and Points */}
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-1 text-sm'>
              <Calendar className='h-3 w-3 text-neutral-500 dark:text-neutral-400' />
              <span
                className={`${
                  isOverdue
                    ? "text-red-600 dark:text-red-400 font-medium"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}>
                {formatDueDate(classwork.dueDate)}
              </span>
            </div>

            {/* Points/Grade */}
            <div className='text-sm'>
              {classwork.status === "graded" &&
              classwork.grade !== undefined ? (
                <span className='text-blue-600 dark:text-blue-400 font-medium'>
                  {classwork.grade}/{classwork.totalPoints} pts
                </span>
              ) : classwork.totalPoints ? (
                <span className='text-neutral-600 dark:text-neutral-400'>
                  {classwork.totalPoints} pts
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
