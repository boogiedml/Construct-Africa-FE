// src/services/api/expertsApi.ts

import { baseApi } from './index';
import type {
  ExpertQueryParams,
  ExpertsResponse,
  ExpertResponse
} from '../../types/expert.types';
import { buildQueryString } from '../../utils/index';

export const expertsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.query<ExpertsResponse, ExpertQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<ExpertQueryParams> = {
          fields: '*,image.*',
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `/items/experts_analysts${queryString}`;
      },
    }),

    getExpertBySlug: builder.query<ExpertResponse, string>({
      query: (slug) => {
        const params = {
          fields: '*,image.*',
          'filter[slug][_eq]': slug,
        };
        const queryString = buildQueryString(params);
        return `/items/experts_analysts${queryString}`;
      },
    }),
  }),
});

export const {
  useGetExpertsQuery,
  useGetExpertBySlugQuery,
} = expertsApi;