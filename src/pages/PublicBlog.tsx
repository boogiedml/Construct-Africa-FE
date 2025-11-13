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
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-5xl mx-auto text-center">
                    <p className='mb-3 text-[#AE6A19] font-semibold'>Our blog</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Other insights and updates</h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                        Subscribe to news or projects to get access to companies, contacts, live updates on projects, tenders and other premium benefits.
                    </p>
                    <div className='max-w-md mx-auto'>
                        <ActionButton
                            buttonText="Request upgrade"
                            width="full"
                            paddingX="px-8"
                            backgroundColor='#E0891E'
                        />
                    </div>
                </div>
            </section>

            {/* Recent Blog Posts Section */}
            <section className="px-4 sm:px-6 lg:px-10 xl:px-20">
                <h2 className="text-base sm:text-xl md:text-2xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 mb:mb-8">
                    Recent blog posts
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div
                        className="bg-white overflow-hidden cursor-pointer group"
                        onClick={() => navigate(`/insights/blog/${blogPosts[0].id}`)}
                    >
                        <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl">
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="pt-6">
                            <p className="text-sm text-[#AE6A19] mb-3">
                                {blogPosts[0].date}
                            </p>
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h3 className="text-xl font-semibold text-[#181D27] leading-tight group-hover:text-[#E0891E] transition-colors">
                                    {blogPosts[0].title}
                                </h3>
                                <FiArrowUpRight
                                    size={20}
                                    className="text-[#535862] group-hover:text-[#E0891E] transition-colors flex-shrink-0 mt-1"
                                />
                            </div>
                            <p className="text-base text-[#535862] leading-relaxed">
                                {blogPosts[0].description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:gap-8">
                        {blogPosts.slice(1).map((post) => (
                            <div
                                key={post.id}
                                className="bg-white overflow-hidden cursor-pointer group flex gap-5"
                                onClick={() => navigate(`/insights/blog/${post.id}`)}
                            >
                                <div className="flex-1 relative h-[220px] overflow-hidden rounded-xl">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-[#AE6A19] mb-2">
                                        {post.date}
                                    </p>
                                    <h3 className="text-lg font-semibold text-[#181D27] mb-2 leading-tight group-hover:text-[#E0891E] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-[#535862] leading-relaxed line-clamp-2">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='px-5 sm:px-10 lg:px-20 py-10 md:py-16 lg:py-20'>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
                    <div className='text-lg font-semibold text-[#181D27] border-b-4 border-[#F89822] py-1 pr-4 w-fit'>All News</div>
                    <ActionButton
                        buttonText={
                            <div className="flex items-center gap-2">
                                <CgSortAz size={22} />
                                Filters
                            </div>
                        }
                        outline
                        width="fit"
                        link='/filters'
                        paddingX='px-4'
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
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

