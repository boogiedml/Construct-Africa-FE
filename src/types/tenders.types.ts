export interface TenderImage {
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

export interface Tender {
  id: string;
  drupal_nid: number;
  status: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  featured_image: string | TenderImage | null;
  is_free_tender: boolean;
  read_time: string | { auto: number | null; minutes: number; seconds: number } | null;
  promote: boolean;
  sticky: boolean;
  created_by: string;
  date_created: string;
  date_updated: string | null;
  moderation_state: string;
  drupal_path: string | null;
}

export interface TendersResponse {
  data: Tender[];
  meta?: {
    filter_count: number;
    total_count: number;
  };
}