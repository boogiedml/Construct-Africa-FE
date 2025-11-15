export interface ProjectCountry {
  countries_id: {
    id: number;
    name: string;
    description: string | null;
    sort_weight: number;
    drupal_tid: number;
    drupal_uuid: string;
    status: boolean;
    region: number;
    drupal_key: string;
  };
}

export interface ProjectSector {
  sectors_id: {
    id: string;
    status: string;
    user_created: string;
    date_created: string;
    user_updated: string | null;
    date_updated: string | null;
    name: string;
    description: string | null;
    drupal_key: string;
    drupal_id: string;
  };
}

export interface ProjectImage {
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

export interface Project {
  id: string;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string;
  published_by: string | null;
  drupal_uuid: string;
  title: string;
  description: string | null;
  summary: string | null;
  slug: string;
  moderation_state: string;
  featured_image: ProjectImage | null;
  contract_value_usd: number | null;
  estimated_project_value_usd: number | null;
  revised_budget_value_usd: number | null;
  value_range: string | null;
  project_launch_at: string | null;
  pq_issue_date: string | null;
  pq_document_submission_date: string | null;
  tender_advertised_at: string | null;
  main_contract_tender_issue_date: string | null;
  main_contract_bid_submission_date: string | null;
  prequalification_consultant_date: string | null;
  prequalification_contractor_date: string | null;
  consultant_awarded_at: string | null;
  contract_awarded_at: string | null;
  main_contract_award_date: string | null;
  financial_close_date: string | null;
  design_completion_date: string | null;
  construction_start_date: string | null;
  construction_completion_date: string | null;
  estimated_completion_date: string | null;
  study_completion_date: string | null;
  commissioning_date: string | null;
  handover_date: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  in_operation: boolean | null;
  address: string | null;
  location: string | null;
  gps_coordinates: string | null;
  map_iframe: string | null;
  latitude: number | null;
  longitude: number | null;
  specifications: string[];
  gross_floor_area_m2: number | null;
  total_built_up_area_m2: number[];
  volume_concrete_m3: number | null;
  total_cement_bags: number | null;
  total_steel_weight: number | null;
  total_cement_tonnage: number | null;
  cost_cement_per_ton: number | null;
  cost_steel_per_ton: number | null;
  airport_passengers_million: number[];
  airport_terminal_area_m2: number[];
  pipeline_km: number[];
  rail_km: string[];
  road_km: number[];
  seaport_water_depth: number | null;
  current_stage: string;
  is_free_project: boolean;
  in_planning: boolean;
  under_construction: boolean;
  bid_evaluation: string | null;
  call_for_eoi: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  editor_notes: string | null;
  transport: string | null;
  consultant: string | null;
  main_contractor_note: string | null;
  contacts: string | null;
  drupal_id: number;
  keywords: string;
  meta_description: string;
  authority: number[];
  architect: number[];
  design_consultant: number[];
  project_manager: number[];
  civil_engineer: number[];
  structural_engineer: number[];
  mep_engineer: number[];
  electrical_engineer: number[];
  geotechnical_engineer: number[];
  cost_consultants: number[];
  quantity_surveyor: number[];
  landscape_architect: number[];
  legal_adviser: number[];
  transaction_advisor: number[];
  study_consultant: number[];
  funding: number[];
  main_contractor: number[];
  main_contract_bidder: number[];
  main_contract_prequalified: number[];
  mep_subcontractor: number[];
  piling_subcontractor: number[];
  facade_subcontractor: number[];
  lift_subcontractor: number[];
  other_subcontractor: number[];
  operator: number[];
  feed: number[];
  companies: number[];
  countries: ProjectCountry[];
  regions: number[];
  sectors: ProjectSector[];
  types: number[];
  client_owner: number[];
  developer: number[];
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    filter_count: number;
    total_count: number;
  };
}

export interface SingleProject {
  id: string;
  status?: string;
  moderation_state?: string;
  drupal_id?: number;
  drupal_uuid?: string;
  title: string;
  slug?: string;
  description?: string | null;
  summary?: string | null;
  keywords?: string;
  meta_description?: string;
  date_created?: string;
  date_updated?: string | null;
  user_created?: string;
  user_updated?: string | null;
  published_by?: string | null;
  featured_image?: {
    id: string;
    filename_disk: string;
    title?: string;
  } | null;
  feed?: any[];
  map_iframe?: string | null;
  current_stage?: string;
  in_planning?: boolean;
  under_construction?: boolean;
  in_operation?: boolean | null;
  is_free_project?: boolean;
  contract_value_usd?: number | null;
  estimated_project_value_usd?: number | null;
  revised_budget_value_usd?: number | null;
  value_range?: string;
  location?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  gps_coordinates?: string | null;
  gross_floor_area_m2?: number | null;
  total_built_up_area_m2?: any[];
  volume_concrete_m3?: number | null;
  total_cement_tonnage?: number | null;
  total_cement_bags?: number | null;
  total_steel_weight?: number | null;
  airport_passengers_million?: any[];
  airport_terminal_area_m2?: any[];
  pipeline_km?: any[];
  rail_km?: any[];
  road_km?: any[];
  seaport_water_depth?: number | null;
  cost_cement_per_ton?: number | null;
  cost_steel_per_ton?: number | null;
  cost_consultants?: any[];
  project_launch_at?: string | null;
  construction_start_date?: string | null;
  construction_completion_date?: string | null;
  estimated_completion_date?: string | null;
  completed_at?: string | null;
  cancelled_at?: string | null;
  design_completion_date?: string | null;
  study_completion_date?: string | null;
  commissioning_date?: string | null;
  handover_date?: string | null;
  financial_close_date?: string | null;
  call_for_eoi?: string | null;
  pq_issue_date?: string | null;
  pq_document_submission_date?: string | null;
  prequalification_consultant_date?: string | null;
  prequalification_contractor_date?: string | null;
  main_contract_tender_issue_date?: string | null;
  main_contract_bid_submission_date?: string | null;
  main_contract_award_date?: string | null;
  contract_awarded_at?: string | null;
  consultant_awarded_at?: string | null;
  tender_advertised_at?: string | null;
  bid_evaluation?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  fax?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  countries: Array<{
    countries_id: {
      id: number;
      name: string;
      description?: string | null;
      sort_weight?: number;
      drupal_tid?: number;
      drupal_key?: string;
    };
  }>;

  regions?: Array<{
    regions_id: {
      id: number;
      name: string;
      user_created?: string;
    };
  }>;

  sectors?: Array<{
    sectors_id: {
      id: string;
      name: string;
      status?: string;
    };
  }>;

  types?: Array<{
    types_id: {
      id: string;
      name: string;
      status?: string;
    };
  }>;
  companies?: any[];
  client_owner?: Array<{
    id: number;
    projects_id: string;
    companies_id?: {
      id: string;
      name: string;
      website?: string;
      phone?: string;
      email?: string;
      facebook?: string;
      linkedin?: string;
    };
  }>;
  developer?: any[];
  main_contractor?: any[];
  architect?: any[];
  civil_engineer?: any[];
  structural_engineer?: any[];
  mep_engineer?: any[];
  electrical_engineer?: any[];
  geotechnical_engineer?: any[];
  design_consultant?: any[];
  study_consultant?: any[];
  quantity_surveyor?: any[];
  landscape_architect?: any[];
  legal_adviser?: any[];
  transaction_advisor?: any[];
  authority?: any[];
  operator?: any[];
  facade_subcontractor?: any[];
  lift_subcontractor?: any[];
  piling_subcontractor?: any[];
  mep_subcontractor?: any[];
  other_subcontractor?: any[];
  main_contract_bidder?: any[];
  main_contract_prequalified?: any[];
  contacts?: any[] | null;
  project_manager?: any[];
  editor_notes?: string | null;
  main_contractor_note?: string | null;
  consultant?: string | null;
  transport?: string | null;
  funding?: any[];
  specifications?: any[];
}

export interface ProjectResponse {
  data: SingleProject;
}
