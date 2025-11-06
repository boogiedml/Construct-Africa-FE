import type { FavouriteCollection } from "./filter.types";


/**
 * Favourite Interface
 */
export interface Favourite {
  id: string;
  collection: FavouriteCollection;
  item_id: string;
  user_id: string;
  date_created: string;
  date_updated: string | null;
}

/**
 * Favourite with populated item data
 */
export interface FavouriteWithItem {
  id: string;
  collection: FavouriteCollection;
  item_id: string;
  user_id: string;
  date_created: string;
  date_updated: string | null;
  item: any;
}

/**
 * Favourites API Response
 */
export interface FavouritesResponse {
  data: FavouriteWithItem[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}

export interface ToggleFavouriteRequest {
  collection: FavouriteCollection;
  item_id: string;
}

export interface ToggleFavouriteResponse {
  data: Favourite | null;
}