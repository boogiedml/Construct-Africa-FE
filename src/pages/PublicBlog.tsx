import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import { FiArrowUpRight } from 'react-icons/fi';
import { useMemo } from 'react';
import { CgSortAz } from 'react-icons/cg';
import { ProjectCard2 } from '../components';
import { newsArticles } from '../data/home.data';

interface BlogPost {
    id: number;
    image: string;
    date: string;
    title: string;
    description: string;
}

const PublicBlog = () => {
    const navigate = useNavigate();

    const blogPosts: BlogPost[] = useMemo(() => [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "19 Jan 2025",
            title: "Digital Construction in Africa: Building Smarter, Faster, and More Sustainably",
            description: "While sectors like finance and manufacturing have gone digital, construction still leans heavily on manual methods and traditional systems."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "18 Jan 2025",
            title: "Digital Construction in Africa: Building Smarter, Faster, and More Sustainably",
            description: "While sectors like finance and manufacturing have gone digital, co..."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
            date: "18 Jan 2025",
            title: "Digital Construction in Africa: Building Smarter, Faster, and More Sustainably",
            description: "While sectors like finance and manufacturing have gone digital, co..."
        }
    ], []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-5xl mx-auto text-center">
                    <p className='mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#414651] uppercase tracking-wide'>Our blog</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                        Other insights and updates
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-4 sm:mb-6 leading-relaxed max-w-[46rem] mx-auto px-2">
                        Subscribe to news or projects to get access to companies, contacts, live updates on projects, tenders and other premium benefits.
                    </p>
                    <div className='max-w-md mx-auto px-2'>
                        <ActionButton
                            buttonText="Book a Demo"
                            width="full"
                            backgroundColor='#E0891E'
                            paddingX="px-6 sm:px-8 md:px-10"
                            textSize="text-sm sm:text-base"
                            link="/book-a-demo"
                        />
                    </div>
                </div>
            </section>

            {/* Recent Blog Posts Section */}
            <section className="px-4 sm:px-6 lg:px-10 xl:px-20 pt-6 sm:pt-8 md:pt-12 lg:pt-10 pb-8 sm:pb-10 md:pb-12">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    Recent blog posts
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {/* Featured Post */}
                    <div
                        className="bg-white overflow-hidden cursor-pointer group"
                        onClick={() => navigate(`/insights/blog/${blogPosts[0].id}`)}
                    >
                        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-lg sm:rounded-xl">
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="pt-4 sm:pt-5 md:pt-6">
                            <p className="text-xs sm:text-sm text-[#AE6A19] mb-2 sm:mb-3">
                                {blogPosts[0].date}
                            </p>
                            <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                                <h3 className="text-lg sm:text-xl font-semibold text-[#181D27] leading-tight group-hover:text-[#E0891E] transition-colors flex-1">
                                    {blogPosts[0].title}
                                </h3>
                                <FiArrowUpRight
                                    size={18}
                                    className="text-[#535862] group-hover:text-[#E0891E] transition-colors flex-shrink-0 mt-1 sm:mt-0.5"
                                />
                            </div>
                            <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                {blogPosts[0].description}
                            </p>
                        </div>
                    </div>

                    {/* Side Posts */}
                    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {blogPosts.slice(1).map((post) => (
                            <div
                                key={post.id}
                                className="bg-white overflow-hidden cursor-pointer group flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5"
                                onClick={() => navigate(`/insights/blog/${post.id}`)}
                            >
                                <div className="w-full sm:w-[40%] md:w-[45%] lg:w-[40%] relative h-[180px] sm:h-[150px] md:h-[180px] lg:h-[200px] overflow-hidden rounded-lg sm:rounded-xl flex-shrink-0">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="text-xs sm:text-sm text-[#AE6A19] mb-1.5 sm:mb-2">
                                        {post.date}
                                    </p>
                                    <h3 className="text-base sm:text-lg font-semibold text-[#181D27] mb-1.5 sm:mb-2 leading-tight group-hover:text-[#E0891E] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-[#535862] leading-relaxed line-clamp-2 sm:line-clamp-3">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='px-4 sm:px-6 lg:px-10 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20'>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <div className='text-base sm:text-lg md:text-xl font-semibold text-[#181D27] border-b-2 sm:border-b-4 border-[#F89822] py-1 pr-2 sm:pr-4 w-fit'>
                        All Blogposts
                    </div>
                    <ActionButton
                        buttonText={
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <CgSortAz size={18} className="sm:w-[20px] sm:h-[20px]" />
                                <span className="text-sm sm:text-base">Filters</span>
                            </div>
                        }
                        outline
                        width="fit"
                        paddingX='px-3 sm:px-4'
                        textSize="text-sm sm:text-base"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {newsArticles.map((article) => (
                        <ProjectCard2
                            key={article.id}
                            id={article.id}
                            image={article.image}
                            region={article.region}
                            title={article.title}
                            description={article.description}
                            author={article.author}
                            date={article.date}
                            isPaid={article.isPaid}
                            linkPath={`/insights/${article.id}`}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PublicBlog;

