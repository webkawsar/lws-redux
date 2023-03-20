import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: async (headers, {getState, endpoint}) => {

            console.log(headers, 'headers')
            console.log(getState, 'getState')
            console.log(endpoint, 'endpoint')

            const token = getState()?.auth?.accessToken;
            if(token) {
                headers.set('Authorization', `Bearer token ${token}`)
            }

            console.log(headers, 'headers')

            return headers;
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
})