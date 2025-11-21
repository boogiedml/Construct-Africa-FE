import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import { CiGrid41 } from "react-icons/ci";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetCompaniesQuery } from "../store/services/companies";
import type { Company, GroupedCompanyData, CompanyCountry } from "../types/company.types";
import {
  useGetCountriesQuery,
  useGetRegionsQuery,
  useGetSectorsQuery
} from "../store/services/reference";
import { cleanHtmlContent } from "../utils";
import type { CompanyQueryParams, AppFilters } from "../types/filter.types";
import { useInfiniteScroll } from "../store/hooks/useInfiniteScrolling";
import {
  getPresets,
  getPresetById,
  saveDefaultView,
  getDefaultView,
  type FilterPreset
} from "../utils/presets";
import { useToggleFavouriteMutation } from "../store/services/favourite";

const ITEMS_PER_PAGE = 25;

const Companies = () => {
  const navigate = useNavigate();

  // Load default view on component mount
  const defaultView = getDefaultView('companies');

  const [activeView, setActiveView] = useState(defaultView?.activeView || 'table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState(defaultView?.grouping || 'none');
  const [sortBy, setSortBy] = useState(defaultView?.sortBy || 'recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
  const [activePresetId, setActivePresetId] = useState<string | undefined>(defaultView?.presetId);

  // Infinite scroll state for grid view
  const [accumulatedCompanies, setAccumulatedCompanies] = useState<Company[]>([]);
  const [gridPage, setGridPage] = useState(1);

  // Transform grouped data into flat array with group headers
  interface GroupRow {
    id: string;
    isGroupRow: true;
    groupKey: string;
    groupId: number | string;
    totalCount: number;
    totalValue?: number;
    name: string;
    countries: never[];
    sectors: never[];
    company_role: string;
    projects: never[];
  }

  interface CompanyWithGroup extends Company {
    isGroupRow: false;
  }

  type CompanyTableRow = GroupRow | CompanyWithGroup;

  // Load presets
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  useEffect(() => {
    // Load presets from localStorage
    const loadedPresets = getPresets('companies');
    setPresets(loadedPresets);

    // If there's a default preset, load its filters
    if (defaultView?.presetId) {
      const defaultPreset = getPresetById(defaultView.presetId, 'companies');
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

  const [toggleFavourite] = useToggleFavouriteMutation();

  const handleToggleFavorite = async (row: Company | CompanyTableRow) => {
    // Skip if it's a group row
    if ('isGroupRow' in row && row.isGroupRow) return;

    const company = row as Company;
    try {
      await toggleFavourite({
        collection: "companies",
        item_id: company.id
      }).unwrap();

      toast.success('Added to favourites');
      refetch();
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
      toast.error('Failed to add favourite');
    }
  };

  // Build query parameters based on state
  const queryParams = useMemo<CompanyQueryParams>(() => {
    // Use gridPage for grid view, currentPage for table view
    const pageToUse = activeView === 'grid' ? gridPage : currentPage;

    const params: CompanyQueryParams = {
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
        params.sort = 'name';
        break;
      case 'value-high':
        params.sort = '-projects_completed';
        break;
      case 'value-low':
        params.sort = 'projects_completed';
        break;
      default:
        // Check if sortBy is a preset ID
        if (sortBy.startsWith('preset_')) {
          params.sort = '-date_created'; // Default sort for presets
        }
        break;
    }

    // Add groupBy parameter based on grouping selection (only for table view)
    if (activeView === 'table' && grouping !== 'none') {
      switch (grouping) {
        case 'country':
          params.groupBy = 'country';
          break;
        case 'sector':
          params.groupBy = 'sector';
          break;
        case 'region':
          params.groupBy = 'region';
          break;
        case 'role':
          params.groupBy = 'role';
          break;
      }
    }

    // Country filters
    if (appliedFilters.country && Array.isArray(appliedFilters.country) && appliedFilters.country.length > 0 && countriesData) {
      const country = countriesData.data.find(c => c.name === appliedFilters.country![0]);
      if (country) {
        params['filter[countries][countries_id][_eq]'] = String(country.id);
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

    // Status filters (if applicable for companies)
    if (appliedFilters.status && appliedFilters.status.length > 0) {
      params['filter[status][_eq]'] = appliedFilters.status[0];
    }

    return params;
  }, [activeView, gridPage, currentPage, sortBy, grouping, appliedFilters, countriesData, regionsData, sectorsData]);

  const { data: companiesResponse, isLoading, isFetching, refetch } = useGetCompaniesQuery(queryParams);

  // Helper function to check if data is in grouped format
  const isGroupedDataFormat = (data: unknown[]): data is GroupedCompanyData[] => {
    if (!data || data.length === 0) return false;
    const firstItem = data[0] as Record<string, unknown>;
    // Check for grouped format: has 'companies' array OR has 'data', 'name', 'count' properties
    return (
      ('companies' in firstItem && Array.isArray(firstItem.companies)) ||
      ('data' in firstItem && 'name' in firstItem && 'count' in firstItem && 'companies' in firstItem && Array.isArray(firstItem.companies))
    );
  };

  // Check if data is grouped (API returns grouped format when groupBy is used)
  // Only check for grouped data when in table view
  const isGroupedData = activeView === 'table' &&
    grouping !== 'none' &&
    companiesResponse?.data &&
    companiesResponse.data.length > 0 &&
    isGroupedDataFormat(companiesResponse.data);

  // Reset accumulated companies when filters, sorting, or grouping changes (not view - handled in handleViewChange)
  useEffect(() => {
    setAccumulatedCompanies([]);
    setGridPage(1);
    setCurrentPage(1);
  }, [sortBy, grouping, appliedFilters]);

  // Accumulate companies for grid view infinite scroll (only when grouping is disabled)
  useEffect(() => {
    if (activeView === 'grid' && grouping === 'none' && companiesResponse?.data && !isGroupedDataFormat(companiesResponse.data)) {
      if (gridPage === 1) {
        // First page - replace accumulated companies
        setAccumulatedCompanies(companiesResponse.data as Company[]);
      } else {
        // Subsequent pages - append to accumulated companies
        setAccumulatedCompanies(prev => [...prev, ...(companiesResponse.data as Company[])]);
      }
    } else if (activeView === 'grid' && grouping !== 'none') {
      // Clear accumulated companies when grouping is active
      setAccumulatedCompanies([]);
    }
  }, [companiesResponse, gridPage, activeView, grouping]);

  const groupingOptions = [
    { value: 'none', label: 'None' },
    { value: 'country', label: 'By country' },
    { value: 'sector', label: 'By sector' },
    { value: 'region', label: 'By region' },
    { value: 'role', label: 'By role' }
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
    // {
    //   id: 'stage',
    //   label: 'Stage',
    //   icon: <GoColumns size={16} />
    // }
  ];

  // Build sort options including presets
  const sortOptions = useMemo(() => {
    const baseOptions = [
      { value: 'recently-added', label: 'Recently added' },
      { value: 'oldest', label: 'Oldest first' },
      { value: 'alphabetical', label: 'Alphabetical' },
      { value: 'value-high', label: 'Projects (High to Low)' },
      { value: 'value-low', label: 'Projects (Low to High)' }
    ];

    // Add presets as sort options
    const presetOptions = presets.map(preset => ({
      value: preset.id,
      label: `${preset.name}`
    }));

    return [...baseOptions, ...presetOptions];
  }, [presets]);

  const transformGroupedData = (groupedData: GroupedCompanyData[]): CompanyTableRow[] => {
    const result: CompanyTableRow[] = [];

    groupedData.forEach((group) => {
      // Add group header row
      const groupRow: GroupRow = {
        id: `group-${group.id || group.name}`,
        isGroupRow: true,
        groupKey: group.name,
        groupId: group.id,
        totalCount: group.count || (group.companies?.length || 0),
        totalValue: group.totalValue || 0,
        name: '',
        countries: [],
        sectors: [],
        company_role: '',
        projects: []
      };
      result.push(groupRow);

      // Add company rows for this group
      if (group.companies && Array.isArray(group.companies)) {
        group.companies.forEach((company: Company) => {
          const companyWithGroup: CompanyWithGroup = {
            ...company,
            isGroupRow: false
          };
          result.push(companyWithGroup);
        });
      }
    });

    return result;
  };

  const tableColumns: TableColumn<Company | CompanyTableRow>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: '35%',
      render: (value: unknown, row: typeof companies[0]) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/companies/${row.id}`);
          }}
          className="text-left text-[#181D27] hover:text-[#F89822] transition-colors font-semibold"
        >
          {value as string || '---'}
        </button>
      )
    },
    {
      key: 'countries',
      label: 'Country',
      sortable: true,
      width: '20%',
      render: (value: unknown) => {
        if (!value) return '---';
        const countries = value as { countries_id: { name: string } }[];
        if (!Array.isArray(countries) || countries.length === 0) return '---';

        try {
          return countries
            .map(country => country?.countries_id?.name)
            .filter(Boolean)
            .join(', ') || '---';
        } catch (error) {
          console.error('Error rendering countries:', error);
          return '---';
        }
      }
    },
    {
      key: 'sectors',
      label: 'Sector',
      sortable: true,
      width: '20%',
      render: (value: unknown) => {
        if (!value) return '---';
        const sectors = value as { sectors_id: { name: string } }[];
        if (!Array.isArray(sectors) || sectors.length === 0) return '---';

        try {
          return sectors
            .map(sector => sector?.sectors_id?.name)
            .filter(Boolean)
            .join(', ') || '---';
        } catch (error) {
          console.error('Error rendering sectors:', error);
          return '---';
        }
      }
    },
    {
      key: 'company_role',
      label: 'Role',
      sortable: true,
      width: '15%',
      render: (value: unknown) => {
        return (value as string) || '---';
      }
    },
    {
      key: 'projects',
      label: 'Projects',
      sortable: true,
      width: '10%',
      render: (value) => {
        if (!value) return 0;
        if (Array.isArray(value)) {
          if (typeof value[0] === 'number' || typeof value[0] === 'string') {
            return value.length;
          }
          return value.length;
        }
        return 0;
      }
    }
  ];

  // Use accumulated companies for grid view, regular data for table view
  let companies: Company[] | CompanyTableRow[] = [];

  // Helper to check if response data matches current grouping state
  const dataMatchesGrouping = (responseData: unknown[]): boolean => {
    if (grouping === 'none') {
      // When no grouping, data should NOT be in grouped format
      return !isGroupedDataFormat(responseData);
    } else {
      // When grouping is active, data SHOULD be in grouped format
      return isGroupedDataFormat(responseData);
    }
  };

  if (activeView === 'grid') {
    // Grid view - grouping is not supported, always use accumulated companies
    companies = accumulatedCompanies;
  } else {
    // Table view logic
    if (grouping === 'none') {
      // No grouping - only use data if it's NOT in grouped format
      if (companiesResponse?.data && !isGroupedDataFormat(companiesResponse.data)) {
        companies = companiesResponse.data as Company[];
      } else {
        companies = [];
      }
    } else if (companiesResponse?.data && dataMatchesGrouping(companiesResponse.data) && isGroupedDataFormat(companiesResponse.data)) {
      // Grouping active and data is in grouped format - transform it
      companies = transformGroupedData(companiesResponse.data);
    } else {
      // Grouping active but data not in grouped format yet OR data doesn't match grouping - show empty
      companies = [];
    }
  }

  // Calculate total count - for grouped data, sum up all group counts
  const totalCount = isGroupedData && companiesResponse?.data && isGroupedDataFormat(companiesResponse.data)
    ? companiesResponse.data.reduce((sum: number, group: GroupedCompanyData) => sum + (group.count || 0), 0)
    : (companiesResponse?.meta?.filter_count || companiesResponse?.meta?.total_count || companies.length);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Check if there are more items to load for infinite scroll
  const hasMore = activeView === 'grid' && accumulatedCompanies.length < totalCount;

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

  // Handle page change (for table view)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedCompanies([]);

    // If it's a preset, load its filters
    if (newSortBy.startsWith('preset_')) {
      const preset = getPresetById(newSortBy, 'companies');
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
    setAccumulatedCompanies([]);
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedCompanies([]);

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
      'companies'
    );

    toast.success('View saved as default successfully!');
  };

  // Handle view change
  const handleViewChange = (newView: string) => {
    // Reset pagination BEFORE changing view to prevent query param conflicts
    if (newView === 'grid') {
      setGridPage(1);
      setAccumulatedCompanies([]);
    } else {
      setCurrentPage(1);
    }
    // Reset grouping when switching away from table view (grouping only works in table)
    if (newView !== 'table' && grouping !== 'none') {
      setGrouping('none');
    }
    // Change view after resetting pages
    setActiveView(newView);
  };

  // Count active filters
  const activeFiltersCount = Object.values(appliedFilters).filter(
    val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
  ).length;

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Companies</h1>
          <p className="text-[#535862]">
            Showing {activeView === 'grid' ? accumulatedCompanies.length : companies.length} {totalCount > 0 && `of ${totalCount}`} companies
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

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <Tabs
          tabs={viewTabs}
          activeTab={activeView}
          onTabChange={handleViewChange}
          variant="pills"
        />

        <div className="flex items-center gap-3">
          {activeView === 'table' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#414651]">Grouping:</span>
              <CustomSelect
                options={groupingOptions}
                value={grouping}
                onChange={handleGroupingChange}
                placeholder="None"
              />
            </div>
          )}

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
                setShowCharts(false);
                setShowFilters(!showFilters);
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
                setShowFilters(false);
                setShowCharts(!showCharts);
              }
            }}
          />
        </div>
      </div>

      <section className={showCharts || showFilters ? 'flex gap-5 w-full' : 'w-full'}>
        <div className={showCharts || showFilters ? 'flex-1 min-w-0' : 'w-full'}>
          {/* Grid Content with Infinite Scroll */}
          {activeView === 'grid' && (
            <div
              className="overflow-y-auto space-y-4"
              style={{ height: 'calc(100vh - 280px)' }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                {(companies as Company[]).map((company: Company) => (
                  <ProjectCard
                    key={company.id}
                    isLogo={true}
                    image={company.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}` : "/images/null-image.svg"}
                    status={company.company_role || "Company"}
                    title={company.name}
                    description={cleanHtmlContent(company.description) || "No description available"}
                    location={
                      company.countries && Array.isArray(company.countries) && company.countries.length > 0
                        ? company.countries.map((c: CompanyCountry) => c?.countries_id?.name).filter(Boolean).join(', ')
                        : '---'
                    }
                    category={
                      company.sectors && Array.isArray(company.sectors) && company.sectors.length > 0
                        ? (company.sectors as unknown as Array<{ sectors_id?: { name: string } }>)
                          .map((s) => s?.sectors_id?.name)
                          .filter(Boolean)
                          .join(', ') || 'Company'
                        : 'Company'
                    }
                    value={`${Array.isArray(company.projects) ? company.projects.length : 0} projects`}
                    isFavorite={false}
                    onClick={() => navigate(`/admin/companies/${company.id}`)}
                    toggleFavorite={() => handleToggleFavorite(company)}
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
              {!hasMore && accumulatedCompanies.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[#535862]">
                    You've reached the end of the list
                  </p>
                </div>
              )}

              {/* Initial loading state */}
              {isLoading && accumulatedCompanies.length === 0 && (
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
              key={`companies-table-${grouping}-${isGroupedData}`}
              data={companies as []}
              columns={tableColumns}
              onRowSelect={(rows) => console.log('Selected rows:', rows)}
              onToggleFavorite={handleToggleFavorite}
              onRowClick={(row: Company | CompanyTableRow) => {
                // Don't navigate if it's a group row
                if ('isGroupRow' in row && row.isGroupRow) return;
                const company = row as Company;
                navigate(`/admin/companies/${company.id}`);
              }}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              showFavorites={true}
              loading={isLoading || isFetching}
              pageSize={ITEMS_PER_PAGE}
              // Only use groupBy if data is not already grouped from API
              groupBy={isGroupedData ? undefined : (grouping === 'none' ? undefined : grouping === 'country' ? 'countries' : grouping === 'sector' ? 'sectors' : grouping === 'region' ? 'regions' : grouping === 'role' ? 'company_role' : undefined)}
            />
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
            type="companies"
          />
        )}
      </section>
    </div>
  );
};

export default Companies;
