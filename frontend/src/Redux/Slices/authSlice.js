import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthSlice = createApi({
    reducerPath: "authApi", 
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/api/register',
                method: 'POST',
                body: data
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/api/login',
                method: 'POST',
                body: data
            }),
        }),
    })
})

export const { useRegisterMutation, useLoginMutation } = AuthSlice;