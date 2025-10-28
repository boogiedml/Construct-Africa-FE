// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";
// import type { CompaniesResponse } from "../../types/company.types";

// export const companiesApi = createApi({
//   reducerPath: "companiesApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as RootState;
//       const token = state.auth.token;

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       headers.set("Accept", "application/json");
//       headers.set("Content-Type", "application/json");
//       headers.set("User-Agent", "MyApp/1.0");

//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getCompanies: builder.query<CompaniesResponse, void>({
//       query: () => ({
//         url: `items/companies?fields=*,logo.*,countries.countries_id.*`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useGetCompaniesQuery } = companiesApi;


import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { CompaniesResponse } from '../../types/company.types';
import type { CompanyQueryParams } from '../../types/filter.types';

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, CompanyQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<CompanyQueryParams> = {
          fields: '*,logo.*,countries.countries_id.*',
          limit: 25,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/companies${queryString}`;
      },
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
