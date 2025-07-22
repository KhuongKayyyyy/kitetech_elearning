import React from "react";
import { useAddAcademicYearMutation } from "@/store/api/academicYearApi";
import { AcademicYearModel } from "@/app/data/model/AcademicYearModel";

export default function CreateAcademicYearTestButton() {
  const [addAcademicYear, { isLoading, isError, error, isSuccess }] =
    useAddAcademicYearMutation();

  const handleClick = async () => {
    try {
      const newYear = {
        year: 2023,
        start_date: "2022-09-01",
        end_date: "2023-06-30",
        status: "Active",
      };

      const result = await addAcademicYear(
        newYear as AcademicYearModel
      ).unwrap();
      console.log("✅ Academic year created:", result);
      alert("Created successfully!");
    } catch (err) {
      console.error("❌ Error creating academic year:", err);
      alert("Failed to create academic year");
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Creating..." : "Create Academic Year (Test)"}
    </button>
  );
}
