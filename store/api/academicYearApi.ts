import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AcademicYearModel } from "@/app/data/model/AcademicYearModel";

export const academicYearApi = createApi({
  reducerPath: "academicYearApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["AcademicYear"],
  endpoints: (builder) => ({
    getAcademicYears: builder.query<AcademicYearModel[], void>({
      query: () => "/academic-years", 
      providesTags: ["AcademicYear"],
    }),
    getAcademicYear: builder.query<AcademicYearModel, number>({
      query: (id) => `/academic-years/${id}`,
    }),
    addAcademicYear: builder.mutation<AcademicYearModel, AcademicYearModel>({
      query: (body) => ({
        url: "/academic-years", 
        method: "POST",
        body: {
          year: body.year,
          start_date: body.start_date,
          end_date: body.end_date,
          status: body.status,
        },
      }),
      invalidatesTags: ["AcademicYear"],
    }),
  }),
});

export const {
  useGetAcademicYearsQuery,
  useGetAcademicYearQuery,
  useAddAcademicYearMutation,
} = academicYearApi;
