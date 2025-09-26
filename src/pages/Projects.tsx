import { useState } from "react";
import { ActionButton, ProjectCard } from "../components";
import { LuBookMarked, LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";

const Projects = () => {
  const [activeView, setActiveView] = useState('grid');
  // const [sortBy, setSortBy] = useState('recently-added');

  // const sortOptions = [
  //   { value: 'recently-added', label: 'Recently added' },
  //   { value: 'oldest', label: 'Oldest first' },
  //   { value: 'alphabetical', label: 'Alphabetical' },
  //   { value: 'value-high', label: 'Value (High to Low)' },
  //   { value: 'value-low', label: 'Value (Low to High)' }
  // ];

  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Ongoing",
      title: "Smart Home Residential Development in Accra",
      description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion through innovative infrastructure solutions.",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Eco-Friendly Office Spaces in Nairobi",
      description: "The Nairobi Green Transit Initiative seeks to promote sustainability through eco-conscious development and green building practices.",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Mixed-Use Development in Johannesburg",
      description: "The Johannesburg Urban Revitalization Project is focused on enhancing city infrastructure and creating sustainable community spaces.",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: false
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Innovative Public Transport System",
      description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and promotes sustainable mobility.",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Ongoing",
      title: "Smart Home Residential Development in Accra",
      description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce...",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Eco-Friendly Office Spaces in Nairobi",
      description: "The Nairobi Green Transit Initiative seeks to promote sustainability through eco-conscious...",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: false
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Mixed-Use Development in Johannesburg",
      description: "The Johannesburg Urban Revitalization Project is focused on enhancing city infra...",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
      isFavorite: false
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Ongoing",
      title: "Innovative Public Transport System",
      description: "This project aims to develop a cutting-edge public transport system that reduces traffic...",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      value: "$ 284.1 (USD million)",
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
                <LuBookMarked size={16} />
                Save view as default
              </div>
            }
            outline={true}
            width="fit"
          />

          {/* <Select
            options={sortOptions}
            attributes={{
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value)
            }}
            placeholder="Recently added"
          /> */}
        </div>
      </div>

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveView('table')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'table'
              ? 'bg-white text-[#181D27] shadow-sm'
              : 'text-[#535862] hover:text-[#181D27]'
              }`}
          >
            <LuTable size={16} />
            Table
          </button>

          <button
            onClick={() => setActiveView('grid')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'grid'
              ? 'bg-white text-[#181D27] shadow-sm'
              : 'text-[#535862] hover:text-[#181D27]'
              }`}
          >
            <CiGrid41 size={16} />
            Grid
          </button>

          <button
            onClick={() => setActiveView('stage')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'stage'
              ? 'bg-white text-[#181D27] shadow-sm'
              : 'text-[#535862] hover:text-[#181D27]'
              }`}
          >
            <GoColumns size={16} />
            Stage
          </button>
        </div>

        {/* <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <Filter size={16} />
                Filters
              </div>
            }
            outline={true}
            width="fit"
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <BarChart3 size={16} />
                Show charts
              </div>
            }
            outline={true}
            width="fit"
          />
        </div> */}
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

      {/* Table View Placeholder */}
      {activeView === 'table' && (
        <div></div>
      )}

      {/* Stage View Placeholder */}
      {activeView === 'stage' && (
        <div></div>
      )}
    </div>
  );
};

export default Projects