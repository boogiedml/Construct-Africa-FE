import { useState } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";

const Tenders = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recently-added');

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'date-newest', label: 'Date (Newest First)' },
    { value: 'date-oldest', label: 'Date (Oldest First)' }
  ];

  const tableColumns: TableColumn<typeof tendersItems[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '40%',
      render: (_, row) => (
        <div>
          <div className="font-semibold text-[#181D27] mb-1 line-clamp-1">
            {row.title}
          </div>
          <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
            {row.description}
          </div>
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      width: '15%'
    },
    {
      key: 'sector',
      label: 'Sector',
      sortable: true,
      width: '20%'
    },
    {
      key: 'country',
      label: 'Country',
      sortable: true,
      width: '15%'
    }
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
    }
  ];

  const tendersItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: true,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: true,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300//fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      title: "Metro Expansion Project in Addis Ababa",
      description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
      category: "Infrastructure",
      location: "Namibia",
      value: "$ 2,400 (USD million)",
      isFavorite: false,
      date: "01/01/2025",
      sector: "Transportation",
      country: "Namibia"
    }
  ];

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Tenders</h1>
          <p className="text-[#535862]">Showing recently added tenders</p>
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
          {tendersItems.map((item) => (
            <ProjectCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              location={item.location}
              category={item.category}
              value={item.value}
              isFavorite={item.isFavorite}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <DataTable
          data={tendersItems}
          columns={tableColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={(row) => {
            // Handle favorite toggle
            console.log('Toggle favorite:', row);
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={Math.ceil(tendersItems.length / 5)}
          showCheckboxes={true}
          showFavorites={true}
        />
      )}
    </div>
  );
};

export default Tenders;