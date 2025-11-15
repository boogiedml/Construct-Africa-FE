import { useState, useMemo } from "react";
import { ActionButton, CustomSelect, FiltersSidebar, ExpertCard } from "../components";
import { CgSortAz } from "react-icons/cg";
import type { AppFilters } from "../types/filter.types";
import { featuredOpinions } from "../data/home.data";

interface ExpertOpinion {
    id: number;
    name: string;
    title: string;
    opinion: string;
    image: string;
}

const ExpertOpinions = () => {
    const [sortBy, setSortBy] = useState('recently-added');
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
    const [isLoading] = useState(false);

    const dummyOpinions: ExpertOpinion[] = useMemo(() => [
        ...featuredOpinions,
        {
            id: 4,
            name: "Vusipenga Thembekwayo",
            title: "African Construction Market Reaches Record $180 Billion in 2025 Reports",
            opinion: "Lagos-Calabar Coastal Railway is a 1,400-kilometre standard gauge railway line designed to connect Nigeria's major coastal cities, states and villages.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 5,
            name: "Kwame Mensah",
            title: "Sustainable Infrastructure Development in West Africa",
            opinion: "The future of African construction lies in sustainable practices that balance economic growth with environmental responsibility and social equity.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 6,
            name: "Fatima Hassan",
            title: "Digital Transformation in African Construction",
            opinion: "Embracing digital technologies and innovative construction methods will be crucial for Africa's infrastructure development in the coming decades.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 7,
            name: "John Mwangi",
            title: "Public-Private Partnerships in Infrastructure",
            opinion: "Effective PPP models are essential for bridging Africa's infrastructure gap and attracting the necessary investment for large-scale projects.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 8,
            name: "Aisha Diallo",
            title: "Urban Planning and Smart Cities in Africa",
            opinion: "As African cities continue to grow, smart urban planning and sustainable city development will become increasingly important for quality of life.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop"
        }
    ], []);

    const sortOptions = [
        { value: 'recently-added', label: 'Recently added' },
        { value: 'oldest', label: 'Oldest first' },
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'name', label: 'Name (A-Z)' }
    ];

    // Filter and sort opinions
    const filteredOpinions = useMemo(() => {
        let opinions = [...dummyOpinions];

        // Apply filters
        if (appliedFilters.country && Array.isArray(appliedFilters.country) && appliedFilters.country.length > 0) {
            // Filter logic can be added based on expert location if available
        }

        if (appliedFilters.region && Array.isArray(appliedFilters.region) && appliedFilters.region.length > 0) {
            // Filter logic can be added based on expert region if available
        }

        // Apply sorting
        switch (sortBy) {
            case 'recently-added':
                // Keep original order (newest first)
                break;
            case 'oldest':
                opinions.reverse();
                break;
            case 'alphabetical':
                opinions.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name':
                opinions.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return opinions;
    }, [dummyOpinions, appliedFilters, sortBy]);

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
    };

    const handleApplyFilters = (filters: AppFilters) => {
        setAppliedFilters(filters);
    };

    const activeFiltersCount = Object.values(appliedFilters).filter(
        val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
    ).length;

    return (
        <div className="min-h-screen mx-auto py-5 md:py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Expert Opinion</h1>
                    <p className="text-[#535862]">
                        Showing expert opinions
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
                        <div className={`grid grid-cols-1 ${!showFilters ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 sm:gap-4`}>
                            {filteredOpinions.map((expert) => (
                                <ExpertCard
                                    key={expert.id}
                                    expertImage={expert.image}
                                    expertName={expert.name}
                                    title={expert.title}
                                    opinion={expert.opinion}
                                    expertId={expert.id}
                                />
                            ))}
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

export default ExpertOpinions;

