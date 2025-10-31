import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
import { LuBookMarked, LuTable, LuChartPie } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import { CiGrid41 } from "react-icons/ci";
// import { GoColumns } from "react-icons/go";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetCompaniesQuery } from "../store/services/companies";
import {
  useGetCountriesQuery,
  useGetRegionsQuery,
  useGetSectorsQuery
} from "../store/services/reference";
import { cleanHtmlContent } from "../utils";
import type { CompanyQueryParams, AppFilters } from "../types/filter.types";

const ITEMS_PER_PAGE = 25;

const Companies = () => {
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

  // Build query parameters based on state
  const queryParams = useMemo<CompanyQueryParams>(() => {
    const params: CompanyQueryParams = {
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
        params.sort = 'name';
        break;
      case 'value-high':
        params.sort = '-projects_completed';
        break;
      case 'value-low':
        params.sort = 'projects_completed';
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
        case 'region':
          params.groupBy = 'regions.regions_id.name';
          break;
        case 'role':
          params.groupBy = 'company_role';
          break;
      }
    }

    // Apply filters - Map names to IDs
    console.log('Applied Filters:', appliedFilters);

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

    // Role filters
    // if (appliedFilters.role && Array.isArray(appliedFilters.role) && appliedFilters.role.length > 0) {
    //   params['filter[company_role][_contains]'] = appliedFilters.role[0];
    // }

    console.log('Query Params:', params);

    return params;
  }, [currentPage, sortBy, grouping, appliedFilters, countriesData, regionsData, sectorsData]);

  const { data: companiesResponse, isLoading, isFetching } = useGetCompaniesQuery(queryParams);

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

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'value-high', label: 'Projects (High to Low)' },
    { value: 'value-low', label: 'Projects (Low to High)' }
  ];

  const tableColumns: TableColumn<typeof companies[0]>[] = [
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
        // ✅ Handle both array of IDs and array of objects
        if (!value) return 0;
        if (Array.isArray(value)) {
          // If it's an array of numbers (IDs)
          if (typeof value[0] === 'number' || typeof value[0] === 'string') {
            return value.length;
          }
          // If it's an array of objects
          return value.length;
        }
        return 0;
      }
    }
  ];

  const companies = companiesResponse?.data || [];
  const totalCount = companiesResponse?.meta?.filter_count || companiesResponse?.meta?.total_count || companies.length;
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
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Companies</h1>
          <p className="text-[#535862]">
            Showing {companies.length} {totalCount > 0 && `of ${totalCount}`} companies
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuBookMarked size={16} />
                Save view as default
              </div>
            }
            outline={true}
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

      {/* View Controls */}
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
                  {companies.map((company: any) => (
                    <ProjectCard
                      key={company.id}
                      image={company.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}` : "/images/null-image.svg"}
                      status={company.company_role || "Company"}
                      title={company.name}
                      description={cleanHtmlContent(company.description) || "No description available"}
                      location={
                        company.countries && Array.isArray(company.countries) && company.countries.length > 0
                          ? company.countries.map((c: any) => c?.countries_id?.name).filter(Boolean).join(', ')
                          : '---'
                      }
                      category={
                        company.sectors && Array.isArray(company.sectors) && company.sectors.length > 0
                          ? company.sectors.map((s: any) => s?.sectors_id?.name).filter(Boolean).join(', ')
                          : 'Company'
                      }
                      value={`${Array.isArray(company.projects) ? company.projects.length : 0} projects`}
                      isFavorite={false}
                      onClick={() => navigate(`/admin/companies/${company.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Table View */}
          {activeView === 'table' && (
            <DataTable
              data={companies as []}
              columns={tableColumns}
              onRowSelect={(rows) => console.log('Selected rows:', rows)}
              onToggleFavorite={(row) => {
                console.log('Toggle favorite:', row);
              }}
              onRowClick={(row: any) => navigate(`/admin/companies/${row.id}`)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              showCheckboxes={true}
              showFavorites={true}
              loading={isLoading || isFetching}
              pageSize={ITEMS_PER_PAGE}
            />
          )}

          {/* Stage View */}
          {activeView === 'stage' && (
            isLoading || isFetching ? (
              <div className="w-full">...</div>
            ) : (
              <StageView
                data={companies.map((company: any) => ({
                  ...company,
                  stage: 'Active',
                  image: company.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}` : "/images/null-image.svg",
                  status: company.company_role || "Company",
                  description: cleanHtmlContent(company.description) || "No description available",
                  location: company.countries && Array.isArray(company.countries) && company.countries.length > 0
                    ? company.countries.map((c: any) => c?.countries_id?.name).filter(Boolean).join(', ')
                    : '---',
                  category: company.sectors && Array.isArray(company.sectors) && company.sectors.length > 0
                    ? company.sectors.map((s: any) => s?.sectors_id?.name).filter(Boolean).join(', ')
                    : 'Company',
                  value: `${Array.isArray(company.projects) ? company.projects.length : 0} projects`,
                  isFavorite: false,
                  title: company.name
                }))}
                stageKey="stage"
                onProjectClick={(id) => navigate(`/admin/companies/${id}`)}
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
            type="companies"
          />
        )}
      </section>
    </div>
  );
};

export default Companies;