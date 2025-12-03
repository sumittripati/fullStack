import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const curdApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl : import.meta.env.VITE_API_URL}),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        // get task
        getTask: builder.query({
            query: () => '/curd/getitem',
            transformResponse: (response) => response.data.reverse(),
            providesTags: ['Task']
        }),
        // addTask: builder.mutation
        addTask: builder.mutation({
            query: (task) => ({
                url: '/curd/createitem',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Task'],
            async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
                // Assign a temporary unique ID for optimistic update
                newTask._id = `temp-${Date.now()}-${Math.random()}`;
                const patchResult = dispatch(
                    curdApi.util.updateQueryData('getTask', undefined, (draft) => {
                        draft.unshift(newTask);   // UI me pehle hi dikha do
                    })
                );

                try {
                    await queryFulfilled;    // agar API success
                } catch {
                    patchResult.undo();      // agar fail -> revert
                }
            },
        }),
        // deleteTask: builder.mutation
        deteleTask: builder.mutation({
            query: (taskId) => ({
                url: `/curd/deleteitem/${taskId}`,
                method: 'delete',
                body: taskId
            }),
            invalidatesTags: ['Task'],
            async onQueryStarted(taskId, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    curdApi.util.updateQueryData('getTask', undefined, (draft) => {
                        const index = draft.findIndex((item) => item._id === taskId);
                        if (index !== -1) draft.splice(index, 1);
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
        // updateTask: builder.mutation
        updateTask: builder.mutation({
            query: ({ taskId, data }) => ({
                url: `/curd/putitem/${taskId}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const { useGetTaskQuery, useAddTaskMutation, useDeteleTaskMutation, useUpdateTaskMutation } = curdApi