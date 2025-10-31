import { baseApi } from './index';
import type { 
  CountriesResponse, 
  RegionsResponse, 
  SectorsResponse, 
  TypesResponse 
} from '../../types/reference.types';

export const referenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => ({
        url: 'items/countries?fields=id,name&sort=name',
      }),
    }),

    getRegions: builder.query<RegionsResponse, void>({
      query: () => ({
        url: 'items/regions?fields=id,name&sort=name',
      }),
    }),

    getSectors: builder.query<SectorsResponse, void>({
      query: () => ({
        url: 'items/sectors?fields=id,name&sort=name',
      }),
    }),

    getTypes: builder.query<TypesResponse, void>({
      query: () => ({
        url: 'items/types?fields=id,name&sort=name',
      }),
    }),
  }),
});

export const { 
  useGetCountriesQuery, 
  useGetRegionsQuery, 
  useGetSectorsQuery, 
  useGetTypesQuery 
} = referenceApi;