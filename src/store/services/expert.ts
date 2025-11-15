import { noAuthApi } from "./index";
import type {
  ExpertQueryParams,
  ExpertsResponse,
  ExpertResponse,
} from "../../types/expert.types";
import { buildQueryString } from "../../utils/index";

export const expertsApi = noAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.query<ExpertsResponse, ExpertQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<ExpertQueryParams> = {
          fields: "*,photo.*",
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
          fields: "*,photo.*",
          "filter[slug][_eq]": slug,
        };
        const queryString = buildQueryString(params);
        return `/items/experts_analysts${queryString}`;
      },
    }),
    getExpertById: builder.query<ExpertResponse, string>({
      query: (id) => ({
        url: `items/experts_analysts/${id}?fields=*,photo.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*`,
      }),
    }),
  }),
});

export const { useGetExpertsQuery, useGetExpertBySlugQuery, useGetExpertByIdQuery } = expertsApi;
