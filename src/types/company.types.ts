export interface CompanyAddress {
  langcode: string | null;
  country_code: string | null;
  administrative_area: string | null;
  locality: string | null;
  dependent_locality: string | null;
  postal_code: string | null;
  address_line1: string | null;
  address_line2: string | null;
}

export interface Country {
  id: string | number;
  name: string;
  code?: string;
}

export interface CompanyCountry {
  id?: number;
  companies_id?: number;
  countries_id: Country;
}

export interface CompanyLogo {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string | null;
  type: string;
  folder: string | null;
  uploaded_by: string;
  created_on: string;
  modified_by: string | null;
  modified_on: string;
  charset: string | null;
  filesize: string;
  width: number;
  height: number;
  duration: string | null;
  embed: string | null;
  description: string | null;
  location: string | null;
  tags: string | null;
  metadata: Record<string, unknown>;
  focal_point_x: number | null;
  focal_point_y: number | null;
  tus_id: string | null;
  tus_data: string | null;
  uploaded_on: string;
  drupal_uuid: string;
  drupal_id: number | null;
}

// Grouped data structure from API when groupBy is used
export interface GroupedCompanyData {
  id: number | string;
  name: string;
  data: {
    id: number | string;
    name: string;
  };
  companies: Company[];
  count: number;
  totalValue?: number;
}

export interface Company {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string;
  status: string;
  drupal_id: number;
  drupal_uuid: string;
  description: string | null;
  slug: string;
  name: string;
  activities: string | null;
  company_role: string | null;
  headquarters: string | null;
  employees: string | null;
  projects_completed: string | null;
  ongoing_projects: string | null;
  location_details: string | null;
  longitude: number | null;
  latitude: number | null;
  map_iframe: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  company_email: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  is_free_company: boolean;
  logo: CompanyLogo | null;
  address: CompanyAddress | null;
  projects: number[];
  countries: CompanyCountry[];
  regions: number[];
  sectors: number[];
  types: number[];
}

export interface CompaniesResponse {
  data: Company[];
  meta: {
    filter_count: number;
    total_count: number;
  };
}
