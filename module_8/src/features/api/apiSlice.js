import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'lwsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }),
    tagTypes: ['Videos'],
    endpoints: (builder) => {
        return {
            getVideos: builder.query({
                query: () => '/videos',
                keepUnusedDataFor: 5,
                providesTags: ["Videos"]
            }),
            getVideo: builder.query({
                query: (videoId) => `/videos/${videoId}`
            }),
            getRelatedVideos: builder.query({
                query: ({id, title}) => {
                    const tags = title.split(' ');
                    const likes = tags.map(tag => `title_like=${tag}`);
                    const queryString = `/videos?${likes.join('&')}&_limit=4`;
                    return queryString;
                }
            }),
            addVideo: builder.mutation({
                query: (data) => {
                    return {
                        url: '/videos',
                        method: 'POST',
                        body: data
                    }
                },
                invalidatesTags: ['Videos']
            })
        }
    }
})


export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation } = apiSlice;