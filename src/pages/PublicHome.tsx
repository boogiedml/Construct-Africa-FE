import { ActionButton, ExpertCard, Input, Select } from "../components";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { HiLockClosed } from 'react-icons/hi2';
import { HiArrowUpRight } from 'react-icons/hi2';
import { useState } from 'react';
import { featuredOpinions, teamMembers } from "../data/home.data";
import TeamMemberCard from "../components/TeamMemberCard";


const PublicHome = () => {
    const [expandedFeature, setExpandedFeature] = useState('confidence');

    const brandLogos = [
        { id: 1, name: "Apache Camel", logo: "/logos/apache-camel.svg" },
        { id: 2, name: "Appium", logo: "/logos/appium.svg" },
        { id: 3, name: "Balena", logo: "/logos/balena.svg" },
        { id: 4, name: "BigPanda", logo: "/logos/bigpanda.svg" },
        { id: 5, name: "Browserify", logo: "/logos/browserify.svg" },
        { id: 6, name: "Buy Me a Coffee", logo: "/logos/buymeacoffee.svg" }
    ];

    const features = [
        {
            id: 'simple',
            title: 'Make Complex Simple',
            description: 'Transform complex project data into clear, actionable insights that drive better decisions.'
        },
        {
            id: 'confidence',
            title: 'Act With Confidence',
            description: 'Every project is verified by local researchers, giving you trusted, decision-ready intelligence you can rely on.'
        },
        {
            id: 'win',
            title: 'Win Projects',
            description: 'Get early access to opportunities and competitive intelligence to secure more contracts.'
        },
        {
            id: 'ahead',
            title: 'Stay Ahead',
            description: 'Monitor market trends and emerging opportunities before your competitors even know they exist.'
        }
    ];

    const trendingProjects = [
        {
            id: 1,
            image: "/images/projects/project1.jpg",
            location: "West Africa",
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest. The Egyptian Environmental Affairs Agenc...",
            author: "Phoenix Baker",
            date: "19 Jan 2025"
        },
        {
            id: 2,
            image: "/images/projects/project2.jpg",
            location: "East Africa",
            title: "Kenya Infrastructure Development Project",
            description: "Major infrastructure development initiative across multiple regions in Kenya including roads, bridges, and public facilities...",
            author: "Sarah Johnson",
            date: "18 Jan 2025"
        },
        {
            id: 3,
            image: "/images/projects/project3.jpg",
            location: "South Africa",
            title: "Cape Town Smart City Initiative",
            description: "Comprehensive smart city development project focusing on sustainable urban planning and digital infrastructure...",
            author: "Michael Chen",
            date: "17 Jan 2025"
        },
        {
            id: 4,
            image: "/images/projects/project4.jpg",
            location: "Central Africa",
            title: "Renewable Energy Grid Expansion",
            description: "Large-scale renewable energy infrastructure project to expand the national grid across multiple provinces...",
            author: "Aisha Okafor",
            date: "16 Jan 2025"
        },
        {
            id: 5,
            image: "/images/projects/project5.jpg",
            location: "North Africa",
            title: "Port Modernization Program",
            description: "Comprehensive modernization of major port facilities including container terminals and logistics infrastructure...",
            author: "David Rodriguez",
            date: "15 Jan 2025"
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative min-h-[95vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1760442936485-b26b087c2030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072')",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto absolute bottom-20">
                    <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bitter font-semibold mb-3 leading-tight">
                        Trusted Intelligence For Construction In Africa
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-lg text-[#FDFDFD] max-w-2xl mx-auto">
                        Track projects, discover opportunities, and make smarter decisions.
                    </p>
                </div>
            </section>

            {/* Trusted by Section */}
            <section className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-lg text-[#414651] mb-2">
                        Trusted by over <span className="font-semibold">1,000</span> of the world's leading contractors, consultants, and investors
                    </h2>
                </div>

                <div className="relative">
                    <Marquee
                        play={true}
                        pauseOnHover={true}
                        pauseOnClick={true}
                        // speed={50}
                        gradient={false}
                        autoFill={true}
                    >
                        {brandLogos.map((brand) => (
                            <div key={brand.id} className="flex items-center justify-center mx-16">
                                <img src={brand.logo} alt={brand.name} className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* Trending Projects Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base font-bold text-[#414651] mb-4 uppercase tracking-wide">
                            Trending Projects
                        </h2>
                        <h3 className="text-3xl text-[#414651] font-bitter">
                            Projects Across Africa At Your Fingertips
                        </h3>
                    </div>

                    <div className="relative">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            centeredSlides={false}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2.5,
                                },
                                1024: {
                                    slidesPerView: 2.7,
                                },
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            className="trending-projects-swiper"
                        >
                            {trendingProjects.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                                        {/* Project Image */}
                                        <div className="relative">
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400 text-sm">Project Image</span>
                                            </div>

                                            {/* Paid Tag */}
                                            <div className="absolute top-3 left-3 bg-[#D4A574] text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                                                <HiLockClosed size={12} />
                                                Paid
                                            </div>
                                        </div>

                                        {/* Project Content */}
                                        <div className="p-6 relative">
                                            <p className="text-sm text-[#F89822] font-semibold mb-2">{project.location}</p>
                                            <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                                {project.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* Author and Date */}
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                                                    <span className="text-xs">👤</span>
                                                </div>
                                                <span>{project.author}</span>
                                                <span>•</span>
                                                <span>{project.date}</span>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="absolute top-6 right-6 text-gray-400 hover:text-[#F89822] cursor-pointer">
                                                <HiArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <button className="swiper-button-prev-custom absolute left-[-20px] top-[96px] z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowBack size={20} className="text-gray-600" />
                        </button>
                        <button className="swiper-button-next-custom absolute right-[-20px] top-[96px] z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowForward size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-5 sm:px-10 lg:px-20">
                <div className="flex flex-col items-stretch lg:flex-row gap-20">
                    <div className="flex-1">
                        <p className="text-base text-[#414651] uppercase tracking-wide mb-4">
                            BUILT FOR RESULTS. POWERED BY INSIGHTS.
                        </p>
                        <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-6 leading-tight">
                            Uncover Real Opportunities, Win Businesses
                        </h2>
                        <p className="text-lg text-[#414651] mb-8 leading-relaxed">
                            We deliver trusted, on-the-ground project intelligence, giving you clarity to act fast, plan smarter, and lead in Africa's evolving construction markets.
                        </p>

                        <div className="space-y-0">
                            {features.map((feature) => (
                                <div key={feature.id} className="border-b-2 border-[#D5D7DA] mb-3">
                                    <button
                                        onClick={() => setExpandedFeature(expandedFeature === feature.id ? "" : feature.id)}
                                        className="w-full text-left py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <h3 className={`text-[20px] font-semibold ${expandedFeature === feature.id ? "text-[#181D27]" : "text-[#A4A7AE]"}`}>
                                            {feature.title}
                                        </h3>
                                    </button>

                                    {expandedFeature === feature.id && (
                                        <div className="pb-4">
                                            <p className="text-[#414651] text-base leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-[#535862] rounded-4xl p-10 h-full">
                            {/* Top Bar */}
                            <div className="flex items-center gap-6 justify-center mb-4">
                                <div className="bg-white text-[#181D27] px-3 py-1 rounded-full text-sm font-medium">
                                    Email inbox
                                </div>
                                <span className="text-white text-base">Email notifications for all projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl p-14 bg-[#414651] mx-auto rounded-2xl">
                    <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-white mb-6">
                        Make Smarter Decisions
                    </h2>
                    <p className="text-[20px] text-white mb-8 leading-relaxed">
                        Uncover hidden opportunities and automate complex tasks with AI that works as hard as you do. Just ask.
                    </p>
                    <ActionButton
                        buttonText="Request demo"
                        width="fit"
                        textColor="#181D27"
                        backgroundColor="#ffffff"
                        textSize="text-base"
                        paddingX="px-8"
                    />
                </div>
            </section>

            <section className="py-20 px-5 sm:px-10 lg:px-20 bg-[#FEFBF8]">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Expert Opinions</h2>
                    <p className="text-lg text-[#535862] mb-6 leading-relaxed">
                        Hear from experts across different industries
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-4 mt-5 lg:mt-10">
                    {featuredOpinions.map((expert, index) => (
                        <ExpertCard
                            key={expert.id || index}
                            expertImage={expert.image}
                            expertName={expert.name}
                            title={expert.title}
                            opinion={expert.opinion}
                        />
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl p-14 bg-[#414651] mx-auto rounded-2xl">
                    <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-white mb-6">
                        Get listed
                    </h2>
                    <p className="text-[20px] text-white mb-8 leading-relaxed">
                        Get a competitive edge with Construct Africa. Join thousands of companies making data-driven decisions.
                    </p>
                    <ActionButton
                        buttonText="Request demo"
                        width="fit"
                        textColor="#181D27"
                        backgroundColor="#ffffff"
                        textSize="text-base"
                        paddingX="px-8"
                    />
                </div>
            </section>

            <section className="py-20 px-5 sm:px-10 lg:px-20 bg-[#FEFBF8]">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Meet Our Advisory Board</h2>
                    <p className="text-lg text-[#535862] mb-6 leading-relaxed">
                        Our philosophy is simple—hire a team of diverse, passionate people and foster a culture that empowers you to do you best work.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-6 mt-5 lg:mt-10">
                    {teamMembers.map((member, index: number) => (
                        <TeamMemberCard
                            key={index}
                            member={member}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <ActionButton
                        buttonText="View all members"
                        width="fit"
                        textColor="#414651"
                        backgroundColor="#ffffff"
                        textSize="text-base"
                        paddingX="px-8"
                        borderColor="#D5D7DA"
                    />
                </div>
            </section >

            <section className="py-20 px-5 sm:px-10 lg:px-20">
                <div className="flex gap-20 items-center">
                    <div className="relative flex-1">
                    </div>

                    <div className="flex-1">
                        <div className="max-w-lg">

                            <div className="mb-12 max-w-3xl mx-auto">
                                <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Let's ConstructAfrica Together</h2>
                                <p className="text-lg text-[#535862] mb-6 leading-relaxed">
                                    The trusted intelligence for construction in Africa.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="First name" attributes={{
                                        type: "text",
                                        placeholder: "First name",
                                    }} />

                                    <Input label="Last name" attributes={{
                                        type: "text",
                                        placeholder: "Last name",
                                    }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="Company" attributes={{
                                        type: "text",
                                        placeholder: "Company name",
                                    }} />

                                    <Input label="Job title" attributes={{
                                        type: "text",
                                        placeholder: "Role in company",
                                    }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select options={[
                                        { value: "NG", label: "Nigeria" },
                                        { value: "ZA", label: "South Africa" },
                                        { value: "KE", label: "Kenya" },
                                        { value: "GH", label: "Ghana" },
                                        { value: "EG", label: "Egypt" },
                                    ]}
                                        label="Country"
                                    />

                                    <Input label="Phone number" attributes={{
                                        type: "tel",
                                        placeholder: "+1 (555) 000-0000",
                                    }} />
                                </div>

                                <Input label="Work email"
                                    attributes={{
                                        type: "email",
                                        placeholder: "you@company.com",
                                    }} />

                                {/* Submit Button */}
                                <ActionButton
                                    buttonText="Request a demo"
                                    backgroundColor="#E0891E"
                                    textSize="text-base"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default PublicHome;
