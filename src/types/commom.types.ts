export interface Country {
  id: number;
  name: string;
  description: string | null;
  sort_weight: number;
  drupal_tid: number;
  drupal_uuid: string;
  status: boolean;
  region: number;
}

export interface Region {
  id: number;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  sort_weight: number;
  name: string;
  drupal_tid: number;
  drupal_uuid: string;
  status: boolean;
}

export interface CountriesResponse {
  data: Country[];
}

export interface RegionsResponse {
  data: Region[];
}
