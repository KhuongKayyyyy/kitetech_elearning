import { useGetAcademicYearsQuery } from "@/store/api/academicYearApi";

export const useAcademicYears = () => {
    const { data: academicYears = [], isLoading: loading } = useGetAcademicYearsQuery();
  
    return {
      academicYears,
      loading,
    };
  };
  