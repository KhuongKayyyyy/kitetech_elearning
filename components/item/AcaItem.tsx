import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Calendar, Check, Clock, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { AcademicYearModel } from "@/app/data/model/AcademicYearModel";

interface AcademicYearItemProps {
  academicYear: AcademicYearModel;
}

export default function AcademicYearItem({
  academicYear,
}: AcademicYearItemProps) {
  const router = useRouter();
  const isActive = academicYear.status === "Active";

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card
              className={`${
                isActive ? "border-primary" : ""
              } hover:shadow-md transition-shadow`}>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg font-semibold'>
                    {academicYear.year}
                  </CardTitle>
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className='animate-pulse'>
                    {isActive ? (
                      <Check className='mr-1 h-3 w-3' />
                    ) : (
                      <Clock className='mr-1 h-3 w-3' />
                    )}
                    {academicYear.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {format(new Date(academicYear.start_date), "MMM d, yyyy")} -{" "}
                    {format(new Date(academicYear.end_date), "MMM d, yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className='p-4 max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 border-b pb-3'>
                <GraduationCap className='h-6 w-6 text-primary' />
                <span className='text-lg font-semibold'>
                  Semesters Overview
                </span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
