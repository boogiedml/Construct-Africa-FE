// store/services/tenders.ts

import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { Tender, TendersResponse } from '../../types/tenders.types';
import type { TenderQueryParams } from '../../types/filter.types';

export const tendersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenders: builder.query<TendersResponse, TenderQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<TenderQueryParams> = {
          fields: '*,featured_image.*',
          limit: 25,
          offset: 0,
          meta: 'total_count,filter_count',
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/tenders${queryString}`;
      },
    }),

    getTenderById: builder.query<{ data: Tender }, string>({
      query: (id) => `items/tenders/${id}?fields=*,featured_image.*`,
    }),
  }),
});

export const { useGetTendersQuery, useGetTenderByIdQuery } = tendersApi;