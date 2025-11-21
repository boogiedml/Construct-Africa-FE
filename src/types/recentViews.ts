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

export interface ViewMeta {
  view_id: string;
  view_date: string;
  last_viewed?: string | null;
}

export interface RecentlyViewedCompany extends ViewMeta {
  id: string;
  name: string | null;
  slug: string | null;
  logo: string | null;
  description: string | null;

  status: string | null;
  company_role: string | null;

  date_created: string | null;
  date_updated: string | null;
}

export interface RecentlyViewedNews extends ViewMeta {
  id: string;
  title: string | null;
  slug: string | null;
  summary: string | null;
}

export interface RecentlyViewedTender extends ViewMeta {
  id: string;
  title: string | null;
  slug: string | null;
  summary: string | null;
}

export interface RecentlyViewedProject extends ViewMeta {
  id: string;
  title: string | null;
  slug: string | null;
  summary: string | null;

  featured_image: string | null;

  contract_value_usd: number | null;
  current_stage: string | null;

  status: string | null;

  date_created: string | null;
  date_updated: string | null;
  last_viewed: string | null;
}

export interface RecentViews {
  companies: RecentlyViewedCompany[];
  projects: RecentlyViewedProject[];
  news: RecentlyViewedNews[];
  tenders: RecentlyViewedTender[];
}

export interface RecentViewsResponse {
  success: boolean;
  total: number;
  limit: number;
  offset: number;

  counts: {
    projects: number;
    companies: number;
  };

  recent_views: RecentViews;
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
