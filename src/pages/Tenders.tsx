// import { useState, useMemo } from "react";
// import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
// import { LuTable, LuChartPie } from "react-icons/lu";
// import { CiGrid41 } from "react-icons/ci";
// import { CgSortAz } from "react-icons/cg";
// import { PiFloppyDisk } from "react-icons/pi";
// import type { TabItem } from "../components/Tabs";
// import type { TableColumn } from "../components/DataTable";
// import { useGetTendersQuery } from "../store/services/tenders";
// import type { Tender as TenderType } from "../types/tenders.types";
// import type { TenderQueryParams } from "../types/filter.types";
// import { cleanHtmlContent } from "../utils";

// const ITEMS_PER_PAGE = 25;

// const Tenders = () => {
//   const [activeView, setActiveView] = useState('table');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState('recently-added');
//   const [showCharts, setShowCharts] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   // const [searchTerm, setSearchTerm] = useState('');

//   // Build query parameters based on state
//   const queryParams = useMemo<TenderQueryParams>(() => {
//     const params: TenderQueryParams = {
//       limit: ITEMS_PER_PAGE,
//       offset: (currentPage - 1) * ITEMS_PER_PAGE,
//       meta: 'total_count,filter_count',
//       'filter[status][_eq]': 'published', // Only show published tenders
//     };

//     // Add search if exists
//     // if (searchTerm) {
//     //   params.search = searchTerm;
//     // }

//     // Add sorting
//     switch (sortBy) {
//       case 'recently-added':
//         params.sort = '-date_created';
//         break;
//       case 'oldest':
//         params.sort = 'date_created';
//         break;
//       case 'alphabetical':
//         params.sort = 'title';
//         break;
//       case 'date-newest':
//         params.sort = '-date_updated';
//         break;
//       case 'date-oldest':
//         params.sort = 'date_updated';
//         break;
//     }

//     return params;
//   }, [currentPage, sortBy]);

//   const { data: tendersResponse, isLoading, isFetching } = useGetTendersQuery(queryParams);

//   const sortOptions = [
//     { value: 'recently-added', label: 'Recently added' },
//     { value: 'oldest', label: 'Oldest first' },
//     { value: 'alphabetical', label: 'Alphabetical' },
//     { value: 'date-newest', label: 'Date (Newest First)' },
//     { value: 'date-oldest', label: 'Date (Oldest First)' }
//   ];

//   const tableColumns: TableColumn<typeof tenders[0]>[] = [
//     {
//       key: 'title',
//       label: 'Name',
//       sortable: true,
//       width: '50%',
//       render: (_, row) => (
//         <div>
//           <div className="font-semibold text-[#181D27] mb-1 line-clamp-1">
//             {row.title}
//           </div>
//           <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
//             {row.summary || cleanHtmlContent(row.content)?.substring(0, 150) + '...'}
//           </div>
//         </div>
//       )
//     },
//     {
//       key: 'date_created',
//       label: 'Date Posted',
//       sortable: true,
//       width: '20%',
//       render: (value) => {
//         const date = new Date(value as string);
//         return date.toLocaleDateString('en-US', {
//           month: '2-digit',
//           day: '2-digit',
//           year: 'numeric'
//         });
//       }
//     },
//     {
//       key: 'is_free_tender',
//       label: 'Access',
//       sortable: true,
//       width: '15%',
//       render: (value) => (
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${value
//           ? 'bg-green-100 text-green-800'
//           : 'bg-orange-100 text-orange-800'
//           }`}>
//           {value ? 'Free' : 'Premium'}
//         </span>
//       )
//     },
//     {
//       key: 'promote',
//       label: 'Featured',
//       sortable: true,
//       width: '15%',
//       render: (value) => (
//         value ? (
//           <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//             Featured
//           </span>
//         ) : (
//           <span className="text-gray-400">-</span>
//         )
//       )
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

//   const tenders = tendersResponse?.data || [];
//   const totalCount = tendersResponse?.meta?.filter_count || tendersResponse?.meta?.total_count || tenders.length;
//   const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   // Handle sort change
//   const handleSortChange = (newSortBy: string) => {
//     setSortBy(newSortBy);
//     setCurrentPage(1);
//   };

//   // Get featured image URL
//   const getImageUrl = (featuredImage: string | TenderType['featured_image']) => {
//     if (!featuredImage) return "/images/null-image.svg";

//     if (typeof featuredImage === 'string') {
//       return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage}`;
//     }

//     if (featuredImage && typeof featuredImage === 'object' && 'filename_disk' in featuredImage) {
//       return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage.filename_disk}`;
//     }

//     return "/images/null-image.svg";
//   };

//   return (
//     <div className="min-h-screen mx-auto py-5 md:py-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Tenders</h1>
//           <p className="text-[#535862]">
//             Showing {tenders.length} {totalCount > 0 && `of ${totalCount}`} tenders
//           </p>
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
//             onChange={handleSortChange}
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
//             attributes={{
//               onClick: () => {
//                 setShowCharts(false);
//                 setShowFilters(!showFilters);
//               }
//             }}
//           />

//           <ActionButton
//             buttonText={
//               <div className="flex items-center gap-2">
//                 <LuChartPie />
//                 {showCharts ? 'Hide' : 'Show'} charts
//               </div>
//             }
//             outline={true}
//             width="fit"
//             attributes={{
//               onClick: () => {
//                 setShowFilters(false);
//                 setShowCharts(!showCharts);
//               }
//             }}
//           />
//         </div>
//       </div>

//       <section className={showCharts || showFilters ? 'flex gap-5' : ''}>
//         <div className={showCharts || showFilters ? 'flex-1' : ''}>
//           {/* Grid Content */}
//           {activeView === 'grid' && (
//             <div className="space-y-4">
//               {isLoading || isFetching ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {Array.from({ length: 8 }).map((_, index) => (
//                     <ProjectCardSkeleton key={`skeleton-${index}`} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {tenders.map((tender: TenderType) => (
//                     <ProjectCard
//                       key={tender.id}
//                       image={getImageUrl(tender.featured_image)}
//                       status={tender.is_free_tender ? 'Free' : 'Premium'}
//                       title={tender.title}
//                       description={tender.summary || cleanHtmlContent(tender.content)?.substring(0, 150) + '...' || ''}
//                       location={new Date(tender.date_created).toLocaleDateString()}
//                       category="Tender"
//                       value={tender.promote ? 'Featured' : ''}
//                       isFavorite={false}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Table View */}
//           {activeView === 'table' && (
//             <DataTable
//               data={tenders as []}
//               columns={tableColumns}
//               onRowSelect={(rows) => console.log('Selected rows:', rows)}
//               onToggleFavorite={(row) => {
//                 console.log('Toggle favorite:', row);
//               }}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//               totalPages={totalPages}
//               showCheckboxes={true}
//               showFavorites={true}
//               loading={isLoading || isFetching}
//               pageSize={ITEMS_PER_PAGE}
//             />
//           )}
//         </div>

//         {showCharts && (
//           <ChartsSidebar isOpen={showCharts} />
//         )}

//         {showFilters && (
//           <FiltersSidebar isOpen={showFilters} onClose={() => setShowFilters(false)} />
//         )}
//       </section>
//     </div>
//   );
// };

// export default Tenders;



import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetTendersQuery } from "../store/services/tenders";
import type { Tender as TenderType } from "../types/tenders.types";
import type { TenderQueryParams, AppFilters } from "../types/filter.types";
import { cleanHtmlContent } from "../utils";
import { useInfiniteScroll } from "../store/hooks/useInfiniteScrolling";
import { 
  getPresets, 
  getPresetById, 
  saveDefaultView, 
  getDefaultView,
  type FilterPreset 
} from "../utils/presets";

const ITEMS_PER_PAGE = 25;

const Tenders = () => {
  // Load default view on component mount
  const defaultView = getDefaultView('tenders');
  
  const [activeView, setActiveView] = useState(defaultView?.activeView || 'table');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(defaultView?.sortBy || 'recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
  const [activePresetId, setActivePresetId] = useState<string | undefined>(defaultView?.presetId);

  // Infinite scroll state for grid view
  const [accumulatedTenders, setAccumulatedTenders] = useState<TenderType[]>([]);
  const [gridPage, setGridPage] = useState(1);

  // Load presets
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  useEffect(() => {
    // Load presets from localStorage
    const loadedPresets = getPresets('tenders');
    setPresets(loadedPresets);

    // If there's a default preset, load its filters
    if (defaultView?.presetId) {
      const defaultPreset = getPresetById(defaultView.presetId, 'tenders');
      if (defaultPreset) {
        setAppliedFilters(defaultPreset.filters);
        setActivePresetId(defaultPreset.id);
      }
    }
  }, []);

  // Build query parameters based on state
  const queryParams = useMemo<TenderQueryParams>(() => {
    // Use gridPage for grid view, currentPage for table view
    const pageToUse = activeView === 'grid' ? gridPage : currentPage;
    
    const params: TenderQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (pageToUse - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
      'filter[status][_eq]': 'published', // Only show published tenders
    };

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
      default:
        // Check if sortBy is a preset ID
        if (sortBy.startsWith('preset_')) {
          params.sort = '-date_created'; // Default sort for presets
        }
        break;
    }

    // Apply filters (if you have any specific tender filters)
    // Region filters
    if (appliedFilters.region && Array.isArray(appliedFilters.region) && appliedFilters.region.length > 0) {
      params['filter[region][_contains]'] = appliedFilters.region[0];
    }

    // Country filters
    if (appliedFilters.country && Array.isArray(appliedFilters.country) && appliedFilters.country.length > 0) {
      params['filter[country][_contains]'] = appliedFilters.country[0];
    }

    // Type filters (free/premium)
    if (appliedFilters.type && Array.isArray(appliedFilters.type) && appliedFilters.type.length > 0) {
      const isFree = appliedFilters.type[0] === 'Free';
      params['filter[is_free_tender][_eq]'] = isFree;
    }

    // Date filters
    if (appliedFilters.date && Array.isArray(appliedFilters.date) && appliedFilters.date.length > 0) {
      const dateFilter = appliedFilters.date[0];
      const now = new Date();

      switch (dateFilter) {
        case 'Last 7 days': {
          const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last7Days.toISOString();
          break;
        }
        case 'Last 30 days': {
          const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last30Days.toISOString();
          break;
        }
        case 'Last 90 days': {
          const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last90Days.toISOString();
          break;
        }
        case 'Last year': {
          const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = lastYear.toISOString();
          break;
        }
      }
    }

    return params;
  }, [activeView, gridPage, currentPage, sortBy, appliedFilters]);

  const { data: tendersResponse, isLoading, isFetching } = useGetTendersQuery(queryParams);

  // Reset accumulated tenders when filters, sorting, or view changes
  useEffect(() => {
    if (activeView === 'grid') {
      setAccumulatedTenders([]);
      setGridPage(1);
    }
  }, [sortBy, appliedFilters, activeView]);

  // Accumulate tenders for grid view infinite scroll
  useEffect(() => {
    if (activeView === 'grid' && tendersResponse?.data) {
      if (gridPage === 1) {
        // First page - replace accumulated tenders
        setAccumulatedTenders(tendersResponse.data);
      } else {
        // Subsequent pages - append to accumulated tenders
        setAccumulatedTenders(prev => [...prev, ...tendersResponse.data]);
      }
    }
  }, [tendersResponse, gridPage, activeView]);

  // Build sort options including presets
  const sortOptions = useMemo(() => {
    const baseOptions = [
      { value: 'recently-added', label: 'Recently added' },
      { value: 'oldest', label: 'Oldest first' },
      { value: 'alphabetical', label: 'Alphabetical' },
      { value: 'date-newest', label: 'Date (Newest First)' },
      { value: 'date-oldest', label: 'Date (Oldest First)' }
    ];

    // Add presets as sort options
    const presetOptions = presets.map(preset => ({
      value: preset.id,
      label: `📌 ${preset.name}`
    }));

    return [...baseOptions, ...presetOptions];
  }, [presets]);

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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value
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

  // Use accumulated tenders for grid view, regular data for table view
  const tenders = activeView === 'grid' ? accumulatedTenders : (tendersResponse?.data || []);
  const totalCount = tendersResponse?.meta?.filter_count || tendersResponse?.meta?.total_count || tenders.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Check if there are more items to load for infinite scroll
  const hasMore = activeView === 'grid' && accumulatedTenders.length < totalCount;

  // Handle load more for infinite scroll
  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setGridPage(prev => prev + 1);
    }
  };

  // Infinite scroll hook
  const observerTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading: isFetching,
    rootMargin: '100px'
  });

  // Handle page change (for table view)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedTenders([]);

    // If it's a preset, load its filters
    if (newSortBy.startsWith('preset_')) {
      const preset = getPresetById(newSortBy, 'tenders');
      if (preset) {
        setAppliedFilters(preset.filters);
        setActivePresetId(preset.id);
      }
    } else {
      // If switching away from a preset, clear preset-specific state
      if (activePresetId) {
        setActivePresetId(undefined);
      }
    }
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedTenders([]);
    
    // Clear active preset since filters were manually changed
    setActivePresetId(undefined);
    
    // If sortBy was a preset, reset to default
    if (sortBy.startsWith('preset_')) {
      setSortBy('recently-added');
    }
  };

  // Handle save view as default
  const handleSaveViewAsDefault = () => {
    saveDefaultView(
      {
        sortBy,
        grouping: 'none', // Tenders don't have grouping
        activeView,
        presetId: activePresetId
      },
      'tenders'
    );
    
    toast.success('View saved as default successfully!');
  };

  // Handle view change
  const handleViewChange = (newView: string) => {
    setActiveView(newView);
    
    // Reset pagination when switching views
    if (newView === 'grid') {
      setGridPage(1);
      setAccumulatedTenders([]);
    } else {
      setCurrentPage(1);
    }
  };

  // Count active filters
  const activeFiltersCount = Object.values(appliedFilters).filter(
    val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
  ).length;

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
            Showing {activeView === 'grid' ? accumulatedTenders.length : tenders.length} {totalCount > 0 && `of ${totalCount}`} tenders
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
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
            attributes={{
              onClick: handleSaveViewAsDefault
            }}
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
          onTabChange={handleViewChange}
          variant="pills"
        />

        <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <CgSortAz size={20} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowCharts(false);
                setShowFilters(!showFilters);
              }
            }}
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuChartPie />
                {showCharts ? 'Hide' : 'Show'} charts
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowFilters(false);
                setShowCharts(!showCharts);
              }
            }}
          />
        </div>
      </div>

      <section className={showCharts || showFilters ? 'flex gap-5' : ''}>
        <div className={showCharts || showFilters ? 'flex-1' : ''}>
          {/* Grid Content with Infinite Scroll */}
          {activeView === 'grid' && (
            <div 
              className="overflow-y-auto space-y-4"
              style={{ height: 'calc(100vh - 280px)' }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
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

              {/* Loading skeleton for infinite scroll */}
              {isFetching && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6 mt-6`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
                  ))}
                </div>
              )}

              {/* Intersection observer target */}
              {hasMore && !isFetching && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                  <span className="text-sm text-[#535862]">Loading more...</span>
                </div>
              )}

              {/* End of results message */}
              {!hasMore && accumulatedTenders.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[#535862]">
                    You've reached the end of the list
                  </p>
                </div>
              )}

              {/* Initial loading state */}
              {isLoading && accumulatedTenders.length === 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProjectCardSkeleton key={`initial-skeleton-${index}`} />
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
              pageSize={ITEMS_PER_PAGE}
            />
          )}
        </div>

        {showCharts && (
          <ChartsSidebar isOpen={showCharts} />
        )}

        {showFilters && (
          <FiltersSidebar 
            isOpen={showFilters} 
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={appliedFilters}
            type="tenders"
          />
        )}
      </section>
    </div>
  );
};

export default Tenders;
