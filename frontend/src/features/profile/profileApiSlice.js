import { apiSlice } from '../../app/api/apiSlice'

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: (_id) => `/profile/${_id}`,
    }),
    updateUserProfile: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/profile/${_id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
  }),
})

export const { useUserProfileQuery, useUpdateUserProfileMutation } =
  profileApiSlice
