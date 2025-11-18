// // Event Type (reference)
// interface EventType {
//   id: string;
//   // Add other event type fields as needed
// }

// // Featured Image (reference)
// interface FeaturedImage {
//   id: string;
//   storage: string;
//   filename_disk: string;
//   filename_download: string;
//   title: string | null;
//   type: string;
//   folder: string | null;
//   uploaded_by: string;
//   created_on: string;
//   modified_by: string | null;
//   modified_on: string;
//   charset: string | null;
//   filesize: string;
//   width: number;
//   height: number;
//   duration: string | null;
//   embed: string | null;
//   description: string | null;
//   location: string | null;
//   tags: string | null;
//   metadata: Record<string, unknown>;
//   focal_point_x: number | null;
//   focal_point_y: number | null;
//   tus_id: string | null;
//   tus_data: string | null;
//   uploaded_on: string;
//   drupal_uuid: string;
//   drupal_id: number | null;
// }

// // Main Event interface
// interface Event {
//   id: string;
//   status: 'draft' | 'published' | 'archived';
//   user_created: string;
//   date_created: string;
//   user_updated: string | null;
//   date_updated: string;
//   drupal_nid: string;
//   title: string;
//   slug: string;
//   description: string;
//   summary: string | null;
//   start_date: string;
//   end_date: string;
//   state: string | null;
//   city: string | null;
//   venue_address: string;
//   country: string; // ISO country code (e.g., 'US', 'ZA', 'PL')
//   registration_required: 0 | 1; // Boolean as number
//   registration_deadline: string;
//   contact_number: string | null;
//   contact_email: string;
//   event_website: string;
//   event_website_label: string;
//   drupal_path: string;
//   moderation_state: 'published' | 'unpublished' | 'draft';
//   featured_image: string; // UUID reference to image
//   event_type: string; // UUID reference to event type
// }

// // If you need the full nested objects instead of just IDs
// interface EventWithRelations extends Omit<Event, 'featured_image' | 'event_type'> {
//   featured_image: FeaturedImage;
//   event_type: EventType;
// }

// // API Response type
// interface EventsResponse {
//   data: Event[];
//   meta?: {
//     total_count?: number;
//     filter_count?: number;
//   };
// }



// types/event.types.ts

export interface EventImage {
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

export interface EventType {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
}

export interface Event {
  id: string;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string;
  drupal_nid: string;
  title: string;
  slug: string;
  description: string;
  summary: string | null;
  start_date: string;
  end_date: string;
  state: string | null;
  city: string | null;
  venue_address: string;
  country: string;
  registration_required: 0 | 1;
  registration_deadline: string;
  contact_number: string | null;
  contact_email: string;
  event_website: string;
  event_website_label: string;
  drupal_path: string;
  moderation_state: string;
  featured_image: string | EventImage | null;
  event_type: string | EventType | null;
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

export interface EventResponse {
  data: Event[];
  meta?: {
    filter_count: number;
    total_count: number;
  };
}