import { useState } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuBookMarked, LuTable, LuFilter } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import { HiOutlineChartBar } from "react-icons/hi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetCompaniesQuery } from "../store/services/companies";
import { cleanHtmlContent } from "../utils";

const Companies = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');

  const { data: companiesResponse, isLoading } = useGetCompaniesQuery();

  // const { data: countriesResponse } = useGetCountriesQuery();
  // const { data: regionsResponse } = useGetRegionsQuery();

  const groupingOptions = [
    { value: 'country', label: 'By country' },
    { value: 'sector', label: 'By sector' },
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
  // const countries = countriesResponse?.data || [];
  // const regions = regionsResponse?.data || [];

  // const { countriesMap, regionsMap } = createLookupMaps(countries, regions);

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Companies</h1>
          <p className="text-[#535862]">Showing recently added companies</p>
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
            onChange={setSortBy}
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
              onChange={setGrouping}
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

      {/* Grid Content */}
      {activeView === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companies.map((company) => (
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
          onPageChange={setCurrentPage}
          totalPages={Math.ceil(companies.length / 5)}
          showCheckboxes={true}
          showFavorites={true}
          loading={isLoading}
        />
      )}

      {/* Stage View */}
      {activeView === 'stage' && (
        <StageView
          data={companies.map(company => ({
            ...company,
            stage: 'Active', // Default stage for companies
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

export default Companies