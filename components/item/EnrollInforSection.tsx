"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { EnrollmentStatus } from "@/app/data/enum/EnrollmentStatus";
import { EnrollmentInfo } from "@/app/data/model/EnrollmentInfo";
interface EnrollInforSectionProps {
  enrollmentInfo: EnrollmentInfo;
  isEditable?: boolean;
  onSave?: (updatedInfo: EnrollmentInfo) => void;
}

export default function EnrollInforSection({
  enrollmentInfo,
  isEditable = false,
  onSave,
}: EnrollInforSectionProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState<EnrollmentInfo>(enrollmentInfo);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-200/50";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300 shadow-amber-200/50";
      case "Dropped":
        return "bg-rose-100 text-rose-800 border-rose-300 shadow-rose-200/50";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-300 shadow-blue-200/50";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 shadow-gray-200/50";
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedInfo);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedInfo(enrollmentInfo);
    setIsEditMode(false);
  };

  const handleInputChange = (
    field: keyof EnrollmentInfo,
    value: string | number
  ) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableField = (
    label: string,
    field: keyof EnrollmentInfo,
    type: "text" | "number" | "date" | "select" = "text"
  ) => {
    const value = isEditMode ? editedInfo[field] : enrollmentInfo[field];

    if (!isEditMode) {
      return (
        <div className='flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
          <span className='text-sm font-medium text-gray-600'>{label}:</span>
          <span className='text-sm font-semibold text-gray-900'>{value}</span>
        </div>
      );
    }

    if (field === "status" && type === "select") {
      return (
        <div className='space-y-2'>
          <Label htmlFor={field} className='text-sm font-medium text-gray-700'>
            {label}:
          </Label>
          <Select
            value={editedInfo.status}
            onValueChange={(value) =>
              handleInputChange(field, value as EnrollmentStatus)
            }>
            <SelectTrigger className='h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors duration-200'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EnrollmentStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div className='space-y-2'>
        <Label htmlFor={field} className='text-sm font-medium text-gray-700'>
          {label}:
        </Label>
        <Input
          id={field}
          type={type}
          value={value}
          onChange={(e) =>
            handleInputChange(
              field,
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          className='h-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors duration-200'
        />
      </div>
    );
  };

  return (
    <Card className='w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 border-0 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300'>
      <CardHeader className='bg-gradient-to-r from-slate-800 via-slate-700 to-blue-800 text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse'></div>
        <div className='relative flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg hover:bg-white/30 transition-colors duration-300'>
              <BookOpen className='w-7 h-7' />
            </div>
            <div>
              <CardTitle className='text-2xl font-bold'>
                Enrollment Information
              </CardTitle>
              <p className='text-blue-100 text-sm opacity-90'>
                Course Registration & Student Details
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Badge
              className={`px-4 py-2 text-sm font-semibold border-2 shadow-lg ${getStatusColor(
                enrollmentInfo.status
              )} hover:scale-105 transition-transform duration-200`}>
              {enrollmentInfo.status}
            </Badge>
            {isEditable && (
              <div className='flex gap-2'>
                {!isEditMode ? (
                  <Button
                    onClick={() => setIsEditMode(true)}
                    size='sm'
                    variant='outline'
                    className='bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 backdrop-blur-sm transition-all duration-200 shadow-lg'>
                    <Edit3 className='w-4 h-4 mr-2' />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      size='sm'
                      variant='outline'
                      className='bg-emerald-500/20 border-emerald-300/40 text-white hover:bg-emerald-500/30 hover:scale-105 backdrop-blur-sm transition-all duration-200 shadow-lg'>
                      <Save className='w-4 h-4 mr-2' />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      size='sm'
                      variant='outline'
                      className='bg-rose-500/20 border-rose-300/40 text-white hover:bg-rose-500/30 hover:scale-105 backdrop-blur-sm transition-all duration-200 shadow-lg'>
                      <X className='w-4 h-4 mr-2' />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Student Information */}
          <div className='space-y-6 group'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 group-hover:text-blue-700 transition-colors duration-300'>
              <div className='p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 shadow-md'>
                <User className='w-6 h-6 text-blue-600' />
              </div>
              Student Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group-hover:bg-blue-50/30'>
              <div className='space-y-3'>
                {renderEditableField("Student ID", "studentId")}
                {renderEditableField("Full Name", "studentName")}
                {renderEditableField(
                  "Enrollment Date",
                  "enrollmentDate",
                  "date"
                )}
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className='space-y-6 group'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 group-hover:text-emerald-700 transition-colors duration-300'>
              <div className='p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 group-hover:scale-110 transition-all duration-300 shadow-md'>
                <BookOpen className='w-6 h-6 text-emerald-600' />
              </div>
              Course Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group-hover:bg-emerald-50/30'>
              <div className='space-y-3'>
                {renderEditableField("Course Code", "courseCode")}
                {renderEditableField("Course Name", "courseName")}
                {renderEditableField("Credits", "credits", "number")}
              </div>
            </div>
          </div>

          {/* Class Schedule */}
          <div className='space-y-6 group'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 group-hover:text-purple-700 transition-colors duration-300'>
              <div className='p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300 shadow-md'>
                <Clock className='w-6 h-6 text-purple-600' />
              </div>
              Class Schedule
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 group-hover:bg-purple-50/30'>
              <div className='space-y-3'>
                {renderEditableField("Schedule", "schedule")}
                {renderEditableField("Room", "room")}
                {renderEditableField("Semester", "semester")}
              </div>
            </div>
          </div>

          {/* Instructor & Status Information */}
          <div className='space-y-6 group'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 group-hover:text-amber-700 transition-colors duration-300'>
              <div className='p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300 shadow-md'>
                <Users className='w-6 h-6 text-amber-600' />
              </div>
              Additional Details
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 group-hover:bg-amber-50/30'>
              <div className='space-y-3'>
                {renderEditableField("Instructor", "instructor")}
                {isEditable &&
                  renderEditableField("Status", "status", "select")}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        {isEditMode && (
          <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
            <p className='text-sm text-blue-700 font-medium flex items-center gap-2'>
              <span className='animate-pulse'>✏️</span>
              Edit Mode Active - Make your changes and click Save to apply them.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
