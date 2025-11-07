import { useParams, useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineShare } from 'react-icons/hi';
import { useGetTenderByIdQuery, useGetTendersQuery } from '../store/services/tenders';
import { DetailPageSkeleton, ProjectCard } from '../components';
import { cleanHtmlContent } from '../utils';
import { useMemo } from 'react';
import type { Tender as TenderType } from '../types/tenders.types';

const TenderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: tenderResponse, isLoading, error } = useGetTenderByIdQuery(id!);

    const tender = tenderResponse?.data;

    const dummyTender = {
        title: "Malawi invites bids for school and water system construction",
        location: "Southern Africa - Malawi - Infrastructure",
        author: "Mitchell Tikiwa",
        datePublished: "10/10/2025",
        readTime: 3,
        content: `<p>Malawi's Nsanje District Council is inviting bid submissions for the construction of a primary school and water reticulation system.</p>
        <p>The assignment is divided into two lots:</p>
        <ul>
            <li>Construction of 2 school blocks at Mwanambweri Primary School, 2 fully furnished administration blocks, 2 double-door toilets, and a playing field.</li>
            <li>Construction of the Nyanjidu water reticulation system.</li>
        </ul>
        <p>The duration of the project is 90 days for the first lot and 60 days for the second.</p>
        <p>The World Bank is supporting the project.</p>
        <p>A mandatory site visit should be conducted at any time during working hours.</p>
        <p>Firms can obtain further information from Monday to Friday from 08h00 to 16h30.</p>
        <p>Proposals must be physically delivered by 10h00 (local time) on 28 August 2025, at:</p>
        <p>The IPDC Chairperson,<br>
        Nsanje District Council,<br>
        Private bag 1,<br>
        Nsanje,</p>
        <p>Electronic submissions will not be accepted.</p>
        <p>The invitation to bid can be viewed <a href="#" class="text-[#E0891E] underline">here</a>.</p>
        <p>Photo: Malawi map (© Butenkow | Dreamstime)</p>`,
    };

    // Dummy related tenders
    const dummyRelatedTenders = [
        {
            id: '1',
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest.",
            location: "Cape Town, South Africa",
            category: "Transport/Infrastructure",
            date: "11/09/2025",
            status: "Accepting proposals",
            image: "/images/null-image.svg"
        },
        {
            id: '2',
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest.",
            location: "Cape Town, South Africa",
            category: "Transport/Infrastructure",
            date: "11/09/2025",
            status: "Accepting proposals",
            image: "/images/null-image.svg"
        }
    ];

    // Fetch related tenders (same category, excluding current)
    const relatedTendersParams = useMemo(() => {
        if (!tender) return { limit: 3, 'filter[status][_eq]': 'published' };

        return {
            limit: 3,
            'filter[id][_neq]': id,
            'filter[status][_eq]': 'published',
        };
    }, [tender, id]);

    const { data: relatedTendersResponse } = useGetTendersQuery(relatedTendersParams);

    if (isLoading) {
        return <DetailPageSkeleton showSidebar={true} />;
    }

    if (error || !tender) {
        const displayTender = dummyTender;
        const relatedTenders = dummyRelatedTenders;

        return (
            <div className="min-h-screen bg-white">
                <section className='bg-white pt-14'>
                    <div className='py-6 flex justify-between items-start'>
                        <div className='flex-1'>
                            <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                {displayTender.title}
                            </h2>
                            <div className='flex flex-wrap items-center gap-1 text-sm text-[#535862]'>
                                <span>{displayTender.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                            <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                                <AiOutlineStar size={18} className="text-[#535862]" />
                                <span className="text-sm text-[#535862] hidden md:inline">Add to favourites</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                                <HiOutlineShare size={18} className="text-[#535862]" />
                                <span className="text-sm text-[#535862] hidden md:inline">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className='px-5 md:px-10 lg:px-20 pb-6'>
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                            Quick info
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiUser size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Author</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">{displayTender.author}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Date published</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">{displayTender.datePublished}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiClock size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Read time</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">{displayTender.readTime} minutes</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className='py-10 px-5 md:px-10 lg:px-20'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14'>
                        {/* Main Content Area */}
                        <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-10'>
                            {/* About Section */}
                            <div id="about">
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                    About
                                </h3>

                                {/* Article Content */}
                                <div className='flex flex-col gap-4'>
                                    <div
                                        className='text-base text-[#535862] leading-relaxed prose prose-sm max-w-none'
                                        dangerouslySetInnerHTML={{
                                            __html: displayTender.content
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                            <div className='flex flex-col gap-6 lg:gap-10'>
                                {relatedTenders.length > 0 && (
                                    <div>
                                        <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                            Related Tenders
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            {relatedTenders.map((item) => (
                                                <ProjectCard
                                                    key={item.id}
                                                    image={item.image}
                                                    title={item.title}
                                                    description={item.description}
                                                    location={item.location}
                                                    category={item.category}
                                                    deadline={item.date}
                                                    status={item.status}
                                                    onClick={() => navigate(`/admin/tenders/${item.id}`)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        );
    }

    // Extract data from tender
    const author = "Mitchell Tikiwa"; // Dummy for now

    // Format date
    const publishedDate = new Date(tender.date_created).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    // Get read time
    const readTimeMinutes = typeof tender.read_time === 'object' && tender.read_time !== null
        ? (tender.read_time as { minutes: number }).minutes
        : 3;

    // Get featured image URL
    const getImageUrl = () => {
        if (!tender.featured_image) return "/images/null-image.svg";

        if (typeof tender.featured_image === 'string') {
            return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${tender.featured_image}`;
        }

        if (tender.featured_image && typeof tender.featured_image === 'object' && 'filename_disk' in tender.featured_image) {
            return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${tender.featured_image.filename_disk}`;
        }

        return "/images/null-image.svg";
    };

    // Get related tenders (exclude current tender)
    const relatedTenders = relatedTendersResponse?.data?.filter(item => item.id !== id).slice(0, 2) || dummyRelatedTenders;

    // Build location string (dummy for now)
    const location = "Southern Africa - Malawi - Infrastructure";

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className='bg-white pt-14'>
                <div className='py-6 flex justify-between items-start'>
                    <div className='flex-1'>
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                            {tender.title}
                        </h2>
                        <div className='flex flex-wrap items-center gap-1 text-sm text-[#535862]'>
                            <span>{location}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                            <AiOutlineStar size={18} className="text-[#535862]" />
                            <span className="text-sm text-[#535862] hidden md:inline">Add to favourites</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                            <HiOutlineShare size={18} className="text-[#535862]" />
                            <span className="text-sm text-[#535862] hidden md:inline">Share</span>
                        </button>
                    </div>
                </div>

                {/* Quick Info */}
                <div className='pb-6'>
                    <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                        Quick info
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <FiUser size={18} className="text-[#535862]" />
                                <span className="text-base text-[#535862]">Author</span>
                            </div>
                            <span className="text-base text-[#181D27] ml-7">{author}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <FiCalendar size={18} className="text-[#535862]" />
                                <span className="text-base text-[#535862]">Date published</span>
                            </div>
                            <span className="text-base text-[#181D27] ml-7">{publishedDate}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <FiClock size={18} className="text-[#535862]" />
                                <span className="text-base text-[#535862]">Read time</span>
                            </div>
                            <span className="text-base text-[#181D27] ml-7">{readTimeMinutes} minutes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className='py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14'>
                    {/* Main Content Area */}
                    <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-10'>
                        {/* About Section */}
                        <div id="about">
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                About
                            </h3>

                            {/* Article Content */}
                            <div className='flex flex-col gap-4'>
                                <div
                                    className='text-base text-[#535862] leading-relaxed prose prose-sm max-w-none'
                                    dangerouslySetInnerHTML={{
                                        __html: tender.content || tender.summary || 'No content available.'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                        <div className='flex flex-col gap-6 lg:gap-10'>
                            {relatedTenders.length > 0 && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                        Related Tenders
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {relatedTenders.map((item: TenderType | typeof dummyRelatedTenders[0]) => {
                                            const getItemImageUrl = () => {
                                                if ('image' in item) {
                                                    return item.image;
                                                }
                                                if (!item.featured_image) return "/images/null-image.svg";
                                                if (typeof item.featured_image === 'string') {
                                                    return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${item.featured_image}`;
                                                }
                                                if (item.featured_image && typeof item.featured_image === 'object' && 'filename_disk' in item.featured_image) {
                                                    return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${item.featured_image.filename_disk}`;
                                                }
                                                return "/images/null-image.svg";
                                            };

                                            const itemDate = 'date' in item
                                                ? item.date
                                                : new Date((item as TenderType).date_created).toLocaleDateString('en-US', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    year: 'numeric'
                                                });

                                            const itemTitle = 'title' in item ? item.title : (item as TenderType).title;
                                            const itemDescription = 'description' in item
                                                ? item.description
                                                : (item as TenderType).summary || cleanHtmlContent((item as TenderType).content)?.substring(0, 150) + '...' || '';
                                            const itemLocation = 'location' in item ? item.location : 'N/A';
                                            const itemCategory = 'category' in item ? item.category : 'Tender';
                                            const itemStatus = 'status' in item ? item.status : ((item as TenderType).is_free_tender ? 'Free' : 'Premium');

                                            return (
                                                <ProjectCard
                                                    key={item.id}
                                                    image={getItemImageUrl()}
                                                    title={itemTitle}
                                                    description={itemDescription}
                                                    location={itemLocation}
                                                    category={itemCategory}
                                                    deadline={itemDate}
                                                    status={itemStatus}
                                                    onClick={() => navigate(`/admin/tenders/${item.id}`)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default TenderDetails;

