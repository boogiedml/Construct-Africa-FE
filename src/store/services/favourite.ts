// src/services/api/favouritesApi.ts

import { baseApi } from './index';
import type {
  FavouritesResponse,
  ToggleFavouriteResponse,
  ToggleFavouriteRequest
} from '../../types/favourite.types';
import type { FavouriteQueryParams } from '../../types/filter.types';
import { buildQueryString } from '../../utils/index';

export const favouritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFavourites: builder.query<FavouritesResponse, FavouriteQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<FavouriteQueryParams> = {
          limit: 20,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `/favourites${queryString}`;
      },
    }),

    toggleFavourite: builder.mutation<ToggleFavouriteResponse, ToggleFavouriteRequest>({
      query: (body) => ({
        url: '/items/favourites',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetMyFavouritesQuery,
  useToggleFavouriteMutation,
} = favouritesApi;