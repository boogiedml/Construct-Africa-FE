export interface Company {
  id: number;
  drupal_nid: number;
  drupal_uuid: string;
  title: string;
  body: string | null;
  activities: string | null;
  address: string | null;
  awards: string | null;
  certifications: string | null;
  comments: string | null;
  company_email: string | null;
  company_role: string | null;
  email: string | null;
  employees: string | null;
  fax: string | null;
  headquarter: string | null;
  country_id: number | null;
  region_id: number | null;
  sector_id: number | null;
  type_id: number | null;
  location_details: string | null;
  location_geo: string | null;
  map_iframe_src: string | null;
  key_contacts: string | null;
  image?: string;
}

export interface CompaniesResponse {
  data: Company[];
}
