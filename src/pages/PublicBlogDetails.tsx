import { useParams } from 'react-router-dom';

const PublicBlogDetails = () => {
    const { id } = useParams<{ id: string }>();

    const blogPost = {
        id: id || '1',
        title: 'Digital Construction in Africa: Building Smarter, Faster, and More Sustainably',
        subtitle: 'While sectors like finance and manufacturing have gone digital, construction still leans heavily on manual methods and traditional systems.',
        publishedDate: '19 Jan 2025',
        heroImage: 'https://plus.unsplash.com/premium_photo-1673795754005-214e3e1fccba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: `
            <h2>Introduction</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <blockquote>In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.</blockquote>
        `,
        imageCaption: 'Image courtesy of Fauxels via Pexels',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0'
    };

    return (
        <div className="min-h-screen bg-white">
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className=''>
                    <div className="mb-8 text-center max-w-4xl mx-auto">
                        <p className='mb-3 text-[#AE6A19] font-semibold'>Published {blogPost.publishedDate}</p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">{blogPost.title}</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                            {blogPost.subtitle}
                        </p>
                    </div>
                    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden mb-8">
                        <img
                            src={blogPost.heroImage}
                            alt={blogPost.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>


                <div className="max-w-3xl mx-auto">
                    <article className="max-w-none">
                        <div
                            className="text-base text-[#535862] leading-relaxed font-bitter prose prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:text-[#535862] [&>blockquote]:border-l-2 [&>blockquote]:border-[#AE6A19] [&>blockquote]:font-bitter [&>blockquote]:pl-6 [&>blockquote]:pr-4 [&>blockquote]:py-2 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-lg [&>blockquote]:text-[#181D27] [&>blockquote]:bg-transparent"
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                        />

                        <div className="my-8">
                            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-3">
                                <img
                                    src={blogPost.imageUrl}
                                    alt="Business meeting"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-sm text-[#717680] italic">
                                {blogPost.imageCaption.split('via ')[0]}
                                <a
                                    href="https://www.pexels.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E0891E] hover:underline ml-1"
                                >
                                    via Pexels
                                </a>
                            </p>
                        </div>

                        <div
                            className="text-base text-[#535862] leading-relaxed [&>p]:mb-4"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                    <p>Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
                                `
                            }}
                        />
                    </article>
                </div>
            </section>
        </div>
    );
};

export default PublicBlogDetails;

