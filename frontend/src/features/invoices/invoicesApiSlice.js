import { apiSlice } from '../../app/api/apiSlice'

export const invoicesApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'Invoice',
  endpoints: (builder) => ({
    invoices: builder.query({
      query: (arg) => `/invoices?${arg}`,
      providesTags: ['Invoice'],
    }),
    invoice: builder.query({
      query: (_id) => `/invoices/${_id}`,
      providesTags: ['Invoice'],
    }),
    deleteInvoice: builder.mutation({
      query: (_id) => ({
        url: `/invoices/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
    createInvoice: builder.mutation({
      query: (invoice) => ({
        url: '/invoices',
        method: 'POST',
        body: invoice,
      }),
      invalidatesTags: ['Invoice'],
    }),
    updateInvoice: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/invoices/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
})

export const {
  useInvoicesQuery,
  useInvoiceQuery,
  useDeleteInvoiceMutation,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} = invoicesApiSlice
