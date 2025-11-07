import { useParams, useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineShare } from 'react-icons/hi';
import { useGetNewsByIdQuery, useGetNewsQuery } from '../store/services/news';
import { useGetProjectsQuery } from '../store/services/projects';
import { DetailPageSkeleton, ProjectCard } from '../components';
import { cleanHtmlContent } from '../utils';
import { useMemo } from 'react';
import type { News as NewsType } from '../types/news.types';

const NewsDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: newsResponse, isLoading, error } = useGetNewsByIdQuery(id!);

    const news = newsResponse?.data;

    const relatedNewsParams = useMemo(() => {
        if (!news || !news.category_id) return { limit: 3, 'filter[status][_eq]': 'published' };

        const categoryId = typeof news.category_id === 'object' && news.category_id !== null
            ? (news.category_id as { id: string }).id
            : typeof news.category_id === 'string'
                ? news.category_id
                : undefined;

        return {
            limit: 3,
            'filter[category_id][_eq]': categoryId,
            'filter[id][_neq]': id,
            'filter[status][_eq]': 'published',
        };
    }, [news, id]);

    const { data: relatedNewsResponse } = useGetNewsQuery(relatedNewsParams);

    // Fetch related projects (same sectors/countries as news)
    const relatedProjectsParams = useMemo(() => {
        if (!news) return { limit: 2 };

        const sectorId = news.sectors && news.sectors.length > 0
            ? news.sectors[0].sectors_id.id
            : undefined;

        const countryId = news.countries && news.countries.length > 0
            ? news.countries[0].countries_id.id
            : undefined;

        const params: Record<string, unknown> = { limit: 2 };

        if (sectorId) {
            params['filter[sectors][sectors_id][id][_eq]'] = sectorId;
        } else if (countryId) {
            params['filter[countries][countries_id][id][_eq]'] = countryId;
        }

        return params;
    }, [news]);

    const { data: relatedProjectsResponse } = useGetProjectsQuery(relatedProjectsParams);

    if (isLoading) {
        return <DetailPageSkeleton showSidebar={true} />;
    }

    if (error || !news) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#181D27] mb-2">News not found</h2>
                    <p className="text-[#535862] mb-4">The news article you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/admin/news')}
                        className="px-4 py-2 bg-[#F89822] text-white rounded-lg hover:bg-[#E0891E] transition-colors"
                    >
                        Back to News
                    </button>
                </div>
            </div>
        );
    }

    // Extract data from news
    const author = typeof news.author_id === 'object' && news.author_id !== null
        ? (news.author_id as { first_name: string; last_name: string })
        : null;

    const authorName = author ? `${author.first_name} ${author.last_name}` : 'Unknown';

    const countries = news.countries?.map(c => c.countries_id.name).join(', ') || '';
    const sectors = news.sectors?.map(s => s.sectors_id.name).join(', ') || '';
    const regions = news.regions?.map(r => r.regions_id.name).join(', ') || '';

    // Build location string
    const locationParts = [regions, countries].filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(' - ') : '';

    // Format date
    const publishedDate = new Date(news.date_created).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    // Get read time
    const readTimeMinutes = typeof news.read_time === 'object' && news.read_time !== null
        ? (news.read_time as { minutes: number }).minutes
        : 3;

    // Get featured image URL
    const getImageUrl = () => {
        if (!news.featured_image) return "/images/null-image.svg";

        if (typeof news.featured_image === 'string') {
            return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${news.featured_image}`;
        }

        if (news.featured_image && typeof news.featured_image === 'object' && 'filename_disk' in news.featured_image) {
            return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${news.featured_image.filename_disk}`;
        }

        return "/images/null-image.svg";
    };

    // Get related news (exclude current news)
    const relatedNews = relatedNewsResponse?.data?.filter(item => item.id !== id).slice(0, 2) || [];

    // Get related projects
    const relatedProjects = relatedProjectsResponse?.data || [];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className='bg-white pt-14'>
                <div className='py-6 flex justify-between items-start'>
                    <div className='flex-1'>
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                            {news.title}
                        </h2>
                        <div className='flex flex-wrap items-center gap-1 text-sm text-[#535862]'>
                            {location && <span>{location}</span>}
                            {location && sectors && <span>-</span>}
                            {sectors && <span>{sectors}</span>}
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
                <div className=''>
                    <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                        Quick info
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <FiUser size={18} className="text-[#535862]" />
                                <span className="text-base text-[#535862]">Author</span>
                            </div>
                            <span className="text-base text-[#181D27] ml-7">{authorName}</span>
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

                            {/* Featured Image */}
                            {news.featured_image && (
                                <div className='w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-6'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={getImageUrl()}
                                        alt={news.title}
                                    />
                                </div>
                            )}

                            {/* Article Content */}
                            <div className='flex flex-col gap-4'>
                                <div
                                    className='text-base text-[#535862] leading-relaxed prose prose-sm max-w-none'
                                    dangerouslySetInnerHTML={{
                                        __html: news.content || news.summary || 'No content available.'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                        <div className='flex flex-col gap-6 lg:gap-10'>
                            {/* Related News */}
                            {relatedNews.length > 0 && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                        Related News
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {relatedNews.map((item: NewsType) => {
                                            const getItemImageUrl = () => {
                                                if (!item.featured_image) return "/images/null-image.svg";
                                                if (typeof item.featured_image === 'string') {
                                                    return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${item.featured_image}`;
                                                }
                                                if (item.featured_image && typeof item.featured_image === 'object' && 'filename_disk' in item.featured_image) {
                                                    return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${item.featured_image.filename_disk}`;
                                                }
                                                return "/images/null-image.svg";
                                            };

                                            const itemDate = new Date(item.date_created).toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                year: 'numeric'
                                            });

                                            const itemCountries = item.countries?.map(c => c.countries_id.name).join(', ') || '';
                                            const itemSectors = item.sectors?.map(s => s.sectors_id.name).join(', ') || '';
                                            const itemCategory = typeof item.category_id === 'object' && item.category_id !== null
                                                ? (item.category_id as { name: string }).name
                                                : 'News';

                                            return (
                                                <ProjectCard
                                                    key={item.id}
                                                    image={getItemImageUrl()}
                                                    title={item.title}
                                                    description={item.summary || cleanHtmlContent(item.content)?.substring(0, 150) + '...' || ''}
                                                    location={itemCountries}
                                                    category={itemSectors || itemCategory}
                                                    deadline={itemDate}
                                                    onClick={() => navigate(`/admin/news/${item.id}`)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Related Projects */}
                            {relatedProjects.length > 0 && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                                        Related Projects
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {relatedProjects.slice(0, 2).map((project) => {
                                            const projectImage = project.featured_image?.filename_disk
                                                ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}`
                                                : "/images/null-image.svg";

                                            const projectCountries = Array.isArray(project.countries)
                                                ? project.countries.map((c: { countries_id: { name: string } }) => c.countries_id.name).join(', ')
                                                : '';

                                            const projectSectors = Array.isArray(project.sectors)
                                                ? project.sectors.map((s: { sectors_id: { name: string } }) => s.sectors_id.name).join(', ')
                                                : '';

                                            return (
                                                <ProjectCard
                                                    key={project.id}
                                                    image={projectImage}
                                                    title={project.title}
                                                    description={project.description || ''}
                                                    location={projectCountries}
                                                    category={projectSectors}
                                                    onClick={() => navigate(`/admin/projects/${project.id}`)}
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

export default NewsDetails;

