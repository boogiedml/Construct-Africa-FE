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
                <div className="py-10 max-md:pt-20 md:py-16 lg:py-20 mx-auto text-center px-5 sm:px-10 lg:px-20">
                    <div className='mb-20'>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Get More Value From A Subscription</h2>
                        <p className="text-base sm:text-lg text-[#535862] leading-relaxed max-w-2xl mx-auto">
                            Gain real-time exclusive information on all projects and tenders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mx-auto">
                        {featureCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="bg-[#FAFAFA] rounded-lg p-6 pt-14 relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                        <Icon size={64} color='#181D27' strokeWidth={1.2} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#181D27] mb-2 text-center">
                                        {card.title}
                                    </h3>
                                    <p className="text-base text-[#535862] leading-relaxed text-center">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className='flex justify-center'>
                        <ActionButton buttonText="Subscribe to Tenders" width="fit" paddingX="px-6" />
                    </div>
                </div>
            </section>

            <section className=''>
                <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FAFAFA]'>
                    <div className="mb-5 text-center">
                        <p className='mb-3 text-[#AE6A19] font-semibold'>Tenders</p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Find Construction Tenders Across Africa</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                            Access thousands of opportunities with detailed project information, key contacts, and real-time updates. Used by leading firms to grow their business.
                        </p>
                    </div>
                    <img src="/images/tender-01.svg" alt="Tenders Hero" className="w-full h-full object-cover" />
                </section>

                {/* Powering Construction Intelligence Section */}
                <section className="pt-10 md:pt-16 px-4 sm:px-6 lg:px-10 xl:px-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center items-center mb-5 w-[56px] h-[56px] bg-[#FDF5E8] rounded-full mx-auto">
                            <img src="/icons/zap-fast.svg" alt="zap" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                            Powering Construction Intelligence
                        </h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-12 leading-relaxed max-w-2xl mx-auto">
                            The only platform you need to find and track African construction tenders.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <div>
                                <div className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">195k+</div>
                                <div className="text-base text-[#181D27] font-semibold">Tenders tracked</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">100%</div>
                                <div className="text-base text-[#181D27] font-semibold">Data accuracy</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#E0891E] font-bitter mb-2">55k+</div>
                                <div className="text-base text-[#181D27] font-semibold">Active companies</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div style={{
                        boxShadow: '0px 3px 3px -1.5px #0A0D120A, 0px 8px 8px -4px #0A0D1208, 0px 20px 24px -4px #0A0D1214'
                    }} className="max-w-7xl p-14 mx-auto rounded-2xl flex items-center justify-between bg-[#FAFAFA]">
                        <div>
                            <h2 className="text-3xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-4">
                                Make Decisions Earlier
                            </h2>
                            <p className="text-base text-[#535862] leading-relaxed">
                                Get real-time insights to make quick decisions and stay ahead in Africa's construction industry.
                            </p>
                        </div>
                        <ActionButton
                            buttonText="Request a Demo"
                            width="fit"
                            textSize="text-base"
                            paddingX="px-4"
                            backgroundColor='#E0891E'
                        />
                    </div>
                </section>
            </section>
        </div>
    )
}

export default PublicTenders

