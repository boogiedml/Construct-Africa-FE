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
  estimated_value_usd: number;
  revised_budget_value_usd: number;
  contract_value_usd: number;
  email: string;
  phone: string;
  project_manager_id: number;
  developer_id: number;
  main_contractor_id: number;
  consultant_id: number;
  client_owner_id: number;
  location: string;
  gps_coordinates: string;
  construction_start: string;
  construction_completion: string;
  estimated_completion: string;
  financial_close: string;
  project_launch: string;
  completed: string;
  cancelled: string;
  country_id_directus: number;
}

export interface ProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}
