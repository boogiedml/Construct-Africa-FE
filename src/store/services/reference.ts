import { baseApi, noAuthApi } from './index';
import type { 
  CountriesResponse, 
  RegionsResponse, 
  SearchResponse, 
  SectorsResponse, 
  TypesResponse 
} from '../../types/reference.types';

export const referenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => ({
        url: 'items/countries?fields=id,name,drupal_key&sort=name',
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

export const searchApi = noAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    generalSearch: builder.query<SearchResponse, string>({
      query: (searchQuery) => ({
        url: `/search?q=${encodeURIComponent(searchQuery)}`,
      }),
    }),
  }),
});

export const { 
  useGetCountriesQuery, 
  useGetRegionsQuery, 
  useGetSectorsQuery, 
  useGetTypesQuery,
} = referenceApi;

export const {
  useGeneralSearchQuery,
  useLazyGeneralSearchQuery
} = searchApi;