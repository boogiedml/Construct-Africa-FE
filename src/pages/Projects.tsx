import { useState } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import { useGetProjectsQuery } from "../store/services/projects";
import { useGetCountriesQuery } from "../store/services/common";
import { getCountryName } from "../utils";

const Projects = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');

  const { data: projectsResponse } = useGetProjectsQuery();

  const { data: countriesResponse } = useGetCountriesQuery();

  const groupingOptions = [
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

  const tableColumns: TableColumn<typeof projects[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '35%'
    },
    {
      key: 'sector_uuid',
      label: 'Sector',
      sortable: true,
      width: '15%',
      render: () => 'Sector'
    },
    {
      key: 'country_id_directus',
      label: 'Country',
      sortable: true,
      width: '15%',
      render: (value) => getCountryName(value as number | null, countries)
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
      key: 'stage_uuid',
      label: 'Stage',
      sortable: true,
      width: '20%',
      render: () => {
        const stageStyles = {
          'Build': {
            dot: 'bg-[#12B76A]',
            text: 'text-[#027A48]',
            bg: 'bg-[#ECFDF3]'
          },
          'Bid': {
            dot: 'bg-[#AE6A19]',
            text: 'text-[#AE6A19]',
            bg: 'bg-[#FDF5E8]'
          },
          'Design': {
            dot: 'bg-[#2E90FA]',
            text: 'text-[#175CD3]',
            bg: 'bg-[#EFF8FF]'
          },
          'Plan': {
            dot: 'bg-[#AE6A19]',
            text: 'text-[#AE6A19]',
            bg: 'bg-[#FDF5E8]'
          }
        };
        const stageName = 'Build';
        const styles = stageStyles[stageName as keyof typeof stageStyles] || {
          dot: 'bg-gray-500',
          text: 'text-gray-600',
          bg: 'bg-gray-50'
        };
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
  const countries = countriesResponse?.data || [];
  // const regions = regionsResponse?.data || [];

  // const { countriesMap, regionsMap } = createLookupMaps(countries, regions);

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Projects</h1>
          <p className="text-[#535862]">Showing recently added projects</p>
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
            onChange={setSortBy}
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
              onChange={setGrouping}
              placeholder="By country"
            />
          </div>

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <CgSortAz size={20} />
                Filters
              </div>
            }
            outline={true}
            width="fit"
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuChartPie />
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
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image || "/images/null-image.svg"}
              status="Ongoing"
              title={project.title}
              description={project.body}
              location={getCountryName(project.country_id_directus, countries)}
              category="Project"
              value={`$${project.contract_value_usd || 0} million`}
              isFavorite={false}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <DataTable
          data={projects as []}
          columns={tableColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={(row) => {
            console.log('Toggle favorite:', row);
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={Math.ceil(projects.length / 5)}
          showCheckboxes={true}
          showFavorites={true}
        />
      )}

      {/* Stage View */}
      {activeView === 'stage' && (
        <StageView
          data={projects.map(project => ({
            ...project,
            stage: 'Build',
            image: project.image || "/images/null-image.svg",
            status: "Ongoing",
            description: project.body,
            location: getCountryName(project.country_id_directus, countries),
            category: "Project",
            value: `$${project.contract_value_usd || 0} million`,
            isFavorite: false
          }))}
          stageKey="stage"
        />
      )}
    </div>
  );
};

export default Projects