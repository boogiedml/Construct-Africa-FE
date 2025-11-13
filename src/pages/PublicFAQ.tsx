import { useState, useMemo } from 'react';
import { FiSearch, FiHeart, FiFileText, FiCreditCard, FiMail } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';
import type { IconType } from 'react-icons';
import { GoArrowSwitch, GoCircleSlash } from 'react-icons/go';

interface FAQItem {
    icon: IconType;
    question: string;
    answer: string | string[];
}

const PublicFAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqItems: FAQItem[] = useMemo(() => [
        {
            icon: FiHeart,
            question: 'What is ConstructAfrica about?',
            answer: 'If you are considering investing in the rapidly developing Sub-Saharan Africa construction market but do not know where to start, then ConstructAfrica is the right place for you. At ConstructAfrica, you will find detailed reports containing the latest information on the construction markets in Sub-Saharan Africa. ConstructAfrica reports are created by specialists in the field with up to date, on-the-ground information which saves weeks or even months of your time while equipping you with all the information you need.'
        },
        {
            icon: GoArrowSwitch,
            question: 'Why would I invest in the construction industry in Sub-Saharan Africa?',
            answer: 'Astute investors know for sure that investing in developing industries and emerging markets is a smart move. The African construction market is expected to grow by 7.5% annually from 2022 to 2027. As the construction market in Sub-Saharan Africa is growing by leaps and bounds, this is an opportune time for you to invest in this industry. Both state and private institutions are working on numerous construction projects across Africa that are considered to be promising investment opportunities, especially for foreign businesses with the relevant expertise.'
        },
        {
            icon: GoCircleSlash,
            question: 'What benefits will your construction reports bring me?',
            answer: [
                'Construction industry reports from ConstructAfrica provide exceptional value and will give you numerous advantages over your competitors, amongst which are:',
                'Saving time - Our reports contain ready-to-use information so that you do not need to conduct any research on your own.',
                'Gaining insights: ConstructAfrica reports are created by experienced specialists who have been working on Sub-Saharan Africa\'s construction market for long years.',
                'Credible Information: We would never use a source if it is not reliable enough. Our research team conduct primary and secondary research to provide up to date information, and we rely on credible sources such as World Bank statistics; African Development Bank statistics; IMF statistics; UN statistics; Country national account data and statistics; government ministries; officially released company results and figures; trade bodies and associations, and international and national news agencies. We also validate our data through a variety of ways including site visits (where relevant), phone calls and other third-party services such as chambers of commerce.'
            ]
        },
        {
            icon: FiFileText,
            question: 'Can other info be added to an invoice?',
            answer: 'At the moment, the only way to add additional information to invoices is to add the information to the workspace\'s name.'
        },
        {
            icon: FiCreditCard,
            question: 'How does billing work?',
            answer: 'Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.'
        },
        {
            icon: FiMail,
            question: 'How do I change my account email?',
            answer: 'You can change the email address associated with your account by going to untitledui.com/account from a laptop or desktop.'
        }
    ], []);

    const filteredFAQs = useMemo(() => {
        if (!searchQuery.trim()) return faqItems;

        const query = searchQuery.toLowerCase();
        return faqItems.filter(item => {
            const questionMatch = item.question.toLowerCase().includes(query);
            const answerMatch = Array.isArray(item.answer)
                ? item.answer.some(a => a.toLowerCase().includes(query))
                : item.answer.toLowerCase().includes(query);
            return questionMatch || answerMatch;
        });
    }, [faqItems, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        FAQs
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        Ask us anything
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Need something cleared up? Here are our most frequently asked questions.
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

            {/* FAQ Items Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
                        {filteredFAQs.map((faq, index) => {
                            const Icon = faq.icon;
                            return (
                                <div
                                    key={index}
                                    className="w-full"
                                >
                                    <div className="flex flex-col sm:flex-row lg:flex-col sm:items-start gap-4">
                                        <div className="flex-shrink-0 bg-white w-[48px] h-[48px] rounded-lg border border-[#D5D7DA] flex justify-center items-center">
                                            <Icon size={20} className="text-[#414651]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-[#181D27] mb-3 leading-tight">
                                                {faq.question}
                                            </h3>
                                            {Array.isArray(faq.answer) ? (
                                                <div className="text-sm sm:text-base text-[#535862] leading-relaxed space-y-3">
                                                    {faq.answer.map((paragraph, pIndex) => (
                                                        <p key={pIndex}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-base sm:text-lg text-[#535862]">
                                No FAQs found matching your search.
                            </p>
                        </div>
                    )}

                    {/* Still have questions CTA */}
                    <div className="bg-white rounded-lg py-6 sm:py-8 px-4 sm:px-6 mt-8 sm:mt-10 md:mt-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                            <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Still have questions?
                                </h2>
                                <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                    Can't find the answer you're looking for? Please chat to our friendly team.
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-auto">
                                <ActionButton
                                    buttonText="Get in touch"
                                    width="full"
                                    paddingX="px-6 sm:px-8"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Stay Ahead with Insights on LinkedIn</h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                        Get the latest project updates, trends, and expert analysis delivered directly through our LinkedIn Newsletter.
                    </p>
                    <div className='max-w-md mx-auto'>
                        <ActionButton
                            buttonText="Subscribe now"
                            width="full"
                            paddingX="px-8"
                            backgroundColor='#E0891E'
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicFAQ;

