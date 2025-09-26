import { useState } from "react";
import { ActionButton, ProjectCard } from "../components";
import { LuBookMarked, LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { GoColumns } from "react-icons/go";

const Companies = () => {
  const [activeView, setActiveView] = useState('grid');
  // const [sortBy, setSortBy] = useState('recently-added');

  // const sortOptions = [
  //   { value: 'recently-added', label: 'Recently added' },
  //   { value: 'oldest', label: 'Oldest first' },
  //   { value: 'alphabetical', label: 'Alphabetical' },
  //   { value: 'value-high', label: 'Value (High to Low)' },
  //   { value: 'value-low', label: 'Value (Low to High)' }
  // ];

  const companies = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Contractor",
      title: "Green Innov Industry Investment, Morocco",
      description: "Green Innov Industry Investment (Gi3) launched the construction of a plant for the first Moroccan. Green Innov Industry Investment.",
      location: "Cape Town, South Africa",
      category: "Transport/Infrastructure",
      isFavorite: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Supplier",
      title: "Alpha Construction Solutions",
      description: "Specializing in large-scale commercial and residential construction projects across West Africa.",
      location: "Accra, Ghana",
      category: "Construction/Development",
      isFavorite: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Developer",
      title: "Mega Urban Planners Inc.",
      description: "Focused on enhancing city infrastructure and creating sustainable community spaces in Southern Africa.",
      location: "Johannesburg, South Africa",
      category: "Real Estate/Consulting",
      isFavorite: false
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Subcontractor",
      title: "East African Transport Technologies",
      description: "Provides cutting-edge public transport systems and technological integrations for African cities.",
      location: "Nairobi, Kenya",
      category: "Technology/Transport",
      isFavorite: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
      status: "Contractor",
      title: "West Coast Infrastructure Group",
      description: "Aims to enhance urban mobility and reduce traffic congestion through innovative infrastructure solutions.",
      location: "Lagos, Nigeria",
      category: "Transport/Infrastructure",
      isFavorite: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      status: "Supplier",
      title: "Green Build Materials LTD",
      description: "Seeks to promote sustainability through supplying eco-conscious, green building materials.",
      location: "Cairo, Egypt",
      category: "Materials/Manufacturing",
      isFavorite: false
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "Developer",
      title: "Gauteng Property Holdings",
      description: "Specializes in developing mixed-use properties and commercial spaces.",
      location: "Cape Town, South Africa",
      category: "Real Estate/Development",
      isFavorite: false
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      status: "Subcontractor",
      title: "Horizon Rail & Roadworks",
      description: "Focuses on developing rail and road infrastructure projects across the sub-Saharan region.",
      location: "Durban, South Africa",
      category: "Transport/Infrastructure",
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

      {/* Table View Placeholder */}
      {activeView === 'table' && (
        <div></div>
      )}

      {/* Stage View Placeholder */}
      {activeView === 'stage' && (
        <div></div>
      )}
    </div>
  )
}

export default Companies