import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { CountriesResponse, RegionsResponse } from "../../types/commom.types";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("User-Agent", "MyApp/1.0");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => ({
        url: `items/countries`,
        method: "GET",
      }),
    }),
    getRegions: builder.query<RegionsResponse, void>({
      query: () => ({
        url: `items/regions`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountriesQuery, useGetRegionsQuery } = commonApi;
