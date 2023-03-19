import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (data) => {
          return {
            url: "/register",
            method: "POST",
            body: data,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          } catch (error) {}
        },
      }),
      login: builder.mutation({
        query: (data) => {
          return {
            url: "/login",
            method: "POST",
            body: data,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const result = await queryFulfilled;
  
              localStorage.setItem(
                "auth",
                JSON.stringify({
                  accessToken: result.data.accessToken,
                  user: result.data.user,
                })
              );
  
              dispatch(
                userLoggedIn({
                  accessToken: result.data.accessToken,
                  user: result.data.user,
                })
              );
            } catch (error) {}
          },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
