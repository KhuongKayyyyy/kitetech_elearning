"use client";
import React, { useMemo, useState, useEffect } from "react";
import RegisSubjectTable from "@/components/item_list/RegisSubjectTable";
import FloatingRegisedSubject from "@/components/item_list/FloatingRegisedSubject";
import RegistedSubjectTable from "@/components/item_list/RegistedSubjectTable";
import { FakeData } from "@/app/data/FakeData";
import { Toaster } from "sonner";
import { BookOpen, GraduationCap, Plus, List } from "lucide-react";
import { CourseData } from "@/app/data/api/course_data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { courseRegisService } from "@/app/data/services/courseRegisService";
import { CourseRegistrationSubject } from "@/app/data/model/courseRegisModel";
import { semesterService } from "@/app/data/services/semesterService";
import { SemesterModel } from "@/app/data/model/SemesterModel";

export default function Page() {
  const availableSubjects = CourseData.getCourses();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set()
  );
  const [selectedSemester, setSelectedSemester] = useState<string>(""); // Will be set when semesters are loaded
  const [activeTab, setActiveTab] = useState<"register" | "registered">(
    "register"
  );
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedSubjects, setConfirmedSubjects] = useState<any[]>([]);
  const [registeredCourses, setRegisteredCourses] = useState<
    CourseRegistrationSubject[]
  >([]);
  const [isLoadingRegisteredCourses, setIsLoadingRegisteredCourses] =
    useState(false);
  const [semesters, setSemesters] = useState<SemesterModel[]>([]);
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);

  // Fetch semesters when component mounts
  useEffect(() => {
    const fetchSemesters = async () => {
      setIsLoadingSemesters(true);
      try {
        const semestersData = await semesterService.getSemesters();
        setSemesters(semestersData);
        // Set the first semester as default if none is selected
        if (semestersData.length > 0 && !selectedSemester) {
          setSelectedSemester(semestersData[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching semesters:", error);
        toast.error("Failed to fetch semesters");
      } finally {
        setIsLoadingSemesters(false);
      }
    };

    fetchSemesters();
  }, []);

  // Fetch registered courses when component mounts or semester changes
  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      if (!selectedSemester) return;

      setIsLoadingRegisteredCourses(true);
      try {
        const courses = await courseRegisService.getRegisteredCourses(
          selectedSemester
        );
        setRegisteredCourses(courses);
      } catch (error) {
        console.error("Error fetching registered courses:", error);
        toast.error("Failed to fetch registered courses");
      } finally {
        setIsLoadingRegisteredCourses(false);
      }
    };

    fetchRegisteredCourses();
  }, [selectedSemester]);

  const registrableSubjects = useMemo(
    () =>
      availableSubjects.filter(
        (s) => !confirmedSubjects.some((c: any) => c.id === s.id)
      ),
    [availableSubjects, confirmedSubjects]
  );

  const registeredSubjects = useMemo(
    () =>
      Array.from(selectedSubjects)
        .map((id) =>
          registrableSubjects.find((subj) => subj.id.toString() === id)
        )
        .filter(Boolean) as any[],
    [selectedSubjects, registrableSubjects]
  );

  const handleClear = () => setSelectedSubjects(new Set());
  const handleConfirm = () => {
    setShowPasswordDialog(true);
  };

  const handleSubmitRegistration = async () => {
    if (!password) {
      toast.error("Please enter your password to confirm.");
      return;
    }
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Registration confirmed successfully.");
      setShowPasswordDialog(false);
      setPassword("");
      // Persist selected subjects into confirmed list (unique by id)
      const toConfirm = Array.from(selectedSubjects)
        .map((id) =>
          availableSubjects.find((subj) => subj.id.toString() === id)
        )
        .filter(Boolean) as any[];
      setConfirmedSubjects((prev) => {
        const existing = new Map(prev.map((c: any) => [c.id, c]));
        toConfirm.forEach((c) => existing.set(c.id, c));
        return Array.from(existing.values());
      });
      setSelectedSubjects(new Set());
      setActiveTab("registered");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='container mx-auto p-6'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Subject Registration
          </h1>
          <p className='text-gray-600 text-lg'>
            Manage your course registration and view enrolled subjects
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
          <div className='border-b border-gray-200'>
            <nav className='flex'>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === "register"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}>
                <Plus className='w-5 h-5' />
                Register New Subjects
              </button>
              <button
                onClick={() => setActiveTab("registered")}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === "registered"
                    ? "bg-green-50 text-green-700 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}>
                <List className='w-5 h-5' />
                My Registered Subjects
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === "register" && (
              <div className='space-y-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-2 bg-blue-600 rounded-lg'>
                    <BookOpen className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Available Subjects
                    </h2>
                    <p className='text-gray-600'>
                      Select subjects you want to register for the current
                      semester
                    </p>
                  </div>
                </div>

                <RegisSubjectTable
                  availableSubjects={registrableSubjects}
                  selectedSubjects={selectedSubjects}
                  setSelectedSubjects={setSelectedSubjects}
                  onConfirm={handleConfirm}
                />

                <FloatingRegisedSubject
                  registeredSubjects={registeredSubjects}
                  onClear={handleClear}
                  onConfirm={handleConfirm}
                />
              </div>
            )}

            {activeTab === "registered" && (
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-green-600 rounded-lg'>
                      <GraduationCap className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        Registered Subjects
                      </h2>
                      <p className='text-gray-600'>
                        View your registered courses by semester
                      </p>
                    </div>
                  </div>

                  {/* Semester Selector */}
                  <div className='flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg'>
                    <label
                      htmlFor='semester'
                      className='text-sm font-medium text-gray-700 whitespace-nowrap'>
                      Semester:
                    </label>
                    {isLoadingSemesters ? (
                      <div className='px-3 py-1 text-sm text-gray-500'>
                        Loading semesters...
                      </div>
                    ) : (
                      <select
                        id='semester'
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        className='px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm min-w-[140px]'>
                        {semesters.map((semester) => (
                          <option
                            key={semester.id}
                            value={semester.id.toString()}>
                            {semester.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {isLoadingRegisteredCourses ? (
                  <div className='flex justify-center items-center py-8'>
                    <div className='text-gray-600'>
                      Loading registered courses...
                    </div>
                  </div>
                ) : (
                  <RegistedSubjectTable
                    registeredSubjects={registeredCourses}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster position='bottom-left'></Toaster>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              Enter your password to confirm registering selected subjects.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <label htmlFor='password' className='text-sm font-medium'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your account password'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='ghost'
              onClick={() => setShowPasswordDialog(false)}
              disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRegistration} disabled={isSubmitting}>
              {isSubmitting ? "Confirming..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
