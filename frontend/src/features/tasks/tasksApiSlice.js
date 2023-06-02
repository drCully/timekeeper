import { apiSlice } from '../../app/api/apiSlice'

export const tasksApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'Task',
  endpoints: (builder) => ({
    taskLookup: builder.query({
      query: () => `/tasks/lookup`,
      providesTags: ['Task'],
    }),
    tasks: builder.query({
      query: (arg) => `/tasks?${arg}`,
      providesTags: ['Task'],
    }),
    task: builder.query({
      query: (_id) => `/tasks/${_id}`,
      providesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (_id) => ({
        url: `/tasks/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/tasks/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const {
  useTaskLookupQuery,
  useTasksQuery,
  useTaskQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApiSlice
