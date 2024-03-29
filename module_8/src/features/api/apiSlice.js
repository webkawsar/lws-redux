import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "lwsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Videos", "Video", "RelatedVideo"],
  endpoints: (builder) => {
    return {
      getVideos: builder.query({
        query: () => "/videos",
        keepUnusedDataFor: 5,
        providesTags: ["Videos"],
      }),
      getVideo: builder.query({
        query: (videoId) => `/videos/${videoId}`,
        providesTags: (result, error, arg) => [
          {
            type: "Video",
            id: arg,
          },
        ],
      }),
      getRelatedVideos: builder.query({
        query: ({ id, title }) => {
          const tags = title.split(" ");
          const likes = tags.map((tag) => `title_like=${tag}`);
          const queryString = `/videos?${likes.join("&")}&_limit=4`;
          return queryString;
        },
        providesTags: (result, error, arg) => [
            {
              type: "RelatedVideo",
              id: arg.id,
            },
          ],
      }),
      addVideo: builder.mutation({
        query: (data) => {
          return {
            url: "/videos",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Videos"],
      }),
      editVideo: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `/videos/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: (result, error, arg) => [
          "Videos",
          {
            type: "Video",
            id: arg.id,
          },
          {
            type: "RelatedVideo",
            id: arg.id,
          },
        ],
      }),
    };
  },
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} = apiSlice;
