import { noAuthApi } from "./index";
import { buildQueryString } from "../../utils/index";
import type { EventQueryParams } from "../../types/filter.types";
import type { EventResponse, Event } from "../../types/events.types";

export interface SingleEventResponse {
  data: Event;
}

export const eventApi = noAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse, EventQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<EventQueryParams> = {
          fields:
            "*,featured_image.*,event_type.*",
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/events${queryString}`;
      },
    }),
    getEventById: builder.query<SingleEventResponse, string>({
      query: (id) => ({
        url: `items/events/${id}?fields=*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,event_type.*`,
      }),
    }),
    getUpcomingEvents: builder.query<EventResponse, EventQueryParams | void>({
      query: (params = {}) => {
        const today = new Date().toISOString();
        const defaultParams: Partial<EventQueryParams> = {
          fields:
            "*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,event_type.*",
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/events${queryString}`;
      },
    }),
    getPastEvents: builder.query<EventResponse, EventQueryParams | void>({
      query: (params = {}) => {
        const today = new Date().toISOString();
        const defaultParams: Partial<EventQueryParams> = {
          fields:
            "*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*,regions.regions_id.*,event_type.*",
          limit: 25,
          offset: 0,
          "filter[end_date][_lte]": today,
          sort: "-end_date",
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/events${queryString}`;
      },
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetUpcomingEventsQuery,
  useGetPastEventsQuery,
} = eventApi;