import { FaRegCircleCheck } from 'react-icons/fa6'
import { FiUsers, FiBriefcase } from 'react-icons/fi'
import { IoBookOutline } from 'react-icons/io5'
import ActionButton from '../components/ActionButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import ProjectCard3 from '../components/ProjectCard3';
import { Carousel } from '../components/Carousel';

const PublicProjects = () => {

    const trendingProjects = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "West Africa",
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest. The Egyptian Environmental Affairs Agenc...",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "East Africa",
            title: "Kenya Infrastructure Development Project",
            description: "Major infrastructure development initiative across multiple regions in Kenya including roads, bridges, and public facilities...",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "South Africa",
            title: "Cape Town Smart City Initiative",
            description: "Comprehensive smart city development project focusing on sustainable urban planning and digital infrastructure...",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "Central Africa",
            title: "Renewable Energy Grid Expansion",
            description: "Large-scale renewable energy infrastructure project to expand the national grid across multiple provinces...",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "North Africa",
            title: "Port Modernization Program",
            description: "Comprehensive modernization of major port facilities including container terminals and logistics infrastructure...",
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <section>
                <div className="py-10 max-md:pt-20 md:py-16 lg:py-20 max-w-5xl mx-auto text-center px-5 sm:px-10 lg:px-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Construction intelligence for smarter decisions</h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                        Your one-stop-shop for information and actionable intelligence on the construction and infrastructure pipeline in African countries
                    </p>
                    <div className='flex justify-center'>
                        <ActionButton buttonText="Subscribe to Projects" width="fit" paddingX="px-6" />
                    </div>
                </div>
            </section>

            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center pb-10 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10 xl:px-20'>
                <div className='flex-1 order-2 lg:order-1'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <FiBriefcase size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">Pipeline Platform tracking construction and infrastructure project opportunities across Africa</h2>
                        <p className="text-base sm:text-lg text-[#535862] leading-relaxed text-center lg:text-left">
                            Get real-time updates on construction projects in Africa.
                        </p>

                        <ul className='mt-6 sm:mt-8 space-y-4 sm:space-y-6'>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Identify new project leads</p>
                            </li>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Find key companies</p>
                            </li>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Access key contact details</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex-1 order-1 lg:order-2'>
                    <img className='w-full object-cover' src="/images/public-project-01.svg" alt="" />
                </div>
            </section>

            {/* Trending Projects Section */}
            <section className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base font-bold text-[#414651] mb-4 uppercase tracking-wide">
                            RECENTLY UPDATED PROJECTS
                        </h2>
                        <h3 className="text-3xl text-[#414651] font-bitter">
                            Get Insights and Updates on Projects Across Africa
                        </h3>
                    </div>

                    <div className="relative">
                        <Carousel>
                            {trendingProjects.map((project) => (
                                <ProjectCard3 project={{
                                    image: project.image,
                                    id: project.id.toString(),
                                    title: project.title,
                                    description: project.description,
                                    location: project.location,
                                }} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20'>
                <div className='flex-1 order-1 lg:order-1'>
                    <img className='w-full object-cover' src="/images/public-project-02.svg" alt="" />
                </div>
                <div className='flex-1 order-2 lg:order-2'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <FiUsers size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">Access to contact details of developers, contractors, and consultants on construction projects in Africa.</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed text-center lg:text-left">
                            Connect with key companies and people involved in construction & infrastructure projects in Africa,
                        </p>
                    </div>
                </div>
            </section>

            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center pb-10 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10 xl:px-20'>
                <div className='flex-1 lg:pr-0 order-2 lg:order-1'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <IoBookOutline size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">News, analysis and commentary to keep up-to-date with the construction landscape in Africa</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed text-center lg:text-left">
                            News updates and feature stories related to construction, infrastructure and the built environment in African countries
                        </p>
                    </div>
                </div>
                <div className='flex-1 order-1 lg:order-2'>
                    <img className='w-full object-cover' src="/images/public-project-03.svg" alt="" />
                </div>
            </section>
        </div>
    )
}

export default PublicProjects