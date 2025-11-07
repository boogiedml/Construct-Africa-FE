export interface NewsImage {
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

export interface NewsCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
}

export interface NewsSponsor {
  id: string;
  name: string;
  logo?: string | null;
  website?: string | null;
}

export interface NewsAuthor {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  avatar?: string | null;
}

export interface News {
  id: string;
  drupal_nid: number;
  status: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  featured_image: string | NewsImage | null;
  category_id: string | NewsCategory | null;
  author_id: string | NewsAuthor | null;
  is_sponsored: boolean;
  sponsor_id: string | NewsSponsor | null;
  sponsor_url: string | null;
  banner_link: string | null;
  is_spotlight: boolean;
  is_free_news: boolean;
  read_time: string | { auto: number | null; minutes: number; seconds: number };
  promote: boolean;
  sticky: boolean;
  comments_enabled: boolean;
  comment_count: number;
  created_by: string;
  date_created: string;
  date_updated: string | null;
  moderation_state: string;
  drupal_path: string;
  countries?: Array<{
    countries_id: {
      id: number;
      name: string;
    };
  }>;
  sectors?: Array<{
    sectors_id: {
      id: string;
      name: string;
    };
  }>;
  regions?: Array<{
    regions_id: {
      id: number;
      name: string;
    };
  }>;
}

export interface NewsResponse {
  data: News[];
  meta?: {
    filter_count: number;
    total_count: number;
  };
}
