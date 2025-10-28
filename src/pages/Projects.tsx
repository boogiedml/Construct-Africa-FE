import { useState, useMemo } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import { useGetProjectsQuery } from "../store/services/projects";
import type { Project } from "../types/project.types";
import type { ProjectQueryParams } from "../types/filter.types";

const ITEMS_PER_PAGE = 25;

const Projects = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');
  const [searchTerm, setSearchTerm] = useState('');

  // Build query parameters based on state
  const queryParams = useMemo<ProjectQueryParams>(() => {
    const params: ProjectQueryParams = {
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
        params.sort = 'title';
        break;
      case 'value-high':
        params.sort = '-contract_value_usd';
        break;
      case 'value-low':
        params.sort = 'contract_value_usd';
        break;
    }

    return params;
  }, [currentPage, sortBy, searchTerm]);

  const { data: projectsResponse, isLoading, isFetching } = useGetProjectsQuery(queryParams, { refetchOnMountOrArgChange: true });

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
      key: 'current_stage',
      label: 'Stage',
      sortable: true,
      width: '20%',
      render: (value: unknown) => {
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
        const stageName = value as string;
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

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Projects</h1>
          <p className="text-[#535862]">
            Showing {projects.length} {totalCount > 0 && `of ${totalCount}`} projects
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
        <div className="space-y-4">
          {isLoading || isFetching ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  image={project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg"}
                  status={project.current_stage}
                  title={project.title}
                  description={project.description || ''}
                  location={project.countries.map((country: { countries_id: { name: string } }) => country.countries_id.name).join(', ') || '---'}
                  category={project.sectors.map((sector: { sectors_id: { name: string } }) => sector.sectors_id.name).join(', ') || '---'}
                  value={`$${project.contract_value_usd || 0} million`}
                  isFavorite={false}
                />
              ))}
            </div>
          )}
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
        <StageView
          data={projects.map((project: Project) => ({
            ...project,
            stage: project.current_stage,
            image: project.featured_image?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}` : "/images/null-image.svg",
            status: project.current_stage,
            description: project.description || '',
            location: project.countries.map((country: { countries_id: { name: string } }) => country.countries_id.name).join(', ') || '---',
            category: project.sectors.map((sector: { sectors_id: { name: string } }) => sector.sectors_id.name).join(', ') || '---',
            value: `$${project.contract_value_usd || 0} million`,
            isFavorite: false
          }))}
          stageKey="stage"
        />
      )}
    </div>
  );
};

export default Projects;
