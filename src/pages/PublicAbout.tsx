import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';

const PublicAbout = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const aboutContent = useMemo(() => `
        <h2>Who we are</h2>
        <p>ConstructAfrica is the leading provider of news, analysis, industry reports, data and project intelligence relating to construction, infrastructure and the built environment in Africa. Our products and solutions provide decision-makers, investors and construction industry stakeholders with clear insights into African construction markets, enabling them to identify business opportunities and make informed opinions about the future of the industry and trends.</p>

        <h2>Project Pipeline</h2>
        <p>Our unique solutions include a project pipeline platform with a database of capital projects and companies operating in construction sectors across Africa. Through strategic partnerships and proprietary methods we track the activity on those projects through to completion, providing our customers with access to project opportunities, key information about who's involved and project data.</p>

        <h2>myConstructAfrica</h2>
        <p>Similarly, our myConstructAfrica intelligence platform is a one-stop-shop for monitoring the Africa construction landscape.</p>

        <h2>Events</h2>
        <p>ConstructAfrica runs a programme of online events including webinars, roundtables, conferences and more, where we bring contractors, consultants, suppliers and clients together to share knowledge, case studies, best practice and other industry insights.</p>
    `, []);

    const filteredContent = useMemo(() => {
        if (!searchQuery.trim()) return aboutContent;
        
        const query = searchQuery.toLowerCase();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = aboutContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        
        if (text.toLowerCase().includes(query)) {
            return aboutContent;
        }
        return '';
    }, [aboutContent, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        About Us
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        About ConstructAfrica
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Learn more about who we are and what we do at ConstructAfrica.
                    </p>

                    {/* Search Bar */}
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

            {/* About Content Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    {filteredContent ? (
                        <div 
                            className="prose prose-lg max-w-none text-base text-[#535862] leading-relaxed [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862] [&>a]:text-[#E0891E] [&>a]:underline [&>a]:hover:no-underline"
                            dangerouslySetInnerHTML={{ __html: filteredContent }}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-base sm:text-lg text-[#535862]">
                                No content found matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                        Make Smarter Decisions Today
                    </h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Uncover hidden opportunities and automate complex tasks with AI that works as hard as you do. Just ask.
                    </p>
                    <div className="max-w-md mx-auto">
                        <ActionButton
                            buttonText="Request Demo"
                            width="full"
                            paddingX="px-8"
                            backgroundColor="#E0891E"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicAbout;

