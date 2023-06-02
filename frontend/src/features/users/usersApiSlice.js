import { apiSlice } from '../../app/api/apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'User',
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    users: builder.query({
      query: (arg) => `/users?${arg}`,
      providesTags: ['User'],
    }),
    user: builder.query({
      query: (_id) => `/users/${_id}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/users/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    userLookup: builder.query({
      query: () => `/users/lookup`,
      providesTags: ['User'],
    }),
  }),
})

export const {
  useCreateUserMutation,
  useUsersQuery,
  useUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUserLookupQuery,
} = usersApiSlice
