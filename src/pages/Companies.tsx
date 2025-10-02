import { useState } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, StageView } from "../components";
import { LuBookMarked, LuTable, LuFilter } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";
import { HiOutlineChartBar } from "react-icons/hi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";

const Companies = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('country');
  const [sortBy, setSortBy] = useState('recently-added');

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
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '40%'
    },
    {
      key: 'location',
      label: 'Country',
      sortable: true,
      width: '25%'
    },
    {
      key: 'website',
      label: 'Website',
      sortable: false,
      width: '25%',
      render: (value) => (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {String(value)}
        </a>
      )
    },
    {
      key: 'projectsCount',
      label: 'Projects count',
      sortable: true,
      width: '10%'
    }
  ];

  const companies = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Contractor",
      title: "Green Innov Industry Investment, Morocco",
      description: "Green Innov Industry Investment (Gi3) launched the construction of a plant for the first Moroccan. Green Innov Industry Investment.",
      location: "Republic of Mozambique",
      category: "Transport/Infrastructure",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      stage: "Study",
      isFavorite: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Supplier",
      title: "Alpha Construction Solutions",
      description: "Specializing in large-scale commercial and residential construction projects across West Africa.",
      location: "Mozambique Republic",
      category: "Construction/Development",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      stage: "Design",
      isFavorite: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Developer",
      title: "Mega Urban Planners Inc.",
      description: "Focused on enhancing city infrastructure and creating sustainable community spaces in Southern Africa.",
      location: "Mozambique Nation",
      category: "Real Estate/Consulting",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      stage: "Bid",
      isFavorite: false
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Subcontractor",
      title: "East African Transport Technologies",
      description: "Provides cutting-edge public transport systems and technological integrations for African cities.",
      location: "Mozambique State",
      category: "Technology/Transport",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      stage: "Build",
      isFavorite: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Contractor",
      title: "West Coast Infrastructure Group",
      description: "Aims to enhance urban mobility and reduce traffic congestion through innovative infrastructure solutions.",
      location: "Mozambique Republic",
      category: "Transport/Infrastructure",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      isFavorite: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Supplier",
      title: "Green Build Materials LTD",
      description: "Seeks to promote sustainability through supplying eco-conscious, green building materials.",
      location: "Mozambique Nation",
      category: "Materials/Manufacturing",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      isFavorite: false
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Developer",
      title: "Gauteng Property Holdings",
      description: "Specializes in developing mixed-use properties and commercial spaces.",
      location: "Mozambique State",
      category: "Real Estate/Development",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      isFavorite: false
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Subcontractor",
      title: "Horizon Rail & Roadworks",
      description: "Focuses on developing rail and road infrastructure projects across the sub-Saharan region.",
      location: "Republic of Mozambique",
      category: "Transport/Infrastructure",
      website: "https://www.transport.gov.mz",
      projectsCount: 24,
      isFavorite: false
    }
  ];

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
          {companies.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              status={project.status}
              title={project.title}
              description={project.description}
              location={project.location}
              category={project.category}
              isFavorite={project.isFavorite}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <DataTable
          data={companies}
          columns={tableColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={(row) => {
            // Handle favorite toggle
            console.log('Toggle favorite:', row);
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={Math.ceil(companies.length / 5)}
          showCheckboxes={true}
          showFavorites={true}
        />
      )}

      {/* Stage View */}
      {activeView === 'stage' && (
        <StageView
          data={companies}
          stageKey="stage"
        />
      )}
    </div>
  )
}

export default Companies