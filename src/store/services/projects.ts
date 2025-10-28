// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";
// import type { ProjectsResponse } from "../../types/project.types";

// export const projectsApi = createApi({
//   reducerPath: "projectsApi",
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
//     getProjects: builder.query<ProjectsResponse, void>({
//       query: () => ({
//         url: `items/projects?fields=*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useGetProjectsQuery } = projectsApi;


import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { ProjectsResponse } from '../../types/project.types';
import type { ProjectQueryParams } from '../../types/filter.types';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, ProjectQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<ProjectQueryParams> = {
          fields: '*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*',
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/projects${queryString}`;
      },
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
