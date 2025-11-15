// services/api/recentViewsApi.ts

import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { RecentViewsQueryParams, RecentViewsResponse } from '../../types/recentViews';

export const recentViewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentViews: builder.query<RecentViewsResponse, RecentViewsQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<RecentViewsQueryParams> = {
          limit: 25,
          offset: 0,
          sort: '-date_created',
          meta: 'filter_count,total_count',
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `/recent-views${queryString}`;
      },
    }),
}),
});

export const {
  useGetRecentViewsQuery,
} = recentViewsApi;