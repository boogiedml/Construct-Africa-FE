import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { 
  getPresets, 
  getPresetById, 
  saveDefaultView, 
  getDefaultView,
  type FilterPreset 
} from "../utils/presets";
import { useInfiniteScroll } from "../store/hooks/useInfiniteScrolling";
import { useToggleFavouriteMutation } from "../store/services/favourite";

const ITEMS_PER_PAGE = 25;

const Projects = () => {
  const navigate = useNavigate();
  
  // Load default view on component mount
  const defaultView = getDefaultView('projects');
  
  const [activeView, setActiveView] = useState(defaultView?.activeView || 'table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState(defaultView?.grouping || 'none');
  const [sortBy, setSortBy] = useState(defaultView?.sortBy || 'recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
  const [activePresetId, setActivePresetId] = useState<string | undefined>(defaultView?.presetId);

  // Infinite scroll state for grid view
  const [accumulatedProjects, setAccumulatedProjects] = useState<Project[]>([]);
  const [gridPage, setGridPage] = useState(1);

  // Load presets
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  useEffect(() => {
    // Load presets from localStorage
    const loadedPresets = getPresets('projects');
    setPresets(loadedPresets);

    // If there's a default preset, load its filters
    if (defaultView?.presetId) {
      const defaultPreset = getPresetById(defaultView.presetId, 'projects');
      if (defaultPreset) {
        setAppliedFilters(defaultPreset.filters);
        setActivePresetId(defaultPreset.id);
      }
    }
  }, []);

  // Fetch reference data for mapping names to IDs
  const { data: countriesData } = useGetCountriesQuery();
  const { data: regionsData } = useGetRegionsQuery();
  const { data: sectorsData } = useGetSectorsQuery();
  const { data: typesData } = useGetTypesQuery();

  
    const [toggleFavourite] = useToggleFavouriteMutation();

  // Build query parameters based on state
  const queryParams = useMemo<ProjectQueryParams>(() => {
    // Use gridPage for grid view, currentPage for table/stage views
    const pageToUse = activeView === 'grid' ? gridPage : currentPage;
    
    const params: ProjectQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (pageToUse - 1) * ITEMS_PER_PAGE,
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
      default:
        // Check if sortBy is a preset ID
        if (sortBy.startsWith('preset_')) {
          params.sort = '-date_created'; // Default sort for presets
        }
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
      const country = countriesData.data.find(c => c.name === appliedFilters.country![0]);
      if (country) {
        params['filter[countries][countries_id][_eq]'] = country.id;
      }
    }

    // Region filters
    if (appliedFilters.region && Array.isArray(appliedFilters.region) && appliedFilters.region.length > 0 && regionsData) {
      const region = regionsData.data.find(r => r.name === appliedFilters.region![0]);
      if (region) {
        params['filter[regions][regions_id][_eq]'] = String(region.id);
      }
    }

    // Sector filters
    if (appliedFilters.sector && Array.isArray(appliedFilters.sector) && appliedFilters.sector.length > 0 && sectorsData) {
      const sector = sectorsData.data.find(s => s.name === appliedFilters.sector![0]);
      if (sector) {
        params['filter[sectors][sectors_id][_eq]'] = sector.id;
      }
    }

    // Type filters
    if (appliedFilters.type && Array.isArray(appliedFilters.type) && appliedFilters.type.length > 0 && typesData) {
      const type = typesData.data.find(t => t.name === appliedFilters.type![0]);
      if (type) {
        params['filter[types][types_id][_eq]'] = type.id;
      }
    }

    // Status filters
    if (appliedFilters.status && appliedFilters.status.length > 0) {
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

    return params;
  }, [activeView, gridPage, currentPage, sortBy, grouping, appliedFilters, countriesData, regionsData, sectorsData, typesData]);

  const { data: projectsResponse, isLoading, isFetching, refetch } = useGetProjectsQuery(queryParams, {
    refetchOnMountOrArgChange: true
  });

  // Reset accumulated projects when filters, sorting, or view changes
  useEffect(() => {
    if (activeView === 'grid') {
      setAccumulatedProjects([]);
      setGridPage(1);
    }
  }, [sortBy, grouping, appliedFilters, activeView]);

  // Accumulate projects for grid view infinite scroll
  useEffect(() => {
    if (activeView === 'grid' && projectsResponse?.data) {
      if (gridPage === 1) {
        // First page - replace accumulated projects
        setAccumulatedProjects(projectsResponse.data);
      } else {
        // Subsequent pages - append to accumulated projects
        setAccumulatedProjects(prev => [...prev, ...projectsResponse.data]);
      }
    }
  }, [projectsResponse, gridPage, activeView]);

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

  const mapStatusToStatusName = (status: string): string => {
    switch ((status || '').toLowerCase()) {
      case 'conceptplanning':
      case 'studyfeasibility':
      case 'design':
      case 'eoi':
      case 'maincontractbid':
      case 'maincontractidevaluation':
        return 'Upcoming';
      case 'executionunderconstruction':
        return 'Ongoing';
      case 'onhold':
        return 'On Hold';
      case 'cancelled':
        return 'Cancelled';
      case 'complete':
        return 'Complete';
      default:
        return 'Upcoming';
    }
  };

  const mapStatusToStageName = (status: string): string => {
    switch ((status || '').toLowerCase()) {
      case 'conceptplanning':
        return 'Planning';
      case 'studyfeasibility':
        return 'Study';
      case 'design':
        return 'Design';
      case 'eoi':
        return 'Qualification';
      case 'maincontractbid':
        return 'Bidding';
      case 'maincontractidevaluation':
        return 'Bids Evaluation';
      case 'executionunderconstruction':
        return 'Execution (Construction)';
      case 'onhold':
      case 'cancelled':
      case 'complete':
        return '';
      default:
        return 'Planning';
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

  // Build sort options including presets
  const sortOptions = useMemo(() => {
    const baseOptions = [
      { value: 'recently-added', label: 'Recently added' },
      { value: 'oldest', label: 'Oldest first' },
      { value: 'alphabetical', label: 'Alphabetical' },
      { value: 'value-high', label: 'Value (High to Low)' },
      { value: 'value-low', label: 'Value (Low to High)' }
    ];

    // Add presets as sort options
    const presetOptions = presets.map(preset => ({
      value: preset.id,
      label: `${preset.name}`
    }));

    return [...baseOptions, ...presetOptions];
  }, [presets]);

    const handleToggleFavorite = async (row: any) => {
      try {
        await toggleFavourite({
          collection: "projects",
          item_id: row.id
        }).unwrap();
        
        toast.success('Add to favourites');
        refetch();
      } catch (error) {
        console.error('Failed to toggle favourite:', error);
        toast.error('Failed to remove favourite');
      }
    };

  const tableColumns: TableColumn<typeof projectsWithStage[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '30%',
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
      width: '12%',
      render: (value) => {
        if (!value) return 'N/A';
        const numericValue = String(value).replace(/[^0-9.]/g, '');
        return `${parseFloat(numericValue).toLocaleString()}`;
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '12%',
      render: (value: unknown) => {
        return <span className="text-sm text-[#181D27]">{value as string || '---'}</span>;
      }
    },
    {
      key: 'stageName',
      label: 'Stage',
      sortable: true,
      width: '18%',
      render: (value: unknown, row: Project & { stage: string; status: string; stageName: string }) => {
        const stageName = value as string;
        if (!stageName) return <span className="text-sm text-[#535862]">---</span>;

        const groupStage = row.stage;
        const stageStyles = {
          'Build': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' },
          'Bid': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
          'Design': { dot: 'bg-[#2E90FA]', text: 'text-[#175CD3]', bg: 'bg-[#EFF8FF]' },
          'Study': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
          'On Hold': { dot: 'bg-[#717680]', text: 'text-[#525866]', bg: 'bg-[#F5F5F6]' },
          'Cancelled': { dot: 'bg-[#D92D20]', text: 'text-[#B42318]', bg: 'bg-[#FEF3F2]' },
          'Complete': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' }
        } as const;
        const styles = stageStyles[groupStage as keyof typeof stageStyles] || { dot: 'bg-gray-500', text: 'text-gray-600', bg: 'bg-gray-50' };
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.bg}`}>
            <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
            <span className={`text-sm font-medium ${styles.text}`}>{stageName}</span>
          </div>
        );
      }
    }
  ];

  // Use accumulated projects for grid view, regular data for other views
  const projects = activeView === 'grid' ? accumulatedProjects : (projectsResponse?.data || []);
  
  const projectsWithStage = projects.map((p: Project) => ({
    ...p,
    stage: mapStatusToGroup(p.current_stage),
    status: mapStatusToStatusName(p.current_stage),
    stageName: mapStatusToStageName(p.current_stage)
  }));
  
  const totalCount = projectsResponse?.meta?.filter_count || projectsResponse?.meta?.total_count || projects.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  
  // Check if there are more items to load for infinite scroll
  const hasMore = activeView === 'grid' && accumulatedProjects.length < totalCount;

  // Handle load more for infinite scroll
  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setGridPage(prev => prev + 1);
    }
  };

  // Infinite scroll hook
  const observerTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading: isFetching,
    rootMargin: '100px'
  });

  // Handle page change (for table/stage views)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedProjects([]);

    // If it's a preset, load its filters
    if (newSortBy.startsWith('preset_')) {
      const preset = getPresetById(newSortBy, 'projects');
      if (preset) {
        setAppliedFilters(preset.filters);
        setActivePresetId(preset.id);
      }
    } else {
      // If switching away from a preset, clear preset-specific state
      if (activePresetId) {
        setActivePresetId(undefined);
      }
    }
  };

  // Handle grouping change
  const handleGroupingChange = (newGrouping: string) => {
    setGrouping(newGrouping);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedProjects([]);
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedProjects([]);
    
    // Clear active preset since filters were manually changed
    setActivePresetId(undefined);
    
    // If sortBy was a preset, reset to default
    if (sortBy.startsWith('preset_')) {
      setSortBy('recently-added');
    }
  };

  // Handle save view as default
  const handleSaveViewAsDefault = () => {
    saveDefaultView(
      {
        sortBy,
        grouping,
        activeView,
        presetId: activePresetId
      },
      'projects'
    );
    
    toast.success('View saved as default successfully!');
  };

  // Handle view change
  const handleViewChange = (newView: string) => {
    setActiveView(newView);
    
    // Reset pagination when switching views
    if (newView === 'grid') {
      setGridPage(1);
      setAccumulatedProjects([]);
    } else {
      setCurrentPage(1);
    }
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
            Showing {activeView === 'grid' ? accumulatedProjects.length : projects.length} {totalCount > 0 && `of ${totalCount}`} projects
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
            attributes={{
              onClick: handleSaveViewAsDefault
            }}
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
          onTabChange={handleViewChange}
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
          {/* Grid Content with Infinite Scroll */}
          {activeView === 'grid' && (
            <div 
              className="overflow-y-auto space-y-4"
              style={{ height: 'calc(100vh - 280px)' }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                {projectsWithStage.map((project: Project & { stage: string; status: string; stageName: string }) => (
                  <ProjectCard
                    key={project.id}
                    image={project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg"}
                    status={project.status}
                    stageName={project.stageName}
                    stageGroup={project.stage}
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

              {/* Loading skeleton for infinite scroll */}
              {isFetching && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6 mt-6`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
                  ))}
                </div>
              )}

              {/* Intersection observer target */}
              {hasMore && !isFetching && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                  <span className="text-sm text-[#535862]">Loading more...</span>
                </div>
              )}

              {/* End of results message */}
              {!hasMore && accumulatedProjects.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[#535862]">
                    You've reached the end of the list
                  </p>
                </div>
              )}

              {/* Initial loading state */}
              {isLoading && accumulatedProjects.length === 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProjectCardSkeleton key={`initial-skeleton-${index}`} />
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
              onToggleFavorite={handleToggleFavorite}
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
                data={projectsWithStage.map((project: Project & { stage: string; status: string; stageName: string }) => ({
                  ...project,
                  stage: project.stage,
                  image: project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg",
                  status: project.status,
                  stageName: project.stageName,
                  stageGroup: project.stage,
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
