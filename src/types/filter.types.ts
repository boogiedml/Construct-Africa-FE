export interface BaseQueryParams {
  fields?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sort?: string;
  meta?: string;
  groupBy?: string;
}

export interface CompanyQueryParams extends BaseQueryParams {
  'filter[status][_eq]'?: string;
  'filter[is_free_company][_eq]'?: boolean;
  'filter[company_role][_contains]'?: string;
  'filter[countries][countries_id][_eq]'?: string;
  'filter[regions][_contains]'?: string;
  'filter[sectors][_contains]'?: string;
  'filter[employees][_gte]'?: number;
  'filter[projects_completed][_gte]'?: number;
}

export interface ProjectQueryParams extends BaseQueryParams {
  'filter[status][_eq]'?: string;
  'filter[is_free_project][_eq]'?: boolean;
  'filter[in_planning][_eq]'?: boolean;
  'filter[under_construction][_eq]'?: boolean;
  'filter[contract_value_usd][_gte]'?: number;
  'filter[contract_value_usd][_lte]'?: number;
  'filter[construction_start_date][_gte]'?: string;
  'filter[construction_completion_date][_lte]'?: string;
  'filter[countries][countries_id][_eq]'?: string;
  'filter[regions][regions_id][_eq]'?: string;
  'filter[sectors][sectors_id][_eq]'?: string;
  'filter[types][types_id][_eq]'?: string;
}

export interface NewsQueryParams extends BaseQueryParams {
  'filter[status][_eq]'?: string;
  'filter[is_sponsored][_eq]'?: boolean;
  'filter[category_id][_eq]'?: string;
  'filter[author_id][_eq]'?: string;
  'filter[countries][countries_id][_eq]'?: string;
  'filter[regions][regions_id][_eq]'?: string;
  'filter[sectors][sectors_id][_eq]'?: string;
}

export interface TenderQueryParams extends BaseQueryParams {
  'filter[status][_eq]'?: string;
  'filter[is_free_tender][_eq]'?: boolean;
  'filter[promote][_eq]'?: boolean;
  'filter[sticky][_eq]'?: boolean;
  'filter[moderation_state][_eq]'?: string;
  'filter[date_created][_gte]'?: string;
  'filter[date_created][_lte]'?: string;
}

export interface AppFilters {
  region?: string[]; 
  country?: string[];     
  sector?: string[];      
  type?: string[];        
  status?: string[];
  value?: string[];
  category?: string[];
  author?: string[];
  date?: string[];
}