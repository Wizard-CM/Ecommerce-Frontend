import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/chart`,
  }),
  endpoints: (builder) => ({
    chartDashboardData: builder.query({
      query: (id) => `/dashboard?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    barData: builder.query({
      query: (id) => `/bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    lineData: builder.query({
      query: (id) => `/line?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useChartDashboardDataQuery, useBarDataQuery, useLineDataQuery } =
  chartApi;
