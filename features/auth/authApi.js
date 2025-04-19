import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
        };
      },
      transformResponse: (res) => {
        document.cookie = `access_token=${res.token}; path=/; max-age=3600`;
        toast.success(res.message);

        return res;
      },
      transformErrorResponse: (res) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    register: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: user,
        };
      },
      transformResponse: (res) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res) => {
        toast.error(res.data.message);
        return res;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
