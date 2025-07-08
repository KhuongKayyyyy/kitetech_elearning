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
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  FileText,
  Building,
} from "lucide-react";
import { PersonalInfo } from "@/app/data/model/PersonalInformation";

interface PersonalInformationProps {
  personalInfo: PersonalInfo;
  isEditable?: boolean;
  onSave?: (updatedInfo: PersonalInfo) => void;
}

export default function PersonalInformation({
  personalInfo,
  isEditable = false,
  onSave,
}: PersonalInformationProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState<PersonalInfo>(personalInfo);

  const handleSave = () => {
    if (onSave) {
      onSave(editedInfo);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setIsEditMode(false);
  };

  const handleInputChange = (
    field: keyof PersonalInfo,
    value: string | number
  ) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableField = (
    label: string,
    field: keyof PersonalInfo,
    type: "text" | "number" | "email" | "tel" | "date" | "select" = "text",
    options?: string[]
  ) => {
    const value = isEditMode ? editedInfo[field] : personalInfo[field];

    if (!isEditMode) {
      return (
        <div className='flex justify-between items-center group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200'>
          <span className='text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors'>
            {label}:
          </span>
          <span className='text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors'>
            {value}
          </span>
        </div>
      );
    }

    if (type === "select" && options) {
      return (
        <div className='space-y-2'>
          <Label htmlFor={field} className='text-sm font-medium text-gray-600'>
            {label}:
          </Label>
          <Select
            value={String(editedInfo[field])}
            onValueChange={(value) => handleInputChange(field, value)}>
            <SelectTrigger className='h-8 hover:border-blue-400 transition-colors'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div className='space-y-2'>
        <Label htmlFor={field} className='text-sm font-medium text-gray-600'>
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
          className='h-8 text-sm hover:border-blue-400 focus:border-blue-500 transition-colors'
        />
      </div>
    );
  };

  return (
    <Card className='w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group'>
      <CardHeader className='bg-gradient-to-r from-slate-700 via-slate-800 to-blue-800 text-white relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-slate-600/20 animate-pulse'></div>
        <div className='flex items-center justify-between relative z-10'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110'>
              <User className='w-7 h-7' />
            </div>
            <div>
              <CardTitle className='text-2xl font-bold'>
                Personal Information
              </CardTitle>
              <p className='text-blue-100 text-sm opacity-90'>
                Student Profile & Contact Details
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm'>
              <div className='w-12 h-12 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors'>
                <User className='w-6 h-6 text-white' />
              </div>
              <div className='text-right'>
                <p className='text-sm font-semibold'>
                  {personalInfo.firstName} {personalInfo.lastName}
                </p>
                <p className='text-xs text-blue-100 opacity-90'>
                  ID: {personalInfo.studentId}
                </p>
              </div>
            </div>
            {isEditable && (
              <div className='flex gap-2'>
                {!isEditMode ? (
                  <Button
                    onClick={() => setIsEditMode(true)}
                    size='sm'
                    variant='outline'
                    className='bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 backdrop-blur-sm transition-all duration-200'>
                    <Edit3 className='w-4 h-4 mr-2' />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      size='sm'
                      variant='outline'
                      className='bg-green-500/20 border-green-300/40 text-white hover:bg-green-500/30 hover:scale-105 backdrop-blur-sm transition-all duration-200'>
                      <Save className='w-4 h-4 mr-2' />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      size='sm'
                      variant='outline'
                      className='bg-red-500/20 border-red-300/40 text-white hover:bg-red-500/30 hover:scale-105 backdrop-blur-sm transition-all duration-200'>
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
          {/* Basic Information */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 hover:text-blue-700 transition-colors duration-200'>
              <div className='p-2 bg-blue-100 rounded-lg hover:bg-blue-200 hover:scale-110 transition-all duration-200'>
                <User className='w-6 h-6 text-blue-600' />
              </div>
              Basic Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1'>
              <div className='space-y-2'>
                {renderEditableField("Student ID", "studentId")}
                {renderEditableField("First Name", "firstName")}
                {renderEditableField("Last Name", "lastName")}
                {renderEditableField("Date of Birth", "dateOfBirth", "date")}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 hover:text-green-700 transition-colors duration-200'>
              <div className='p-2 bg-green-100 rounded-lg hover:bg-green-200 hover:scale-110 transition-all duration-200'>
                <Mail className='w-6 h-6 text-green-600' />
              </div>
              Contact Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1'>
              <div className='space-y-2'>
                {renderEditableField("Email", "email", "email")}
                {renderEditableField("Phone", "phone", "tel")}
                {renderEditableField("Emergency Contact", "emergencyContact")}
                {renderEditableField(
                  "Emergency Phone",
                  "emergencyPhone",
                  "tel"
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 hover:text-purple-700 transition-colors duration-200'>
              <div className='p-2 bg-purple-100 rounded-lg hover:bg-purple-200 hover:scale-110 transition-all duration-200'>
                <MapPin className='w-6 h-6 text-purple-600' />
              </div>
              Address Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1'>
              <div className='space-y-2'>
                {renderEditableField("Address", "address")}
                {renderEditableField("City", "city")}
                {renderEditableField("State", "state")}
                {renderEditableField("ZIP Code", "zipCode")}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-3 hover:text-orange-700 transition-colors duration-200'>
              <div className='p-2 bg-orange-100 rounded-lg hover:bg-orange-200 hover:scale-110 transition-all duration-200'>
                <Building className='w-6 h-6 text-orange-600' />
              </div>
              Academic Information
            </h3>
            <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1'>
              <div className='space-y-2'>
                {renderEditableField("Major", "major")}
                {renderEditableField("Year", "year", "select", [
                  "Freshman",
                  "Sophomore",
                  "Junior",
                  "Senior",
                  "Graduate",
                ])}
                {renderEditableField("GPA", "gpa", "number")}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        {isEditMode && (
          <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-all duration-200 animate-pulse'>
            <p className='text-sm text-blue-700 font-medium flex items-center gap-2'>
              <span className='w-2 h-2 bg-blue-500 rounded-full animate-ping'></span>
              ✏️ Edit Mode Active - Make your changes and click Save to apply
              them.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
