import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { CompaniesResponse, Company } from '../../types/company.types';
import type { CompanyQueryParams } from '../../types/filter.types';

export interface SingleCompanyResponse {
  data: Company;
}

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, CompanyQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<CompanyQueryParams> = {
          fields:
            "*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,projects.*",
          limit: 25,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/companies${queryString}`;
      },
    }),
    getCompanyById: builder.query<SingleCompanyResponse, string>({
      query: (id) => ({
        url: `items/companies/${id}?fields=*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,projects.projects_id.*`,
      }),
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = companiesApi;
