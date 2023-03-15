import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'lwsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }),
    endpoints: (builder) => {
        return {
            getVideos: builder.query({
                query: () => '/videos'
            }),
            getVideo: builder.query({
                query: (videoId) => `/videos/${videoId}`
            })
        }
    }
})


export const {useGetVideosQuery} = apiSlice;