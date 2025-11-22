import { FiUser, FiAlertCircle, FiFilePlus } from 'react-icons/fi'
import ActionButton from '../components/ActionButton'
import { useMemo } from 'react';
import type { IconType } from 'react-icons';

interface FeatureCard {
    icon: IconType;
    title: string;
    description: string;
}

const PublicTenders = () => {
    const featureCards: FeatureCard[] = useMemo(() => [
        {
            icon: FiFilePlus,
            title: 'Identify new tender leads',
            description: 'Gain real-time information about new tenders as soon as they drop.'
        },
        {
            icon: FiAlertCircle,
            title: 'Find leading bidders',
            description: 'Connect with all leading bidders for every construction project.'
        },
        {
            icon: FiUser,
            title: 'Access key contact details',
            description: 'Access verified contact information for all decision makers in the construction industry.'
        }
    ], []);


    return (
        <div className="min-h-screen bg-white">
            <section>
                <div className="py-8 sm:py-10 max-md:pt-14 md:py-16 lg:py-20 mx-auto text-center px-4 sm:px-6 lg:px-10 xl:px-20">
                    <div className='mb-14 sm:mb-16 md:mb-20'>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">Get More Value From A Subscription</h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed max-w-2xl mx-auto px-2">
                            Gain real-time exclusive information on all projects and tenders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 sm:gap-8 mb-6 sm:mb-8 mx-auto">
                        {featureCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="bg-[#FAFAFA] rounded-lg p-5 sm:p-6 pt-12 sm:pt-14 relative"
                                >
                                    <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2">
                                        <Icon size={48} className="sm:w-16 sm:h-16" color='#181D27' strokeWidth={1.2} />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-[#181D27] mb-2 text-center">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#535862] leading-relaxed text-center">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className='flex justify-center'>
                        <ActionButton buttonText="Book a Demo" link="/book-a-demo" width="fit" paddingX="px-6 sm:px-8 md:px-10" />
                    </div>
                </div>
            </section>

            <section className=''>
                <section className='py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FAFAFA]'>
                    <div className="mb-4 sm:mb-5 text-center">
                        <p className='mb-2 sm:mb-3 text-sm sm:text-base text-[#414651] uppercase tracking-wide'>Tenders</p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">Find Construction Tenders Across Africa</h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto px-2">
                            Access thousands of opportunities with detailed project information, key contacts, and real-time updates. Used by leading firms to grow their business.
                        </p>
                    </div>
                    <img src="/images/tender-01.svg" alt="Tenders Hero" className="w-full h-auto object-cover" />
                </section>

                {/* Powering Construction Intelligence Section */}
                <section className="pt-8 sm:pt-10 md:pt-16 px-4 sm:px-6 lg:px-10 xl:px-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center items-center mb-4 sm:mb-5 w-12 h-12 sm:w-14 sm:h-14 bg-[#FDF5E8] rounded-full mx-auto">
                            <img src="/icons/zap-fast.svg" alt="zap" className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                            Powering Construction Intelligence
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto px-2">
                            The only platform you need to find and track African construction tenders.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">195k+</div>
                                <div className="text-sm sm:text-base text-[#181D27] font-semibold">Tenders tracked</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">100%</div>
                                <div className="text-sm sm:text-base text-[#181D27] font-semibold">Data accuracy</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">55k+</div>
                                <div className="text-sm sm:text-base text-[#181D27] font-semibold">Active companies</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                    <div style={{
                        boxShadow: '0px 3px 3px -1.5px #0A0D120A, 0px 8px 8px -4px #0A0D1208, 0px 20px 24px -4px #0A0D1214'
                    }} className="max-w-7xl p-6 sm:p-8 md:p-10 lg:p-14 mx-auto rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-[#FAFAFA]">
                        <div className='max-w-xl w-full sm:w-auto'>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-3 sm:mb-4">
                                Make Decisions Earlier
                            </h2>
                            <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                Get real-time insights to make quick decisions and stay ahead in Africa's construction industry.
                            </p>
                        </div>
                        <div className="w-full sm:w-auto flex-shrink-0 flex justify-center sm:justify-start">
                            <ActionButton
                                buttonText="Book a Demo"
                                width="fit"
                                paddingX="px-6 sm:px-8 md:px-10"
                                link="/book-a-demo"
                            />
                        </div>
                    </div>
                </section>
            </section>
        </div >
    )
}

export default PublicTenders

