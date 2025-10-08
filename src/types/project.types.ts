export interface Project {
  id: number;
  drupal_nid: number;
  drupal_uuid: string;
  title: string;
  body: string;
  region_id_directus: number;
  sector_uuid: string;
  type_uuid: string;
  stage_uuid: string;
  estimated_value_usd: number | null;
  revised_budget_value_usd: number | null;
  contract_value_usd: number | string | null;
  email: string | null;
  phone: string | null;
  project_manager_id: number | null;
  developer_id: number | null;
  main_contractor_id: number | null;
  consultant_id: number | null;
  client_owner_id: number | null;
  location: string | null;
  gps_coordinates: string | null;
  construction_start: string | null;
  construction_completion: string | null;
  estimated_completion: string | null;
  financial_close: string | null;
  project_launch: string | null;
  completed: string | null;
  cancelled: string | null;
  country_id_directus: number | null;
  image?: string;
}

export interface ProjectsResponse {
  data: Project[];
}
