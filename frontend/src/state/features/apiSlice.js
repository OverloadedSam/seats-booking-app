import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: 'reservationApi',
  tagTypes: ['Coach', 'Reservation'],
  endpoints: (build) => ({
    getTrainCoachDetails: build.query({
      query: (id) => `/coach/${id}`,
      providesTags: ['Coach'],
    }),

    reserveSeats: build.mutation({
      query: (payload) => ({
        url: '/reserve-seats',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Reservation'],
    }),
  }),
});

export const { useGetTrainCoachDetailsQuery, useReserveSeatsMutation } =
  apiSlice;
