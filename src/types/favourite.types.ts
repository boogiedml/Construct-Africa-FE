// src/types/favourite.types.ts

import type { BaseQueryParams } from './filter.types';

export type FavouriteCollection = 'projects' | 'companies' | 'main_news' | 'tenders';

/**
 * Favourite Item in Response
 */
export interface FavouriteItem {
  favorite_id: string;
  favorite_date: string;
  [key: string]: any;
}

/**
 * Favourites by Collection Response
 */
export interface FavouritesByCollection {
  data: FavouriteItem[];
  projects: FavouriteItem[];
  companies: FavouriteItem[];
  news: FavouriteItem[];
  tenders: FavouriteItem[];
}

/**
 * Favourites Query Parameters
 */
export interface FavouriteQueryParams extends BaseQueryParams {
  collection?: FavouriteCollection;
}

/**
 * Favourites API Response
 */
export interface FavouritesResponse {
  success: boolean;
  total: string;
  limit: number;
  offset: number;
  data: FavouritesByCollection;
  counts: {
    projects: number;
    companies: number;
    main_news: number;
    tenders: number;
  };
  group: FavouritesByCollection;
}

/**
 * Toggle Favourite Request
 */
export interface ToggleFavouriteRequest {
  collection: FavouriteCollection;
  item_id: string;
}

/**
 * Toggle Favourite Response
 */
export interface ToggleFavouriteResponse {
  success: boolean;
  message: string;
}