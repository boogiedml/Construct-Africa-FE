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

const PublicExpertOpinion = () => {
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
        <div className="min-h-screen mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-10 xl:px-20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className='text-base sm:text-lg md:text-xl font-semibold text-[#181D27] border-b-2 sm:border-b-4 border-[#F89822] py-1 pr-2 sm:pr-4 w-fit'>
                    All Expert Opinions
                </div>
                <ActionButton
                    buttonText={
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <CgSortAz size={18} className="sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                    }
                    outline={true}
                    width="fit"
                    paddingX="px-3 sm:px-4"
                    textSize="text-sm sm:text-base"
                    attributes={{
                        onClick: () => setShowFilters(!showFilters)
                    }}
                />
            </div>

            <section className={`relative ${showFilters ? 'flex flex-col-reverse lg:flex-row gap-4 sm:gap-5 lg:gap-6 w-full' : 'w-full'}`}>
                <div className={`${showFilters ? 'flex-1 min-w-0 lg:order-2' : 'w-full'}`}>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-1 ${!showFilters
                                ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                            } gap-4 sm:gap-5 md:gap-6`}>
                            {filteredOpinions.map((expert) => (
                                <ExpertCard
                                    key={expert.id}
                                    expertImage={expert.image}
                                    expertName={expert.name}
                                    title={expert.title}
                                    opinion={expert.opinion}
                                    expertId={expert.id}
                                    link={`/insights/expert-opinions/${expert.id}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showFilters && (
                    <div className={`${showFilters ? 'lg:w-[320px] xl:w-[360px] lg:flex-shrink-0 lg:order-1' : 'hidden'}`}>
                        <FiltersSidebar
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            onApplyFilters={handleApplyFilters}
                            initialFilters={appliedFilters}
                            type="projects"
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

export default PublicExpertOpinion;

