// import { useState } from "react";
// import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
// import { LuTable, LuChartPie } from "react-icons/lu";
// import { CiGrid41 } from "react-icons/ci";
// import { CgSortAz } from "react-icons/cg";
// import { PiFloppyDisk } from "react-icons/pi";
// import type { TabItem } from "../components/Tabs";
// import type { TableColumn } from "../components/DataTable";

// const Tenders = () => {
//   const [activeView, setActiveView] = useState('table');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState('recently-added');

//   const sortOptions = [
//     { value: 'recently-added', label: 'Recently added' },
//     { value: 'oldest', label: 'Oldest first' },
//     { value: 'alphabetical', label: 'Alphabetical' },
//     { value: 'date-newest', label: 'Date (Newest First)' },
//     { value: 'date-oldest', label: 'Date (Oldest First)' }
//   ];

//   const tableColumns: TableColumn<typeof tendersItems[0]>[] = [
//     {
//       key: 'title',
//       label: 'Name',
//       sortable: true,
//       width: '40%',
//       render: (_, row) => (
//         <div>
//           <div className="font-semibold text-[#181D27] mb-1 line-clamp-1">
//             {row.title}
//           </div>
//           <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
//             {row.description}
//           </div>
//         </div>
//       )
//     },
//     {
//       key: 'date',
//       label: 'Date',
//       sortable: true,
//       width: '15%'
//     },
//     {
//       key: 'sector',
//       label: 'Sector',
//       sortable: true,
//       width: '20%'
//     },
//     {
//       key: 'country',
//       label: 'Country',
//       sortable: true,
//       width: '15%'
//     }
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

//   const tendersItems = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: true,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: true,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 4,
//       image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 5,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300//fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 6,
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 7,
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 8,
//       image: "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     },
//     {
//       id: 9,
//       image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
//       title: "Metro Expansion Project in Addis Ababa",
//       description: "This project aims to develop a cutting-edge public transport system that reduces congestion and lowers emissions in urban areas.",
//       category: "Infrastructure",
//       location: "Namibia",
//       value: "$ 2,400 (USD million)",
//       isFavorite: false,
//       date: "01/01/2025",
//       sector: "Transportation",
//       country: "Namibia"
//     }
//   ];

//   return (
//     <div className="min-h-screen mx-auto py-5 md:py-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Tenders</h1>
//           <p className="text-[#535862]">Showing recently added tenders</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <ActionButton
//             buttonText={
//               <div className="flex items-center gap-2">
//                 <PiFloppyDisk />
//                 Save view as default
//               </div>
//             }
//             outline={true}
//             width="fit"
//           />

//           <CustomSelect
//             options={sortOptions}
//             value={sortBy}
//             onChange={setSortBy}
//             placeholder="Recently added"
//           />
//         </div>
//       </div>

//       {/* View Controls */}
//       <div className="flex justify-between items-center mb-6">
//         <Tabs
//           tabs={viewTabs}
//           activeTab={activeView}
//           onTabChange={setActiveView}
//           variant="pills"
//         />

//         <div className="flex items-center gap-3">
//           <ActionButton
//             buttonText={
//               <div className="flex items-center gap-2">
//                 <CgSortAz size={20} />
//                 Filters
//               </div>
//             }
//             outline={true}
//             width="fit"
//           />

//           <ActionButton
//             buttonText={
//               <div className="flex items-center gap-2">
//                 <LuChartPie />
//                 Show charts
//               </div>
//             }
//             outline={true}
//             width="fit"
//           />
//         </div>
//       </div>

//       {/* Grid Content */}
//       {activeView === 'grid' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {tendersItems.map((item) => (
//             <ProjectCard
//               key={item.id}
//               image={item.image}
//               title={item.title}
//               description={item.description}
//               location={item.location}
//               category={item.category}
//               value={item.value}
//               isFavorite={item.isFavorite}
//             />
//           ))}
//         </div>
//       )}

//       {/* Table View */}
//       {activeView === 'table' && (
//         <DataTable
//           data={tendersItems}
//           columns={tableColumns}
//           onRowSelect={(rows) => console.log('Selected rows:', rows)}
//           onToggleFavorite={(row) => {
//             // Handle favorite toggle
//             console.log('Toggle favorite:', row);
//           }}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//           totalPages={Math.ceil(tendersItems.length / 5)}
//           showCheckboxes={true}
//           showFavorites={true}
//         />
//       )}
//     </div>
//   );
// };

// export default Tenders;



// pages/Tenders.tsx

import { useState, useMemo } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetTendersQuery } from "../store/services/tenders";
import type { Tender as TenderType } from "../types/tenders.types";
import type { TenderQueryParams } from "../types/filter.types";
import { cleanHtmlContent } from "../utils";

const ITEMS_PER_PAGE = 25;

const Tenders = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recently-added');
  const [searchTerm, setSearchTerm] = useState('');

  // Build query parameters based on state
  const queryParams = useMemo<TenderQueryParams>(() => {
    const params: TenderQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
      'filter[status][_eq]': 'published', // Only show published tenders
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
      case 'date-newest':
        params.sort = '-date_updated';
        break;
      case 'date-oldest':
        params.sort = 'date_updated';
        break;
    }

    return params;
  }, [currentPage, sortBy, searchTerm]);

  const { data: tendersResponse, isLoading, isFetching } = useGetTendersQuery(queryParams);

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'date-newest', label: 'Date (Newest First)' },
    { value: 'date-oldest', label: 'Date (Oldest First)' }
  ];

  const tableColumns: TableColumn<typeof tenders[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '50%',
      render: (_, row) => (
        <div>
          <div className="font-semibold text-[#181D27] mb-1 line-clamp-1">
            {row.title}
          </div>
          <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
            {row.summary || cleanHtmlContent(row.content)?.substring(0, 150) + '...'}
          </div>
        </div>
      )
    },
    {
      key: 'date_created',
      label: 'Date Posted',
      sortable: true,
      width: '20%',
      render: (value) => {
        const date = new Date(value as string);
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
      }
    },
    {
      key: 'is_free_tender',
      label: 'Access',
      sortable: true,
      width: '15%',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800'
        }`}>
          {value ? 'Free' : 'Premium'}
        </span>
      )
    },
    {
      key: 'promote',
      label: 'Featured',
      sortable: true,
      width: '15%',
      render: (value) => (
        value ? (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Featured
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )
      )
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

  const tenders = tendersResponse?.data || [];
  const totalCount = tendersResponse?.meta?.filter_count || tendersResponse?.meta?.total_count || tenders.length;
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

  // Get featured image URL
  const getImageUrl = (featuredImage: string | TenderType['featured_image']) => {
    if (!featuredImage) return "/images/null-image.svg";
    
    if (typeof featuredImage === 'string') {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage}`;
    }
    
    if (featuredImage && typeof featuredImage === 'object' && 'filename_disk' in featuredImage) {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage.filename_disk}`;
    }
    
    return "/images/null-image.svg";
  };

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Tenders</h1>
          <p className="text-[#535862]">
            Showing {tenders.length} {totalCount > 0 && `of ${totalCount}`} tenders
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
              {tenders.map((tender: TenderType) => (
                <ProjectCard
                  key={tender.id}
                  image={getImageUrl(tender.featured_image)}
                  status={tender.is_free_tender ? 'Free' : 'Premium'}
                  title={tender.title}
                  description={tender.summary || cleanHtmlContent(tender.content)?.substring(0, 150) + '...' || ''}
                  location={new Date(tender.date_created).toLocaleDateString()}
                  category="Tender"
                  value={tender.promote ? 'Featured' : ''}
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
          data={tenders as []}
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
        />
      )}
    </div>
  );
};

export default Tenders;
