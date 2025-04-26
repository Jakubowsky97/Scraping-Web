import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const scrapsApi = createApi({
    reducerPath: "scrapsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getAllScraps: builder.query({
            query: () => {
                return {
                    url: "/scrap/get-all",
                    method: "GET",
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
        getScrapByTitle: builder.query({
            query: (title) => {
                return {
                    url: `/scrap/by-title`,
                    method: "POST",
                    body: { query: title },
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
        removeScrapByTitle: builder.mutation({
            query: (title) => {
                return {
                    url: `/scrap/remove-by-title`,
                    method: "POST",
                    body: { query: title },
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
    })
});

export const { useLazyGetAllScrapsQuery, useLazyGetScrapByTitleQuery, useRemoveScrapByTitleMutation } = scrapsApi;

