export interface Country {
  id: string;
  name: string;
  code: string;
  region?: number;
  status?: boolean;
}

export interface Region {
  id: number;
  name: string;
  description?: string | null;
}

export interface Sector {
  id: string;
  name: string;
  description?: string | null;
  status?: string;
}

export interface Type {
  id: string;
  name: string;
  description?: string | null;
  status?: string;
}

export interface CountriesResponse {
  data: Country[];
}

export interface RegionsResponse {
  data: Region[];
}

export interface SectorsResponse {
  data: Sector[];
}

export interface TypesResponse {
  data: Type[];
}

export interface SearchResult {
  id: string;
  title: string;
  type: string;
  summary: string | null;
  collection: string;
  collection_weight: number;
}

export interface SearchResponse {
  success: boolean;
  limit: number;
  offset: number;
  data: SearchResult[];
}