import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { NewsQueryParams } from '../../types/filter.types';
import type { NewsResponse } from '../../types/news.types';

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, NewsQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<NewsQueryParams> = {
          fields: '*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*',
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/main_news${queryString}`;
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;