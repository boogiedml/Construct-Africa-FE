import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, DataTable, FiltersSidebar } from "../components";
import { CgSortAz } from "react-icons/cg";
import type { TableColumn } from "../components/DataTable";
import type { AppFilters } from "../types/filter.types";

const ITEMS_PER_PAGE = 25;

interface RecentlyViewedItem {
    id: number;
    date_favourited: string;
    type: 'Project' | 'Company' | 'Tender' | 'News';
    title: string;
    description: string;
}

const RecentlyViewed = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
    const [isLoading] = useState(false);

    const dummyItems: RecentlyViewedItem[] = useMemo(() => [
        {
            id: 1,
            date_favourited: "01/01/2025",
            type: "Project",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 2,
            date_favourited: "01/01/2025",
            type: "Project",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 3,
            date_favourited: "01/01/2025",
            type: "Company",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "Facilitating cross-border trade and economic partnerships. This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 4,
            date_favourited: "01/01/2025",
            type: "Tender",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
        },
        {
            id: 5,
            date_favourited: "01/01/2025",
            type: "News",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 6,
            date_favourited: "01/01/2025",
            type: "Project",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 7,
            date_favourited: "01/01/2025",
            type: "Company",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "Facilitating cross-border trade and economic partnerships."
        },
        {
            id: 8,
            date_favourited: "01/01/2025",
            type: "Tender",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
        },
        {
            id: 9,
            date_favourited: "01/01/2025",
            type: "News",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 10,
            date_favourited: "01/01/2025",
            type: "Project",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
    ], []);

    const filteredItems = useMemo(() => {
        let items = [...dummyItems];

        if (appliedFilters.status && Array.isArray(appliedFilters.status) && appliedFilters.status.length > 0) {
            items = items.filter(item =>
                appliedFilters.status!.some(status =>
                    item.type.toLowerCase() === status.toLowerCase()
                )
            );
        }

        return items;
    }, [dummyItems, appliedFilters]);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    const getNavigationPath = (item: RecentlyViewedItem) => {
        switch (item.type) {
            case 'Project':
                return `/admin/projects/${item.id}`;
            case 'Company':
                return `/admin/companies/${item.id}`;
            case 'Tender':
                return `/admin/tenders/${item.id}`;
            case 'News':
                return `/admin/news/${item.id}`;
            default:
                return '#';
        }
    };

    const tableColumns: TableColumn<RecentlyViewedItem>[] = [
        {
            key: 'date_favourited',
            label: 'Date favourited',
            sortable: true,
            width: '20%',
            render: (value) => value as string
        },
        {
            key: 'type',
            label: 'Type',
            sortable: true,
            width: '15%',
            render: (value) => (
                <span className="text-sm text-[#535862]">{value as string}</span>
            )
        },
        {
            key: 'title',
            label: 'Website',
            sortable: true,
            width: '65%',
            render: (_, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(getNavigationPath(row));
                    }}
                    className="text-left w-full"
                >
                    <div className="font-semibold text-[#181D27] hover:text-[#F89822] transition-colors mb-1 line-clamp-1">
                        {row.title}
                    </div>
                    <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
                        {row.description}
                    </div>
                </button>
            )
        }
    ];

    const handleApplyFilters = (filters: AppFilters) => {
        setAppliedFilters(filters);
        setCurrentPage(1);
    };

    const activeFiltersCount = Object.values(appliedFilters).filter(
        val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
    ).length;

    return (
        <div className="min-h-screen mx-auto py-5 md:py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Recently viewed</h1>
                    <p className="text-[#535862]">
                        Showing recently viewed
                        {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
                    </p>
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
                    ) : (
                        <DataTable
                            data={paginatedItems as []}
                            columns={tableColumns}
                            onRowSelect={(rows) => console.log('Selected rows:', rows)}
                            onRowClick={(row: Record<string, unknown> & { id: unknown; type: string; date_favourited: string; title: string; description: string }) => {
                                const item = row as RecentlyViewedItem;
                                navigate(getNavigationPath(item));
                            }}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            totalPages={totalPages}
                            showCheckboxes={true}
                            showFavorites={false}
                            loading={false}
                            pageSize={ITEMS_PER_PAGE}
                        />
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

