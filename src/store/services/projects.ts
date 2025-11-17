import { baseApi } from './index';
import type { ProjectsResponse, ProjectResponse } from '../../types/project.types';
import type { ProjectQueryParams } from '../../types/filter.types';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, ProjectQueryParams>({
      query: (params) => ({
        url: 'projects',
        params: {
          // fields: '',
          ...params,
        },
      }),
    }),

    getProjectById: builder.query<ProjectResponse, string>({
      query: (id) => ({
        url: `projects/${id}`,
        params: {
          fields: '*,countries.countries_id.*,regions.regions_id.*,sectors.sectors_id.*,types.types_id.*,featured_image.*,client_owner.companies_id.*,developer.companies_id.*,main_contractor.companies_id.*,architect.companies_id.*,civil_engineer.companies_id.*,structural_engineer.companies_id.*,mep_engineer.companies_id.*,design_consultant.companies_id.*,study_consultant.companies_id.*,quantity_surveyor.companies_id.*,project_manager.contacts_id.*',
        },
      }),
    }),

    getTrendingProjects: builder.query<ProjectsResponse, void>({
      query: () => ({
        url: '/projects/public/trending',
      }),
    }),
    getRecentProjects: builder.query<ProjectsResponse, void>({
      query: () => ({
        url: '/projects/public/recent',
      }),
    }),
  }),
});

export const { 
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetTrendingProjectsQuery,
  useGetRecentProjectsQuery
} = projectsApi;