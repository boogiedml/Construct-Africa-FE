// src/types/expert.types.ts

import type { BaseQueryParams } from './filter.types';

/**
 * Expert Interface
 */
export interface Expert {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort: number | null;
  date_created: string;
  date_updated: string | null;
  name: string;
  slug: string;
  title: string;
  bio: string;
  opinion: string;
  image: string | null;
  country_code: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_image: string | null;
  created_by: string | null;
  updated_by: string | null;
}

/**
 * Expert Query Parameters
 * Extends BaseQueryParams with expert-specific filters
 */
export interface ExpertQueryParams extends BaseQueryParams {
  // Filter parameters
  'filter[status][_eq]'?: 'published' | 'draft' | 'archived';
  'filter[country_code][_eq]'?: string;
}

/**
 * Experts API Response
 */
export interface ExpertsResponse {
  data: Expert[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}

/**
 * Single Expert API Response
 */
export interface ExpertResponse {
  data: Expert;
}