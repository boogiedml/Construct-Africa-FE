// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { ActionButton, DataTable, FiltersSidebar } from "../components";
// import { CgSortAz } from "react-icons/cg";
// import type { TableColumn } from "../components/DataTable";
// import type { AppFilters, FilterCollection } from "../types/filter.types";

// const ITEMS_PER_PAGE = 25;

// interface RecentlyViewedItem {
//     id: number;
//     date_favourited: string;
//     type: FilterCollection;
//     title: string;
//     description: string;
// }

// const RecentlyViewed = () => {
//     const navigate = useNavigate();

//     const [currentPage, setCurrentPage] = useState(1);
//     const [showFilters, setShowFilters] = useState(false);
//     const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
//     const [isLoading] = useState(false);

//     const dummyItems: RecentlyViewedItem[] = useMemo(() => [
//         {
//             id: 1,
//             date_favourited: "01/01/2025",
//             type: "Project",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 2,
//             date_favourited: "01/01/2025",
//             type: "Project",
//             title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 3,
//             date_favourited: "01/01/2025",
//             type: "Company",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
//             description: "Facilitating cross-border trade and economic partnerships. This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 4,
//             date_favourited: "01/01/2025",
//             type: "Tender",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
//             description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
//         },
//         {
//             id: 5,
//             date_favourited: "01/01/2025",
//             type: "News",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 6,
//             date_favourited: "01/01/2025",
//             type: "Project",
//             title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 7,
//             date_favourited: "01/01/2025",
//             type: "Company",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
//             description: "Facilitating cross-border trade and economic partnerships."
//         },
//         {
//             id: 8,
//             date_favourited: "01/01/2025",
//             type: "Tender",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
//             description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
//         },
//         {
//             id: 9,
//             date_favourited: "01/01/2025",
//             type: "News",
//             title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//         {
//             id: 10,
//             date_favourited: "01/01/2025",
//             type: "Project",
//             title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
//             description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
//         },
//     ], []);

//     const filteredItems = useMemo(() => {
//         let items = [...dummyItems];

//         if (appliedFilters.status && Array.isArray(appliedFilters.status) && appliedFilters.status.length > 0) {
//             items = items.filter(item =>
//                 appliedFilters.status!.some(status =>
//                     item.type.toLowerCase() === status.toLowerCase()
//                 )
//             );
//         }

//         return items;
//     }, [dummyItems, appliedFilters]);

//     const paginatedItems = useMemo(() => {
//         const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//         return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//     }, [filteredItems, currentPage]);

//     const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

//     const getNavigationPath = (item: RecentlyViewedItem) => {
//         switch (item.type) {
//             case 'Project':
//                 return `/admin/projects/${item.id}`;
//             case 'Company':
//                 return `/admin/companies/${item.id}`;
//             case 'Tender':
//                 return `/admin/tenders/${item.id}`;
//             case 'News':
//                 return `/admin/news/${item.id}`;
//             default:
//                 return '#';
//         }
//     };

//     const tableColumns: TableColumn<RecentlyViewedItem>[] = [
//         {
//             key: 'date',
//             label: 'Date',
//             sortable: true,
//             width: '20%',
//             render: (value) => value as string
//         },
//         {
//             key: 'type',
//             label: 'Type',
//             sortable: true,
//             width: '15%',
//             render: (value) => (
//                 <span className="text-sm text-[#535862]">{value as string}</span>
//             )
//         },
//         {
//             key: 'title',
//             label: 'Name',
//             sortable: true,
//             width: '65%',
//             render: (_, row) => (
//                 <button
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(getNavigationPath(row));
//                     }}
//                     className="text-left w-full"
//                 >
//                     <div className="font-semibold text-[#181D27] hover:text-[#F89822] transition-colors mb-1 line-clamp-1">
//                         {row.title}
//                     </div>
//                     <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
//                         {row.description}
//                     </div>
//                 </button>
//             )
//         }
//     ];

//     const handleApplyFilters = (filters: AppFilters) => {
//         setAppliedFilters(filters);
//         setCurrentPage(1);
//     };

//     const activeFiltersCount = Object.values(appliedFilters).filter(
//         val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
//     ).length;

//     return (
//         <div className="min-h-screen mx-auto py-5 md:py-8">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Recently viewed</h1>
//                     <p className="text-[#535862]">
//                         Showing recently viewed
//                         {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
//                     </p>
//                 </div>
//             </div>

//             <div className="flex justify-end items-center mb-6">
//                 <div className="flex items-center gap-3">
//                     <ActionButton
//                         buttonText={
//                             <div className="flex items-center gap-2">
//                                 <CgSortAz size={20} />
//                                 Filters
//                                 {activeFiltersCount > 0 && (
//                                     <span className="ml-1 px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
//                                         {activeFiltersCount}
//                                     </span>
//                                 )}
//                             </div>
//                         }
//                         outline={true}
//                         width="fit"
//                         attributes={{
//                             onClick: () => setShowFilters(!showFilters)
//                         }}
//                     />
//                 </div>
//             </div>

//             <section className={showFilters ? 'flex gap-5 w-full' : 'w-full'}>
//                 <div className={showFilters ? 'flex-1 min-w-0' : 'w-full'}>
//                     {isLoading ? (
//                         <div className="flex items-center justify-center py-12">
//                             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
//                         </div>
//                     ) : (
//                         <DataTable
//                             data={paginatedItems as []}
//                             columns={tableColumns}
//                             onRowSelect={(rows) => console.log('Selected rows:', rows)}
//                             onRowClick={(row: Record<string, unknown> & { id: unknown; type: string; date_favourited: string; title: string; description: string }) => {
//                                 const item = row as RecentlyViewedItem;
//                                 navigate(getNavigationPath(item));
//                             }}
//                             currentPage={currentPage}
//                             onPageChange={setCurrentPage}
//                             totalPages={totalPages}
//                             showCheckboxes={true}
//                             showFavorites={false}
//                             loading={false}
//                             pageSize={ITEMS_PER_PAGE}
//                         />
//                     )}
//                 </div>

//                 {showFilters && (
//                     <FiltersSidebar
//                         isOpen={showFilters}
//                         onClose={() => setShowFilters(false)}
//                         onApplyFilters={handleApplyFilters}
//                         initialFilters={appliedFilters}
//                         type="projects"
//                     />
//                 )}
//             </section>
//         </div>
//     );
// };

// export default RecentlyViewed;



import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, DataTable, FiltersSidebar, CustomSelect } from "../components";
import { CgSortAz } from "react-icons/cg";
import type { TableColumn } from "../components/DataTable";
import type { AppFilters } from "../types/filter.types";
import { useGetRecentViewsQuery } from "../store/services/recentlyViews";

const ITEMS_PER_PAGE = 25;

type CollectionType = 'all' | 'projects' | 'companies' | 'news' | 'events' | 'experts_analysts' | 'tenders';

const RecentlyViewed = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
    const [collectionFilter, setCollectionFilter] = useState<CollectionType>('all');
    const [sortBy, setSortBy] = useState('recently-viewed');

    // Build query parameters
    const queryParams = useMemo(() => {
        const params: any = {
            limit: ITEMS_PER_PAGE,
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
            meta: "filter_count,total_count",
        };

        // Apply collection filter
        if (collectionFilter !== 'all') {
            params.collection = collectionFilter;
        }

        // Apply sorting
        switch (sortBy) {
            case 'recently-viewed':
                params.sort = '-date_created';
                break;
            case 'oldest-viewed':
                params.sort = 'date_created';
                break;
        }

        return params;
    }, [currentPage, sortBy, collectionFilter]);

    // Fetch recent views using RTK Query
    const { data: recentViewsResponse, isLoading, isFetching } = useGetRecentViewsQuery(queryParams);

    const recentViews = recentViewsResponse?.data || [];
    const totalCount = recentViewsResponse?.meta?.filter_count || 0;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const sortOptions = [
        { value: 'recently-viewed', label: 'Recently Viewed' },
        { value: 'oldest-viewed', label: 'Oldest Viewed' }
    ];

    const collectionOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'projects', label: 'Projects' },
        { value: 'companies', label: 'Companies' },
        { value: 'news', label: 'News' },
        { value: 'events', label: 'Events' },
        { value: 'experts_analysts', label: 'Expert Opinions' },
        { value: 'tenders', label: 'Tenders' }
    ];

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    };

    // Helper function to get collection display name
    const getCollectionDisplayName = (collection: string) => {
        const collectionMap: Record<string, string> = {
            'projects': 'Project',
            'companies': 'Company',
            'news': 'News',
            'events': 'Event',
            'experts_analysts': 'Expert Opinion',
            'tenders': 'Tender'
        };
        return collectionMap[collection] || collection;
    };

    // Helper function to get navigation path
    const getNavigationPath = (view: any) => {
        const { collection, item } = view;
        
        switch (collection) {
            case 'projects':
                return `/admin/projects/${item}`;
            case 'companies':
                return `/admin/companies/${item}`;
            case 'news':
                return `/admin/news/${item}`;
            case 'events':
                return `/admin/events/${item}`;
            case 'experts_analysts':
                // Assuming you have slug available, otherwise use id
                return `/admin/expert-opinions/${item}`;
            case 'tenders':
                return `/admin/tenders/${item}`;
            default:
                return '#';
        }
    };

    // Helper function to get title
    const getTitle = (item: any, collection: string) => {
        if (!item) return 'Untitled';
        
        switch (collection) {
            case 'experts_analysts':
                return item.name || 'Unknown Expert';
            default:
                return item.title || item.name || 'Untitled';
        }
    };

    // Helper function to get description
    const getDescription = (item: any, collection: string) => {
        if (!item) return '';
        
        const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, '').trim() || '';
        
        switch (collection) {
            case 'experts_analysts':
                return stripHtml(item.bio || item.opinion || '');
            case 'companies':
                return stripHtml(item.description || item.overview || '');
            default:
                return stripHtml(item.description || item.summary || '');
        }
    };

    const tableColumns: TableColumn<any>[] = [
        {
            key: 'date_created',
            label: 'Date Viewed',
            sortable: true,
            width: '15%',
            render: (value) => formatDate(value as string)
        },
        {
            key: 'collection',
            label: 'Type',
            sortable: true,
            width: '15%',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F89822]/10 text-[#F89822]">
                    {getCollectionDisplayName(value as string)}
                </span>
            )
        },
        {
            key: 'item',
            label: 'Item',
            sortable: false,
            width: '70%',
            render: (_, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(getNavigationPath(row));
                    }}
                    className="text-left w-full"
                >
                    <div className="font-semibold text-[#181D27] hover:text-[#F89822] transition-colors mb-1 line-clamp-1">
                        {getTitle(row.item_data, row.collection)}
                    </div>
                    <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
                        {getDescription(row.item_data, row.collection)}
                    </div>
                </button>
            )
        }
    ];

    const handleApplyFilters = (filters: AppFilters) => {
        setAppliedFilters(filters);
        setCurrentPage(1);
    };

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
        setCurrentPage(1);
    };

    const handleCollectionChange = (collection: string) => {
        setCollectionFilter(collection as CollectionType);
        setCurrentPage(1);
    };

    const activeFiltersCount = Object.values(appliedFilters).filter(
        val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
    ).length;

    return (
        <div className="min-h-screen mx-auto py-5 md:py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Recently Viewed</h1>
                    <p className="text-[#535862]">
                        Showing {recentViews.length} of {totalCount} recently viewed items
                        {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <CustomSelect
                        options={collectionOptions}
                        value={collectionFilter}
                        onChange={handleCollectionChange}
                        placeholder="All Types"
                    />
                    <CustomSelect
                        options={sortOptions}
                        value={sortBy}
                        onChange={handleSortChange}
                        placeholder="Recently Viewed"
                    />
                </div>
            </div>

            <div className="flex justify-end items-center mb-6">
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
                            onClick: () => setShowFilters(!showFilters)
                        }}
                    />
                </div>
            </div>

            <section className={showFilters ? 'flex gap-5 w-full' : 'w-full'}>
                <div className={showFilters ? 'flex-1 min-w-0' : 'w-full'}>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                        </div>
                    ) : recentViews.length > 0 ? (
                        <DataTable
                            data={recentViews as []}
                            columns={tableColumns}
                            onRowSelect={(rows) => console.log('Selected rows:', rows)}
                            onRowClick={(row: Record<string, unknown>) => {
                                navigate(getNavigationPath(row));
                            }}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            totalPages={totalPages}
                            showCheckboxes={true}
                            showFavorites={false}
                            loading={isFetching}
                            pageSize={ITEMS_PER_PAGE}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <p className="text-lg font-medium text-[#181D27] mb-2">No Recently Viewed Items</p>
                            <p className="text-sm text-[#535862]">Items you view will appear here</p>
                        </div>
                    )}
                </div>

                {showFilters && (
                    <FiltersSidebar
                        isOpen={showFilters}
                        onClose={() => setShowFilters(false)}
                        onApplyFilters={handleApplyFilters}
                        initialFilters={appliedFilters}
                        type="projects"
                    />
                )}
            </section>
        </div>
    );
};

export default RecentlyViewed;
