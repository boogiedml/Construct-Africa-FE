import type { FilterCollection } from "./filter.types";

export interface RecentView {
  id: string;
  collection: string;
  item: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  [key: string]: any;
}

export interface RecentViewsResponse {
  data: RecentView[];
  meta?: {
    filter_count: number;
    total_count: number;
  };
}

export interface RecentViewsQueryParams {
  collection?: FilterCollection;
  limit?: number;
  offset?: number;
  sort?: string;
  fields?: string;
  meta?: string;
  [key: string]: any;
}