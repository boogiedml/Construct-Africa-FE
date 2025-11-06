// import { useState } from "react";
// import { ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
// import { LuTable } from "react-icons/lu";
// import { CiGrid41 } from "react-icons/ci";
// import type { TabItem } from "../components/Tabs";
// import type { TableColumn } from "../components/DataTable";

// const Favourites = () => {
//   const [activeView, setActiveView] = useState('table');
//   const [activeCategory, setActiveCategory] = useState('projects');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState('recently-added');

//   const sortOptions = [
//     { value: 'recently-added', label: 'Recently added' },
//     { value: 'oldest', label: 'Oldest first' },
//     { value: 'alphabetical', label: 'Alphabetical' },
//     { value: 'value-high', label: 'Value (High to Low)' },
//     { value: 'value-low', label: 'Value (Low to High)' }
//   ];

//   const viewTabs: TabItem[] = [
//     {
//       id: 'table',
//       label: 'Table',
//       icon: <LuTable size={16} />
//     },
//     {
//       id: 'grid',
//       label: 'Grid',
//       icon: <CiGrid41 size={16} />
//     }
//   ];

//   const categoryTabs: TabItem[] = [
//     {
//       id: 'projects',
//       label: 'Projects'
//     },
//     {
//       id: 'companies',
//       label: 'Companies'
//     },
//     {
//       id: 'news',
//       label: 'News'
//     },
//     {
//       id: 'tenders',
//       label: 'Tenders'
//     }
//   ];

//   const projectColumns: TableColumn<typeof favouriteProjects[0]>[] = [
//     {
//       key: 'title',
//       label: 'Name',
//       sortable: true,
//       width: '30%'
//     },
//     {
//       key: 'category',
//       label: 'Category',
//       sortable: true,
//       width: '15%'
//     },
//     {
//       key: 'location',
//       label: 'Country',
//       sortable: true,
//       width: '20%'
//     },
//     {
//       key: 'value',
//       label: 'Value ($mn)',
//       sortable: true,
//       width: '20%',
//       render: (value) => {
//         const numericValue = String(value).replace(/[^0-9.]/g, '');
//         return `${parseFloat(numericValue).toLocaleString()}`;
//       }
//     },
//     {
//       key: 'stage',
//       label: 'Stage',
//       sortable: true,
//       width: '20%',
//       render: (value) => {
//         const stageStyles = {
//           'Build': {
//             dot: 'bg-[#12B76A]',
//             text: 'text-[#027A48]',
//             bg: 'bg-[#ECFDF3]'
//           },
//           'Bid': {
//             dot: 'bg-[#AE6A19]',
//             text: 'text-[#AE6A19]',
//             bg: 'bg-[#FDF5E8]'
//           },
//           'Design': {
//             dot: 'bg-[#2E90FA]',
//             text: 'text-[#175CD3]',
//             bg: 'bg-[#EFF8FF]'
//           },
//           'Plan': {
//             dot: 'bg-[#AE6A19]',
//             text: 'text-[#AE6A19]',
//             bg: 'bg-[#FDF5E8]'
//           }
//         };
//         const styles = stageStyles[value as keyof typeof stageStyles] || {
//           dot: 'bg-gray-500',
//           text: 'text-gray-600',
//           bg: 'bg-gray-50'
//         };
//         return (
//           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.bg}`}>
//             <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
//             <span className={`text-sm font-medium ${styles.text}`}>{String(value)}</span>
//           </div>
//         );
//       }
//     }
//   ];

//   const favouriteProjects = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
//       status: "Accepting proposals",
//       title: "Smart Home Residential Development in Accra",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Build",
//       isFavorite: true
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Eco-Friendly Office Spaces in Nairobi",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Build",
//       isFavorite: true
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Mixed-Use Development in Johannesburg",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Build",
//       isFavorite: true
//     },
//     {
//       id: 4,
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Innovative Public Transport System",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Plan",
//       isFavorite: true
//     },
//     {
//       id: 5,
//       image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
//       status: "Accepting proposals",
//       title: "Smart Home Residential Development in Accra",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Bid",
//       isFavorite: true
//     },
//     {
//       id: 6,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Eco-Friendly Office Spaces in Nairobi",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Design",
//       isFavorite: true
//     },
//     {
//       id: 7,
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Mixed-Use Development in Johannesburg",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Design",
//       isFavorite: true
//     },
//     {
//       id: 8,
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Innovative Public Transport System",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Plan",
//       isFavorite: true
//     },
//     {
//       id: 9,
//       image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
//       status: "Accepting proposals",
//       title: "Smart Home Residential Development in Accra",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Plan",
//       isFavorite: true
//     },
//     {
//       id: 10,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
//       status: "Accepting proposals",
//       title: "Eco-Friendly Office Spaces in Nairobi",
//       description: "The Accra Regional Transportation Project aims to enhance urban mobility and reduce traffic congestion in the city.",
//       location: "Cape Town, South Africa",
//       category: "Transport/Infrastructure",
//       value: "$ 1,900 (USD million)",
//       stage: "Plan",
//       isFavorite: true
//     }
//   ];

//   const renderContent = () => {
//     if (activeCategory === 'projects') {
//       if (activeView === 'grid') {
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {favouriteProjects.map((item) => (
//               <ProjectCard
//                 key={item.id}
//                 image={item.image}
//                 status={item.status}
//                 title={item.title}
//                 description={item.description}
//                 location={item.location}
//                 category={item.category}
//                 value={item.value}
//                 isFavorite={item.isFavorite}
//               />
//             ))}
//           </div>
//         );
//       } else {
//         return (
//           <DataTable
//             data={favouriteProjects}
//             columns={projectColumns}
//             onRowSelect={(rows) => console.log('Selected rows:', rows)}
//             onToggleFavorite={(row) => {
//               console.log('Toggle favorite:', row);
//             }}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//             totalPages={Math.ceil(favouriteProjects.length / 5)}
//             showCheckboxes={true}
//             showFavorites={true}
//           />
//         );
//       }
//     }

//     // Placeholder for other categories
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">No favorite {activeCategory} found</p>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen mx-auto py-5 md:py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Favourites</h1>
//           <p className="text-[#535862]">Showing favourites</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <CustomSelect
//             options={sortOptions}
//             value={sortBy}
//             onChange={setSortBy}
//             placeholder="Recently added"
//           />
//         </div>
//       </div>

//       {/* View Tabs */}
//       <div className="flex justify-between items-center mb-6">
//         <Tabs
//           tabs={viewTabs}
//           activeTab={activeView}
//           onTabChange={setActiveView}
//           variant="pills"
//         />
//         <Tabs
//           tabs={categoryTabs}
//           activeTab={activeCategory}
//           onTabChange={setActiveCategory}
//         />
//       </div>

//       {/* Content */}
//       {renderContent()}
//     </div>
//   );
// };

// export default Favourites;


// src/pages/Favourites.tsx

import { useState, useMemo } from "react";
import { ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
import { LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { toast } from "react-toastify";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import type { FavouriteCollection } from "../types/filter.types";
import {
  useGetMyFavouritesQuery,
  useToggleFavouriteMutation
} from "../store/services/favourite";

const Favourites = () => {
  const [activeView, setActiveView] = useState('table');
  const [activeCategory, setActiveCategory] = useState<FavouriteCollection>('projects');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recently-added');

  const itemsPerPage = 20;

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'value-high', label: 'Value (High to Low)' },
    { value: 'value-low', label: 'Value (Low to High)' }
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

  const categoryTabs: TabItem[] = [
    {
      id: 'projects',
      label: 'Projects'
    },
    {
      id: 'companies',
      label: 'Companies'
    },
    {
      id: 'news',
      label: 'News'
    },
    {
      id: 'tenders',
      label: 'Tenders'
    }
  ];

  // Build query params
  const queryParams = useMemo(() => {
    const params: any = {
      collection: activeCategory,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    };

    if (sortBy === 'recently-added') {
      params.sort = '-date_created';
    } else if (sortBy === 'oldest') {
      params.sort = 'date_created';
    } else if (sortBy === 'alphabetical') {
      params.sort = 'item.title';
    } else if (sortBy === 'value-high') {
      params.sort = '-item.value';
    } else if (sortBy === 'value-low') {
      params.sort = 'item.value';
    }

    return params;
  }, [activeCategory, currentPage, sortBy]);

  // Fetch favourites
  const { data: favouritesData, isLoading, isError, refetch } = useGetMyFavouritesQuery(queryParams);
  const [toggleFavourite] = useToggleFavouriteMutation();

  // Map favourites to display format
  const displayItems = useMemo(() => {
    if (!favouritesData?.data) return [];
    
    return favouritesData.data.map(fav => ({
      ...fav.item,
      favouriteId: fav.id,
      isFavorite: true
    }));
  }, [favouritesData]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!favouritesData?.meta?.filter_count) return 1;
    return Math.ceil(favouritesData.meta.filter_count / itemsPerPage);
  }, [favouritesData]);

  // Handle favourite toggle
  const handleToggleFavorite = async (row: any) => {
    try {
      await toggleFavourite({
        collection: activeCategory,
        item_id: row.id
      }).unwrap();
      
      toast.success('Removed from favourites');
      refetch();
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
      toast.error('Failed to remove favourite');
    }
  };

  // Project columns
  const projectColumns: TableColumn<any>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '30%'
    },
    {
      key: 'sectors',
      label: 'Category',
      sortable: true,
      width: '15%',
      render: (value: any) => {
        if (!value || !Array.isArray(value) || value.length === 0) return '-';
        return value[0]?.sectors_id?.name || '-';
      }
    },
    {
      key: 'countries',
      label: 'Country',
      sortable: true,
      width: '20%',
      render: (value: any) => {
        if (!value || !Array.isArray(value) || value.length === 0) return '-';
        return value[0]?.countries_id?.name || '-';
      }
    },
    {
      key: 'value',
      label: 'Value ($mn)',
      sortable: true,
      width: '20%',
      render: (value) => {
        if (!value) return '-';
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
          <p className="mt-4 text-gray-500">Loading favourites...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading favourites</p>
        </div>
      );
    }

    if (!displayItems || displayItems.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No favorite {activeCategory} found</p>
        </div>
      );
    }

    if (activeCategory === 'projects') {
      if (activeView === 'grid') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <ProjectCard
                key={item.id}
                image={item.image || "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"}
                status={item.status || "Accepting proposals"}
                title={item.title}
                description={item.description}
                location={item.countries?.[0]?.countries_id?.name || "Cape Town, South Africa"}
                category={item.sectors?.[0]?.sectors_id?.name || "Transport/Infrastructure"}
                value={item.value ? `$ ${item.value} (USD million)` : "$ 1,900 (USD million)"}
                isFavorite={true}
                // onToggleFavorite={() => handleToggleFavorite(item)}
              />
            ))}
          </div>
        );
      } else {
        return (
          <DataTable
            data={displayItems}
            columns={projectColumns}
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            showCheckboxes={true}
            showFavorites={true}
          />
        );
      }
    }

    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No favorite {activeCategory} found</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Favourites</h1>
          <p className="text-[#535862]">Showing favourites</p>
        </div>

        <div className="flex items-center gap-3">
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
        <Tabs
          tabs={categoryTabs}
          activeTab={activeCategory}
          onTabChange={(tab) => {
            setActiveCategory(tab as FavouriteCollection);
            setCurrentPage(1);
          }}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default Favourites;

