import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { CompaniesResponse } from "../../types/company.types";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer oQ0sgW3qgL8gRlMbwIMHH0RAkMz76lbM`);
        // headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("User-Agent", "MyApp/1.0");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, void>({
      query: () => ({
        url: `items/companies`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
