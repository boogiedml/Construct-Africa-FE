// pages/Projects.tsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import { useGetProjectsQuery } from "../store/services/projects";
import type { Project } from "../types/project.types";
import type { ProjectQueryParams, AppFilters } from "../types/filter.types";
import {
  useGetCountriesQuery,
  useGetRegionsQuery,
  useGetSectorsQuery,
  useGetTypesQuery
} from "../store/services/reference";

const ITEMS_PER_PAGE = 25;

const Projects = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('none');
  const [sortBy, setSortBy] = useState('recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});

  // Fetch reference data for mapping names to IDs
  const { data: countriesData } = useGetCountriesQuery();
  const { data: regionsData } = useGetRegionsQuery();
  const { data: sectorsData } = useGetSectorsQuery();
  const { data: typesData } = useGetTypesQuery();

  // Build query parameters based on state
  const queryParams = useMemo<ProjectQueryParams>(() => {
    const params: ProjectQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
    };

    // Add sorting
    switch (sortBy) {
      case 'recently-added':
        params.sort = '-date_created';
        break;
      case 'oldest':
        params.sort = 'date_created';
        break;
      case 'alphabetical':
        params.sort = 'title';
        break;
      case 'value-high':
        params.sort = '-contract_value_usd';
        break;
      case 'value-low':
        params.sort = 'contract_value_usd';
        break;
    }

    // Add groupBy parameter based on grouping selection
    if (grouping !== 'none') {
      switch (grouping) {
        case 'country':
          params.groupBy = 'countries.countries_id.name';
          break;
        case 'sector':
          params.groupBy = 'sectors.sectors_id.name';
          break;
        case 'stage':
          params.groupBy = 'current_stage';
          break;
        case 'value':
          params.groupBy = 'contract_value_usd';
          break;
      }
    }

    // Country filters - Map country names to IDs
    if (appliedFilters.country && Array.isArray(appliedFilters.country) && appliedFilters.country.length > 0 && countriesData) {
      console.log('Processing country filter:', appliedFilters.country);
      const country = countriesData.data.find(c => c.name === appliedFilters.country![0]);
      console.log('Found country:', country);

      if (country) {
        params['filter[countries][countries_id][_eq]'] = country.id;
        console.log('Added country filter:', country.id);
      }
    }

    // Region filters
    if (appliedFilters.region && Array.isArray(appliedFilters.region) && appliedFilters.region.length > 0 && regionsData) {
      console.log('Processing region filter:', appliedFilters.region);
      const region = regionsData.data.find(r => r.name === appliedFilters.region![0]);
      console.log('Found region:', region);

      if (region) {
        params['filter[regions][regions_id][_eq]'] = String(region.id);
        console.log('Added region filter:', region.id);
      }
    }

    // Sector filters
    if (appliedFilters.sector && Array.isArray(appliedFilters.sector) && appliedFilters.sector.length > 0 && sectorsData) {
      console.log('Processing sector filter:', appliedFilters.sector);
      const sector = sectorsData.data.find(s => s.name === appliedFilters.sector![0]);
      console.log('Found sector:', sector);

      if (sector) {
        params['filter[sectors][sectors_id][_eq]'] = sector.id;
        console.log('Added sector filter:', sector.id);
      }
    }

    // Type filters
    if (appliedFilters.type && Array.isArray(appliedFilters.type) && appliedFilters.type.length > 0 && typesData) {
      console.log('Processing type filter:', appliedFilters.type);
      const type = typesData.data.find(t => t.name === appliedFilters.type![0]);
      console.log('Found type:', type);

      if (type) {
        params['filter[types][types_id][_eq]'] = type.id;
        console.log('Added type filter:', type.id);
      }
    }

    // Status filters
    if (appliedFilters.status && appliedFilters.status.length > 0) {
      // Map UI status names to API values if needed
      const statusMap: Record<string, string> = {
        'Planning': 'Plan',
        'Design': 'Design',
        'Bid': 'Bid',
        'Build': 'Build',
        'Completed': 'Completed'
      };
      const mappedStatus = statusMap[appliedFilters.status[0]] || appliedFilters.status[0];
      params['filter[current_stage][_eq]'] = mappedStatus;
    }

    // Value filters
    if (appliedFilters.value && Array.isArray(appliedFilters.value) && appliedFilters.value.length > 0) {
      const range = appliedFilters.value[0];

      if (range === '< $10m') {
        params['filter[contract_value_usd][_lte]'] = 10000000;
      } else if (range === '$10m – $50m') {
        params['filter[contract_value_usd][_gte]'] = 10000000;
        params['filter[contract_value_usd][_lte]'] = 50000000;
      } else if (range === '$50m – $100m') {
        params['filter[contract_value_usd][_gte]'] = 50000000;
        params['filter[contract_value_usd][_lte]'] = 100000000;
      } else if (range === '$100m – $500m') {
        params['filter[contract_value_usd][_gte]'] = 100000000;
        params['filter[contract_value_usd][_lte]'] = 500000000;
      } else if (range === '$500m+') {
        params['filter[contract_value_usd][_gte]'] = 500000000;
      }
    }

    console.log('Query Params:', params);

    return params;
  }, [currentPage, sortBy, grouping, appliedFilters, countriesData, regionsData, sectorsData, typesData]);

  const { data: projectsResponse, isLoading, isFetching } = useGetProjectsQuery(queryParams, {
    refetchOnMountOrArgChange: true
  });

  // Map raw status to stage group label for the current page data
  const mapStatusToGroup = (status: string): string => {
    switch ((status || '').toLowerCase()) {
      case 'conceptplanning':
      case 'studyfeasibility':
        return 'Study';
      case 'design':
        return 'Design';
      case 'eoi':
      case 'maincontractbid':
      case 'maincontractidevaluation':
        return 'Bid';
      case 'executionunderconstruction':
        return 'Build';
      case 'onhold':
        return 'On Hold';
      case 'cancelled':
        return 'Cancelled';
      case 'complete':
        return 'Complete';
      default:
        return 'Study';
    }
  };

  const groupingOptions = [
    { value: 'none', label: 'None' },
    { value: 'country', label: 'By country' },
    { value: 'sector', label: 'By sector' },
    { value: 'stage', label: 'By stage' },
    { value: 'value', label: 'By value' }
  ];

  const viewTabs: TabItem[] = [
    {
      id: 'table',
      label: 'Table',
      icon: <LuTable size={16} />
    },
    {
      id: 'grid',
      label: 'Grid',
      icon: <CiGrid41 size={16} />
    },
    {
      id: 'stage',
      label: 'Stage',
      icon: <GoColumns size={16} />
    }
  ];

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'value-high', label: 'Value (High to Low)' },
    { value: 'value-low', label: 'Value (Low to High)' }
  ];

  const tableColumns: TableColumn<typeof projectsWithStage[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '35%',
      render: (value: unknown, row: Project) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/projects/${row.id}`);
          }}
          className="text-left text-[#181D27] hover:text-[#F89822] transition-colors font-semibold"
        >
          {value as string}
        </button>
      )
    },
    {
      key: 'sectors',
      label: 'Sector',
      sortable: true,
      width: '15%',
      render: (value: unknown) => {
        const sectors = value as { sectors_id: { name: string } }[];
        return sectors?.map(sector => sector.sectors_id.name).join(', ') || '---';
      }
    },
    {
      key: 'countries',
      label: 'Country',
      sortable: true,
      width: '15%',
      render: (value: unknown) => {
        const countries = value as { countries_id: { name: string } }[];
        return countries?.map(country => country.countries_id.name).join(', ') || '---';
      }
    },
    {
      key: 'contract_value_usd',
      label: 'Value ($mn)',
      sortable: true,
      width: '15%',
      render: (value) => {
        if (!value) return 'N/A';
        const numericValue = String(value).replace(/[^0-9.]/g, '');
        return `${parseFloat(numericValue).toLocaleString()}`;
      }
    },
    {
      key: 'stage',
      label: 'Stage',
      sortable: true,
      width: '20%',
      render: (value: unknown) => {
        const stageStyles = {
          'Build': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' },
          'Bid': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
          'Design': { dot: 'bg-[#2E90FA]', text: 'text-[#175CD3]', bg: 'bg-[#EFF8FF]' },
          'Study': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
          'On Hold': { dot: 'bg-[#717680]', text: 'text-[#525866]', bg: 'bg-[#F5F5F6]' },
          'Cancelled': { dot: 'bg-[#D92D20]', text: 'text-[#B42318]', bg: 'bg-[#FEF3F2]' },
          'Complete': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' }
        } as const;
        const stageName = value as string;
        const styles = stageStyles[stageName as keyof typeof stageStyles] || { dot: 'bg-gray-500', text: 'text-gray-600', bg: 'bg-gray-50' };
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.bg}`}>
            <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
            <span className={`text-sm font-medium ${styles.text}`}>{stageName}</span>
          </div>
        );
      }
    }
  ];

  const projects = projectsResponse?.data || [];
  const projectsWithStage = projects.map((p: Project) => ({ ...p, stage: mapStatusToGroup(p.current_stage) }));
  const totalCount = projectsResponse?.meta?.filter_count || projectsResponse?.meta?.total_count || projects.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Handle grouping change
  const handleGroupingChange = (newGrouping: string) => {
    setGrouping(newGrouping);
    setCurrentPage(1);
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    console.log('Applying filters:', filters);
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFiltersCount = Object.values(appliedFilters).filter(
    val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
  ).length;

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Projects</h1>
          <p className="text-[#535862]">
            Showing {projects.length} {totalCount > 0 && `of ${totalCount}`} projects
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <PiFloppyDisk />
                Save view as default
              </div>
            }
            outline={true}
            borderless
            width="fit"
          />

          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Recently added"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs
          tabs={viewTabs}
          activeTab={activeView}
          onTabChange={setActiveView}
          variant="pills"
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#414651]">Grouping:</span>
            <CustomSelect
              options={groupingOptions}
              value={grouping}
              onChange={handleGroupingChange}
              placeholder="None"
            />
          </div>

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <CgSortAz size={20} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowCharts(false)
                setShowFilters(!showFilters)
              }
            }}
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuChartPie />
                {showCharts ? 'Hide' : 'Show'} charts
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowFilters(false)
                setShowCharts(!showCharts)
              }
            }}
          />
        </div>
      </div>

      <section className={showCharts || showFilters ? 'flex gap-5' : ''}>
        <div className={showCharts || showFilters ? 'flex-1' : ''}>
          {/* Grid Content */}
          {activeView === 'grid' && (
            <div className="space-y-4">
              {isLoading || isFetching ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProjectCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {projectsWithStage.map((project: Project & { stage: string }) => (
                    <ProjectCard
                      key={project.id}
                      image={project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg"}
                      status={project.stage}
                      title={project.title}
                      description={project.description || ''}
                      location={project.countries.map((country: { countries_id: { name: string } }) => country.countries_id.name).join(', ') || '---'}
                      category={project.sectors.map((sector: { sectors_id: { name: string } }) => sector.sectors_id.name).join(', ') || '---'}
                      value={`$${project.contract_value_usd || 0} million`}
                      isFavorite={false}
                      onClick={() => navigate(`/admin/projects/${project.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Table View */}
          {activeView === 'table' && (
            <DataTable
              data={projectsWithStage as []}
              columns={tableColumns}
              onRowSelect={(rows) => console.log('Selected rows:', rows)}
              onToggleFavorite={(row) => {
                console.log('Toggle favorite:', row);
              }}
              onRowClick={(row: Project) => navigate(`/admin/projects/${row.id}`)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              showCheckboxes={true}
              showFavorites={true}
              loading={isLoading || isFetching}
              pageSize={ITEMS_PER_PAGE}
              groupBy={grouping === 'none' ? undefined : grouping === 'sector' ? 'sectors' : grouping === 'country' ? 'countries' : grouping === 'stage' ? 'stage' : undefined}
              valueColumn="contract_value_usd"
            />
          )}

          {/* Stage View */}
          {activeView === 'stage' && (
            isLoading || isFetching ? (
              <div className="w-full">
                {/* Stage Navigation Skeleton */}
                <div className="bg-[#535862] rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-4 gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="h-5 bg-gray-600 rounded w-20 animate-pulse"></div>
                        {index < 3 && (
                          <div className="text-white mx-2">
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Stage Columns Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, stageIndex) => (
                    <div key={`stage-skeleton-${stageIndex}`} className="space-y-4">
                      {Array.from({ length: 2 }).map((_, cardIndex) => (
                        <ProjectCardSkeleton key={`skeleton-${stageIndex}-${cardIndex}`} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <StageView
                data={projectsWithStage.map((project: Project & { stage: string }) => ({
                  ...project,
                  stage: project.stage,
                  image: project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg",
                  status: project.stage,
                  description: project.description || '',
                  location: project.countries.map((country: { countries_id: { name: string } }) => country.countries_id.name).join(', ') || '---',
                  category: project.sectors.map((sector: { sectors_id: { name: string } }) => sector.sectors_id.name).join(', ') || '---',
                  value: `$${project.contract_value_usd || 0} million`,
                  isFavorite: false
                }))}
                stageKey="stage"
                onProjectClick={(id) => navigate(`/admin/projects/${id}`)}
              />
            )
          )}
        </div>

        {showCharts && (
          <ChartsSidebar isOpen={showCharts} />
        )}

        {showFilters && (
          <FiltersSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={appliedFilters}
            type="projects"
          />
        )}
      </section>
    </div>
  );
};

export default Projects;