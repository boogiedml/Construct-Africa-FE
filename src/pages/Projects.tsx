import { useState } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";

const Projects = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');

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
      key: 'sector',
      label: 'Sector',
      sortable: true,
      width: '15%'
    },
    {
      key: 'location',
      label: 'Country',
      sortable: true,
      width: '15%'
    },
    {
      key: 'value',
      label: 'Value ($mn)',
      sortable: true,
      width: '15%',
      render: (value) => {
        const numericValue = String(value).replace(/[^0-9.]/g, '');
        return `${parseFloat(numericValue).toLocaleString()}`;
      }
    },
    {
      key: 'stage',
      label: 'Stage',
      sortable: true,
      width: '20%',
      render: (value) => {
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
        const styles = stageStyles[value as keyof typeof stageStyles] || {
          dot: 'bg-gray-500',
          text: 'text-gray-600',
          bg: 'bg-gray-50'
        };
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.bg}`}>
            <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
            <span className={`text-sm font-medium ${styles.text}`}>{String(value)}</span>
          </div>
        );
      }
    }
  ];

  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Ongoing",
      title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
      description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion through innovative infrastructure solutions.",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Study",
      value: "$ 1,900 (USD million)",
      isFavorite: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
      description: "The Nairobi Green Transit Initiative seeks to promote sustainability through eco-conscious development and green building practices.",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Design",
      value: "$ 1,900 (USD million)",
      isFavorite: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor) - Phase 2",
      description: "The Johannesburg Urban Revitalization Project is focused on enhancing city infrastructure and creating sustainable community spaces.",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Bid",
      value: "$ 1,900 (USD million)",
      isFavorite: true
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Greater Cairo Air Pollution Management and Climate Change, Egypt - Extension",
      description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and promotes sustainable mobility.",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Build",
      value: "$ 1,900 (USD million)",
      isFavorite: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Ongoing",
      title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor) - Phase 3",
      description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce...",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Build",
      value: "$ 1,900 (USD million)",
      isFavorite: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Greater Cairo Air Pollution Management and Climate Change, Egypt - Phase 2",
      description: "The Nairobi Green Transit Initiative seeks to promote sustainability through eco-conscious...",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Design",
      value: "$ 1,900 (USD million)",
      isFavorite: true
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor) - Final Phase",
      description: "The Johannesburg Urban Revitalization Project is focused on enhancing city infra...",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Plan",
      value: "$ 1,900 (USD million)",
      isFavorite: false
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Greater Cairo Air Pollution Management and Climate Change, Egypt - Final Phase",
      description: "This project aims to develop a cutting-edge public transport system that reduces traffic...",
      location: "Burkina Faso",
      category: "Transport/Infrastructure",
      sector: "Transportation",
      stage: "Build",
      value: "$ 1,900 (USD million)",
      isFavorite: false
    }
  ];

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
              image={project.image}
              status={project.status}
              title={project.title}
              description={project.description}
              location={project.location}
              category={project.category}
              value={project.value}
              isFavorite={project.isFavorite}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <DataTable
          data={projects}
          columns={tableColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={(row) => {
            // Handle favorite toggle
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
          data={projects}
          stageKey="stage"
        />
      )}
    </div>
  );
};

export default Projects