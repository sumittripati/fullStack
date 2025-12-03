import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/api/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const { useLoginMutation } = AuthSlice;