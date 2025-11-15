import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, Tabs, DataTable, CustomSelect, FiltersSidebar, ProjectCard, ProjectCardSkeleton } from "../components";
import { LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import type { AppFilters } from "../types/filter.types";

const ITEMS_PER_PAGE = 25;

interface Event {
    id: number;
    date_favourited: string;
    location: string;
    title: string;
    description: string;
}

const Events = () => {
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('recently-added');
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
    const [isLoading] = useState(false);

    const dummyEvents: Event[] = useMemo(() => [
        {
            id: 1,
            date_favourited: "01/01/2025",
            location: "Senegal",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 2,
            date_favourited: "01/01/2025",
            location: "Ghana",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 3,
            date_favourited: "01/01/2025",
            location: "Nairobi",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "Facilitating cross-border trade and economic partnerships."
        },
        {
            id: 4,
            date_favourited: "01/01/2025",
            location: "Cairo",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
        },
        {
            id: 5,
            date_favourited: "01/01/2025",
            location: "Lagos",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 6,
            date_favourited: "01/01/2025",
            location: "Dakar",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 7,
            date_favourited: "01/01/2025",
            location: "Abuja",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "Facilitating cross-border trade and economic partnerships."
        },
        {
            id: 8,
            date_favourited: "01/01/2025",
            location: "Accra",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor)",
            description: "A vital infrastructure project enhancing trade and connectivity in East Africa."
        },
        {
            id: 9,
            date_favourited: "01/01/2025",
            location: "Tunis",
            title: "Horn of Africa Initiative: Regional Economic Corridor (Addis-Djibouti Corridor), Ethiopia and Djibouti",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
        {
            id: 10,
            date_favourited: "01/01/2025",
            location: "Algiers",
            title: "Greater Cairo Air Pollution Management and Climate Change, Egypt",
            description: "This project aims to develop a cutting-edge public transport system that reduces traffic congestion and lowers emissions in urban areas."
        },
    ], []);

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

    const sortOptions = [
        { value: 'recently-added', label: 'Recently added' },
        { value: 'oldest', label: 'Oldest first' },
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'date-newest', label: 'Date (Newest First)' },
        { value: 'date-oldest', label: 'Date (Oldest First)' }
    ];

    const filteredEvents = useMemo(() => {
        let events = [...dummyEvents];

        if (appliedFilters.country && Array.isArray(appliedFilters.country) && appliedFilters.country.length > 0) {
            events = events.filter(event =>
                appliedFilters.country!.some(country =>
                    event.location.toLowerCase().includes(country.toLowerCase())
                )
            );
        }

        if (appliedFilters.region && Array.isArray(appliedFilters.region) && appliedFilters.region.length > 0) {
            events = events.filter(event =>
                appliedFilters.region!.some(region =>
                    event.location.toLowerCase().includes(region.toLowerCase())
                )
            );
        }

        switch (sortBy) {
            case 'recently-added':
                events.sort((a, b) => new Date(b.date_favourited).getTime() - new Date(a.date_favourited).getTime());
                break;
            case 'oldest':
                events.sort((a, b) => new Date(a.date_favourited).getTime() - new Date(b.date_favourited).getTime());
                break;
            case 'alphabetical':
                events.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date-newest':
                events.sort((a, b) => new Date(b.date_favourited).getTime() - new Date(a.date_favourited).getTime());
                break;
            case 'date-oldest':
                events.sort((a, b) => new Date(a.date_favourited).getTime() - new Date(b.date_favourited).getTime());
                break;
        }

        return events;
    }, [dummyEvents, appliedFilters, sortBy]);

    // Pagination
    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredEvents, currentPage]);

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

    const tableColumns: TableColumn<Event>[] = [
        {
            key: 'date_favourited',
            label: 'Date favourited',
            sortable: true,
            width: '20%',
            render: (value) => value as string
        },
        {
            key: 'location',
            label: 'Location',
            sortable: true,
            width: '20%',
            render: (value) => value as string
        },
        {
            key: 'title',
            label: 'Website',
            sortable: true,
            width: '60%',
            render: (_, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/events/${row.id}`);
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

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
        setCurrentPage(1);
    };

    const handleApplyFilters = (filters: AppFilters) => {
        setAppliedFilters(filters);
        setCurrentPage(1);
    };

    // Count active filters
    const activeFiltersCount = Object.values(appliedFilters).filter(
        val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
    ).length;

    return (
        <div className="min-h-screen mx-auto py-5 md:py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Events</h1>
                    <p className="text-[#535862]">
                        Showing recently added events
                        {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <CustomSelect
                        options={sortOptions}
                        value={sortBy}
                        onChange={handleSortChange}
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
                    {/* Table View */}
                    {activeView === 'table' && (
                        <>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                                </div>
                            ) : (
                                <DataTable
                                    data={paginatedEvents as []}
                                    columns={tableColumns}
                                    onRowSelect={(rows) => console.log('Selected rows:', rows)}
                                    onRowClick={(row: Record<string, unknown> & { id: unknown }) => navigate(`/admin/events/${row.id}`)}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                    totalPages={totalPages}
                                    showCheckboxes={true}
                                    showFavorites={false}
                                    loading={false}
                                    pageSize={ITEMS_PER_PAGE}
                                />
                            )}
                        </>
                    )}

                    {/* Grid View */}
                    {activeView === 'grid' && (
                        <>
                            {isLoading ? (
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
                                    ))}
                                </div>
                            ) : (
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                                    {paginatedEvents.map((event) => (
                                        <ProjectCard
                                            key={event.id}
                                            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
                                            // status="Event"
                                            title={event.title}
                                            description={event.description}
                                            location={event.location}
                                            value={event.date_favourited}
                                            onClick={() => navigate(`/admin/events/${event.id}`)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
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

export default Events;

