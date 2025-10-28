import { useState, useMemo } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuBookMarked, LuTable, LuFilter } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import { HiOutlineChartBar } from "react-icons/hi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetCompaniesQuery } from "../store/services/companies";
import { cleanHtmlContent } from "../utils";
import type { CompanyQueryParams } from "../types/filter.types";

const ITEMS_PER_PAGE = 25;

const Companies = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter states
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  // Build query parameters based on state
  const queryParams = useMemo<CompanyQueryParams>(() => {
    const params: CompanyQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
    };

    // Add search if exists
    if (searchTerm) {
      params.search = searchTerm;
    }

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

    // Add grouping filters
    switch (grouping) {
      case 'country':
        if (selectedCountry) {
          params['filter[countries][countries_id][_eq]'] = selectedCountry;
        }
        break;
      case 'sector':
        if (selectedSector) {
          params['filter[sectors][_contains]'] = selectedSector;
        }
        break;
      case 'region':
        if (selectedRegion) {
          params['filter[regions][_contains]'] = selectedRegion;
        }
        break;
      // 'type' and 'projects' grouping can be added here
    }

    return params;
  }, [currentPage, sortBy, searchTerm, grouping, selectedCountry, selectedSector, selectedRegion]);

  const { data: companiesResponse, isLoading, isFetching } = useGetCompaniesQuery(queryParams);

  const groupingOptions = [
    { value: 'country', label: 'By country' },
    { value: 'sector', label: 'By sector' },
    { value: 'region', label: 'By region' },
    { value: 'type', label: 'By type' },
    { value: 'projects', label: 'By projects' }
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

  const tableColumns: TableColumn<typeof companies[0]>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: '40%'
    },
    {
      key: 'location_details',
      label: 'Country',
      sortable: true,
      width: '25%',
      render: (value) => cleanHtmlContent(value as string | null)
    },
    {
      key: 'website',
      label: 'Website',
      sortable: false,
      width: '25%',
      render: (value: unknown) => value ? (
        <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {value as string}
        </a>
      ) : (
        <span className="text-gray-500">---</span>
      )
    },
    {
      key: 'projects',
      label: 'Projects count',
      sortable: true,
      width: '10%',
      render: (value) => (value as number[]).length
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
    // Reset filters when grouping changes
    setSelectedCountry('');
    setSelectedSector('');
    setSelectedRegion('');
  };

  // Group companies by the selected grouping option
  const groupedCompanies = useMemo(() => {
    if (!companies.length) return {};

    const groups: Record<string, typeof companies> = {};

    companies.forEach((company) => {
      let groupKey = 'Uncategorized';

      switch (grouping) {
        case 'country':
          groupKey = company.countries?.[0]?.countries_id?.name || 'Unknown Country';
          break;
        case 'sector':
          groupKey = company.sectors?.[0]?.toString() || 'Unknown Sector';
          break;
        case 'region':
          groupKey = company.regions?.[0]?.toString() || 'Unknown Region';
          break;
        case 'type':
          groupKey = company.company_role || 'Unknown Type';
          break;
        case 'projects':
          const projectCount = company.projects?.length || 0;
          if (projectCount === 0) groupKey = 'No Projects';
          else if (projectCount < 5) groupKey = '1-4 Projects';
          else if (projectCount < 10) groupKey = '5-9 Projects';
          else groupKey = '10+ Projects';
          break;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(company);
    });

    return groups;
  }, [companies, grouping]);

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Companies</h1>
          <p className="text-[#535862]">
            Showing {companies.length} {totalCount > 0 && `of ${totalCount}`} companies
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
            <span className="text-sm text-[#535862]">Grouping:</span>
            <CustomSelect
              options={groupingOptions}
              value={grouping}
              onChange={handleGroupingChange}
              placeholder="By country"
            />
          </div>

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuFilter size={16} />
                Filters
              </div>
            }
            outline={true}
            width="fit"
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <HiOutlineChartBar size={16} />
                Show charts
              </div>
            }
            outline={true}
            width="fit"
          />
        </div>
      </div>

      {/* Grid Content with Grouping */}
      {activeView === 'grid' && (
        <div className="space-y-8">
          {isLoading || isFetching ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            Object.entries(groupedCompanies).map(([groupName, groupCompanies]) => (
              <div key={groupName}>
                <h2 className="text-xl font-semibold text-[#181D27] mb-4">
                  {groupName} ({groupCompanies.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupCompanies.map((company) => (
                    <ProjectCard
                      key={company.id}
                      image={company.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}` : "/images/null-image.svg"}
                      status={company.company_role || "Company"}
                      title={company.name}
                      description={cleanHtmlContent(company.description) || "No description available"}
                      location={cleanHtmlContent(company.location_details)}
                      category="Company"
                      isFavorite={false}
                    />
                  ))}
                </div>
              </div>
            ))
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
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={isLoading || isFetching}
          pageSize={ITEMS_PER_PAGE}
        />
      )}

      {/* Stage View with Grouping */}
      {activeView === 'stage' && (
        <StageView
          data={companies.map(company => ({
            ...company,
            stage: 'Active',
            image: company.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}` : "/images/null-image.svg",
            status: company.company_role || "Company",
            description: company.description || "No description available",
            location: cleanHtmlContent(company.location_details),
            category: "Company",
            value: "---",
            isFavorite: false,
            title: company.name
          }))}
          stageKey="stage"
        />
      )}
    </div>
  )
}

export default Companies;
