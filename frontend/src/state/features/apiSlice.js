import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: 'reservationApi',
  tagTypes: ['Coach'],
  endpoints: (build) => ({
    getTrainCoachDetails: build.query({
      query: (id) => `/coach/${id}`,
      providesTags: ['Coach'],
    }),
  }),
});

export const { useGetTrainCoachDetailsQuery } = apiSlice;
