import { baseApi } from "./index";
import { buildQueryString } from "../../utils/index";
import type { NewsQueryParams } from "../../types/filter.types";
import type { NewsResponse, News } from "../../types/news.types";

export interface SingleNewsResponse {
  data: News;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, NewsQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<NewsQueryParams> = {
          fields:
            "*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,category_id.*,author_id.*",
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/main_news${queryString}`;
      },
    }),
    getNewsById: builder.query<SingleNewsResponse, string>({
      query: (id) => ({
        url: `items/main_news/${id}?fields=*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,category_id.*,author_id.*`,
      }),
    }),
  }),
});

export const { useGetNewsQuery, useGetNewsByIdQuery } = newsApi;
