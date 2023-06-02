import { apiSlice } from '../../app/api/apiSlice'

export const clientsApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'Client',
  endpoints: (builder) => ({
    clientLookup: builder.query({
      query: () => `/clients/lookup`,
      providesTags: ['Client'],
    }),
    clients: builder.query({
      query: (arg) => `/clients?${arg}`,
      providesTags: ['Client'],
    }),
    client: builder.query({
      query: (_id) => `/clients/${_id}`,
      providesTags: ['Client'],
    }),
    deleteClient: builder.mutation({
      query: (_id) => ({
        url: `/clients/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
    createClient: builder.mutation({
      query: (client) => ({
        url: '/clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/clients/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
})

export const {
  useClientLookupQuery,
  useClientsQuery,
  useClientQuery,
  useDeleteClientMutation,
  useCreateClientMutation,
  useUpdateClientMutation,
} = clientsApiSlice
