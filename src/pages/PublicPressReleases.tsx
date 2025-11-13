import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';
import { useNavigate } from 'react-router-dom';

interface PressRelease {
    id: number;
    image: string;
    date: string;
    title: string;
    description: string;
}

const PublicPressReleases = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(7);

    const pressReleases: PressRelease[] = useMemo(() => [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        },
        {
            id: 10,
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "01/01/2025",
            title: "Team Europe and its African Partners Launch Joint Programme to Strengthen Health Systems in East and Southern Africa",
            description: "The programme Regional Access and Accountability for Increased SRHR Equity in East and Southern Africa (RAISE SRHR) aims to improve access to life-saving sexual and reproductive health services and commodities"
        }
    ], []);

    const filteredReleases = useMemo(() => {
        if (!searchQuery.trim()) return pressReleases;

        const query = searchQuery.toLowerCase();
        return pressReleases.filter(release =>
            release.title.toLowerCase().includes(query) ||
            release.description.toLowerCase().includes(query)
        );
    }, [pressReleases, searchQuery]);

    const displayedReleases = filteredReleases.slice(0, displayCount);
    const hasMore = filteredReleases.length > displayCount;

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 7);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#717680] font-medium mb-2 uppercase tracking-wide">
                        Press Releases
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        APO News
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        <a
                            href="/refund-policy"
                            className="text-[#535862] transition-all duration-300 hover:underline"
                        >
                            Read about the ConstructAfrica refund guidelines.
                        </a>
                    </p>

                    <div className="max-w-[320px] mx-auto relative">
                        <FiSearch
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4A7AE]"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 border border-[#E9EAEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E0891E] focus:border-transparent text-[#181D27]"
                        />
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6 md:space-y-8">
                        {displayedReleases.map((release) => (
                            <article
                                key={release.id}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer group border-b border-[#E9EAEB] pb-8 last:pb-0 last:border-b-0"
                                onClick={() => navigate(`/news/${release.id}`)}
                            >
                                <div className="flex-shrink-0 w-full sm:w-[200px] md:w-[240px] h-[200px] sm:h-[160px] md:h-[160px] rounded-3xl overflow-hidden">
                                    <img
                                        src={release.image}
                                        alt={release.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#717680] mb-2">
                                        {release.date}
                                    </p>
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#181D27] mb-2 leading-tight group-hover:text-[#E0891E] transition-colors">
                                        {release.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                        {release.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {hasMore && (
                        <div className="mt-8 md:mt-12 text-center">
                            <ActionButton
                                buttonText="Load more"
                                width="fit"
                                paddingX="px-8"
                                backgroundColor="#E0891E"
                                attributes={{
                                    onClick: handleLoadMore,
                                    type: "button"
                                }}
                            />
                        </div>
                    )}

                    {displayedReleases.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-base sm:text-lg text-[#535862]">
                                No press releases found matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PublicPressReleases;

