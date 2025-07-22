import { useGetAcademicYearsQuery } from "@/store/api/academicYearApi";
import { useGetAcademicYearQuery } from "@/store/api/academicYearApi";

export default function AcademicYearList() {
  const {
    data: academicYear,
    isLoading,
    isError,
    error,
  } = useGetAcademicYearQuery(25);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as any)?.message}</div>;

  return (
    <div>
      <h2>Academic Year</h2>
      {academicYear && (
        <div>
          {academicYear.year} — {academicYear.start_date} to{" "}
          {academicYear.end_date} ({academicYear.status})
        </div>
      )}
    </div>
  );
}
