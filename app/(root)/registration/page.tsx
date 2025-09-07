"use client";
import React, { useMemo, useState, useEffect } from "react";
import RegisSubjectTable from "@/components/item_list/RegisSubjectTable";
import FloatingRegisedSubject from "@/components/item_list/FloatingRegisedSubject";
import RegistedSubjectTable from "@/components/item_list/RegistedSubjectTable";
import { Toaster } from "sonner";
import { BookOpen, GraduationCap, Plus, List } from "lucide-react";
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
import { AvailableCourse } from "@/app/data/model/availableCourse";
import { semesterService } from "@/app/data/services/semesterService";
import { SemesterModel } from "@/app/data/model/SemesterModel";

export default function Page() {
  const [availableSubjects, setAvailableSubjects] = useState<AvailableCourse[]>(
    []
  );
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
  const [isLoadingAvailableCourses, setIsLoadingAvailableCourses] =
    useState(false);
  const [semesters, setSemesters] = useState<SemesterModel[]>([]);
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);

  // Fetch available courses when component mounts
  useEffect(() => {
    const fetchAvailableCourses = async () => {
      setIsLoadingAvailableCourses(true);
      try {
        const courses = await courseRegisService.getAvailableCourses();
        setAvailableSubjects(courses);
        console.log("Fetched available courses:", courses);
      } catch (error) {
        console.error("Error fetching available courses:", error);
        toast.error("Failed to fetch available courses");
      } finally {
        setIsLoadingAvailableCourses(false);
      }
    };

    fetchAvailableCourses();
  }, []);

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

  const handleUnregister = async (courseId: string) => {
    try {
      // Get all currently registered courses (excluding the one being unregistered)
      const remainingRegisteredCourseIds = availableSubjects
        .filter(
          (availableCourse) =>
            availableCourse.isRegistered &&
            availableCourse.id.toString() !== courseId
        )
        .map((availableCourse) => availableCourse.id);

      console.log("Unregistering course ID:", courseId);
      console.log(
        "Remaining registered course IDs:",
        remainingRegisteredCourseIds
      );

      // Call the registration API with only the remaining courses
      await courseRegisService.registerCourse(remainingRegisteredCourseIds);

      toast.success("Course unregistered successfully!");

      // Refresh both available courses and registered courses from API
      const [updatedAvailableCourses, updatedRegisteredCourses] =
        await Promise.all([
          courseRegisService.getAvailableCourses(),
          selectedSemester
            ? courseRegisService.getRegisteredCourses(selectedSemester)
            : Promise.resolve([]),
        ]);

      setAvailableSubjects(updatedAvailableCourses);
      setRegisteredCourses(updatedRegisteredCourses);
    } catch (error) {
      console.error("Unregistration error:", error);
      toast.error("Failed to unregister course. Please try again.");
    }
  };

  const handleSubmitRegistration = async () => {
    // Check for null, undefined, or empty password
    if (!password || password.trim() === "") {
      toast.error("Please enter your password to confirm.");
      return;
    }

    if (selectedSubjects.size === 0) {
      toast.error("Please select at least one course to register.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Add fake waiting time to simulate processing
      toast.info("Processing your registration...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

      // Debug: Log what we're working with
      console.log("Selected subjects:", Array.from(selectedSubjects));
      console.log(
        "Registered courses:",
        registeredCourses.map((c) => ({
          id: c.id,
          subject_id: c.subject_id,
          subject_name: c.subject?.name,
        }))
      );
      console.log(
        "Available subjects:",
        availableSubjects.map((c) => ({
          id: c.id,
          subject_id: c.subject_id,
          subject_name: c.subject?.name,
        }))
      );

      // Get already registered course IDs - use AvailableCourse IDs directly
      // Since the API expects AvailableCourse IDs, we need to find which available courses are already registered
      const alreadyRegisteredAvailableCourseIds = availableSubjects
        .filter((availableCourse) => availableCourse.isRegistered)
        .map((availableCourse) => availableCourse.id);

      console.log(
        "Already registered AvailableCourse IDs:",
        alreadyRegisteredAvailableCourseIds
      );

      // Convert selected subject IDs to numbers (these are AvailableCourse IDs)
      const selectedCourseIds = Array.from(selectedSubjects).map((id) =>
        parseInt(id)
      );

      // Combine already registered available course IDs with newly selected course IDs
      const allCourseIds = [
        ...alreadyRegisteredAvailableCourseIds,
        ...selectedCourseIds,
      ];

      // Validate that all IDs are valid numbers
      const validCourseIds = allCourseIds.filter((id) => !isNaN(id) && id > 0);

      if (validCourseIds.length !== allCourseIds.length) {
        console.error("Invalid course IDs detected:", {
          original: allCourseIds,
          valid: validCourseIds,
          invalid: allCourseIds.filter((id) => isNaN(id) || id <= 0),
        });
        toast.error("Some course IDs are invalid. Please try again.");
        return;
      }

      console.log(
        "Already registered courses (CourseRegistrationSubject):",
        registeredCourses.map((c) => ({
          id: c.id,
          subject_id: c.subject_id,
          subject_name: c.subject?.name,
        }))
      );
      console.log(
        "Already registered AvailableCourse IDs:",
        alreadyRegisteredAvailableCourseIds
      );
      console.log("Newly selected AvailableCourse IDs:", selectedCourseIds);
      console.log("Sending complete list to API:", validCourseIds);
      console.log("Validated course IDs:", validCourseIds);

      // Call the registration API with the complete list of courses
      await courseRegisService.registerCourse(validCourseIds);

      toast.success("Registration confirmed successfully!");
      setShowPasswordDialog(false);
      setPassword("");

      // Clear selected subjects
      setSelectedSubjects(new Set());

      // Refresh both available courses and registered courses from API
      const [updatedAvailableCourses, updatedRegisteredCourses] =
        await Promise.all([
          courseRegisService.getAvailableCourses(),
          selectedSemester
            ? courseRegisService.getRegisteredCourses(selectedSemester)
            : Promise.resolve([]),
        ]);

      setAvailableSubjects(updatedAvailableCourses);
      setRegisteredCourses(updatedRegisteredCourses);

      // Switch to registered tab to show the results
      setActiveTab("registered");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register for courses. Please try again.");
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

                {isLoadingAvailableCourses ? (
                  <div className='flex justify-center items-center py-8'>
                    <div className='text-gray-600'>
                      Loading available courses...
                    </div>
                  </div>
                ) : (
                  <>
                    <RegisSubjectTable
                      availableSubjects={registrableSubjects}
                      selectedSubjects={selectedSubjects}
                      setSelectedSubjects={setSelectedSubjects}
                      onConfirm={handleConfirm}
                      onUnregister={handleUnregister}
                    />

                    <FloatingRegisedSubject
                      registeredSubjects={registeredSubjects}
                      onClear={handleClear}
                      onConfirm={handleConfirm}
                    />
                  </>
                )}
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

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Confirm Course Registration</DialogTitle>
            <DialogDescription>
              Please review your selected courses and enter your password to
              confirm registration.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {/* Selected Courses Summary */}
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-2'>
                Selected Courses:
              </h4>
              <div className='space-y-1'>
                {Array.from(selectedSubjects).map((id) => {
                  const course = availableSubjects.find(
                    (c) => c.id.toString() === id
                  );
                  return course ? (
                    <div key={id} className='flex justify-between text-sm'>
                      <span className='text-gray-700'>
                        {course.subject?.name}
                      </span>
                      <span className='text-gray-500'>
                        {course.subject?.credits} TC
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
              <div className='mt-2 pt-2 border-t border-gray-200'>
                <div className='flex justify-between text-sm font-medium'>
                  <span>Total Credits:</span>
                  <span>
                    {Array.from(selectedSubjects).reduce((total, id) => {
                      const course = availableSubjects.find(
                        (c) => c.id.toString() === id
                      );
                      return total + (course?.subject?.credits || 0);
                    }, 0)}{" "}
                    TC
                  </span>
                </div>
              </div>
            </div>

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
                disabled={isSubmitting}
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
              {isSubmitting
                ? "Registering..."
                : `Register ${selectedSubjects.size} Course${
                    selectedSubjects.size !== 1 ? "s" : ""
                  }`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
