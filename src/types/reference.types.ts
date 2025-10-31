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