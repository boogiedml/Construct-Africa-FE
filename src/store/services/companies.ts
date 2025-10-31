import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { CompaniesResponse } from '../../types/company.types';
import type { CompanyQueryParams } from '../../types/filter.types';

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, CompanyQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<CompanyQueryParams> = {
          fields: '*,logo.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,projects.*',
          limit: 25,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/companies${queryString}`;
      },
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
