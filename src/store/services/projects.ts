import { baseApi } from './index';
import { buildQueryString } from '../../utils/index';
import type { ProjectsResponse } from '../../types/project.types';
import type { ProjectQueryParams } from '../../types/filter.types';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, ProjectQueryParams | void>({
      query: (params = {}) => {
        const defaultParams: Partial<ProjectQueryParams> = {
          fields: '*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*',
          limit: 25,
          offset: 0,
        };

        const queryString = buildQueryString({ ...defaultParams, ...params });
        return `items/projects${queryString}`;
      },
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
