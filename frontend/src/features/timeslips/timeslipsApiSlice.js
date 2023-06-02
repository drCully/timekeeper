import { apiSlice } from '../../app/api/apiSlice'

export const timeslipsApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'Timeslip',
  endpoints: (builder) => ({
    timeslips: builder.query({
      query: (arg) => `/timeslips?${arg}`,
      providesTags: ['Timeslip'],
    }),
    timeslip: builder.query({
      query: (_id) => `/timeslips/${_id}`,
      providesTags: ['Timeslip'],
    }),
    deleteTimeslip: builder.mutation({
      query: (_id) => ({
        url: `/timeslips/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Timeslip'],
    }),
    createTimeslip: builder.mutation({
      query: (timeslip) => ({
        url: '/timeslips',
        method: 'POST',
        body: timeslip,
      }),
      invalidatesTags: ['Timeslip'],
    }),
    updateTimeslip: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/timeslips/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Timeslip'],
    }),
    invoiceTimeslip: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/timeslips/${_id}/invoice`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Timeslip'],
    }),
    timeslipBilling: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/timeslips/${_id}/invoice`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Timeslip'],
    }),
  }),
})

export const {
  useTimeslipsQuery,
  useTimeslipQuery,
  useDeleteTimeslipMutation,
  useCreateTimeslipMutation,
  useUpdateTimeslipMutation,
  useInvoiceTimeslipMutation,
  useTimeslipBillingMutation,
} = timeslipsApiSlice
