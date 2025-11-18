import { ActionButton, ExpertCard, Input, ProjectCard3, Select } from "../components";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useState, useEffect, useMemo } from 'react';
import { featuredOpinions, teamMembers } from "../data/home.data";
import TeamMemberCard from "../components/TeamMemberCard";
import { useLocation } from 'react-router-dom';
import { useGetTrendingProjectsQuery } from "../store/services/projects";
import { useGetExpertsQuery } from "../store/services/expert";


const PublicHome = () => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [displayedImage, setDisplayedImage] = useState('/images/benefit-01.svg');

    const {data: trendingProjectsData, isLoading: isTrendingProjectsLoading} = useGetTrendingProjectsQuery();

    const {data: expertOpinionsData, isLoading: isExpertOpinionsLoading} = useGetExpertsQuery({
        limit: 3,
    });


    // Handle hash navigation to expert opinions section
    useEffect(() => {
        if (location.hash === '#expert-opinions') {
            // Wait for page to fully render before scrolling
            const scrollToSection = () => {
                const element = document.getElementById('expert-opinions');
                if (element) {
                    const offset = 100; // Account for fixed navbar
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            };

            // Try immediately, then with delays to ensure DOM is ready
            scrollToSection();
            setTimeout(scrollToSection, 100);
            setTimeout(scrollToSection, 300);
        }
    }, [location.hash, location.pathname]);

    const brandLogos = [
        { id: 1, name: "Aksa", logo: "/logos/aksa.svg" },
        { id: 2, name: "Yb", logo: "/logos/yb.svg" },
        { id: 3, name: "House Matic", logo: "/logos/house-matic.svg" },
        { id: 4, name: "EH", logo: "/logos/eh.svg" },
    ];

    const features = useMemo(() => [
        {
            id: 'simple',
            title: 'Make Complex Simple',
            description: 'Transform complex project data into clear, actionable insights that drive better decisions.',
            image: '/images/benefit-01.svg',
            headerBadge: 'Easy Search',
            headerText: 'Stramline searches with filters'
        },
        {
            id: 'confidence',
            title: 'Act With Confidence',
            description: 'Every project is verified by local researchers, giving you trusted, decision-ready intelligence you can rely on.',
            image: '/images/benefit-02.svg',
            headerBadge: 'Verified',
            headerText: 'Capable researchers with years of experience'
        },
        {
            id: 'win',
            title: 'Win Projects',
            description: 'Gain early access to project opportunities across Africa, so you can position first, engage early, and win deals.',
            image: '/images/benefit-03.svg',
            headerBadge: 'Email Inbox',
            headerText: 'Email notifications for all projects'
        },
        {
            id: 'ahead',
            title: 'Stay Ahead',
            description: 'Monitor market trends and emerging opportunities before your competitors even know they exist.',
            image: '/images/benefit-04.svg',
            headerBadge: 'Updates',
            headerText: 'Live updates on every followed projects'
        }
    ], []);

    useEffect(() => {
        if (features[0]?.image) {
            setDisplayedImage(features[0].image);
        }
    }, [features]);

    useEffect(() => {
        const currentImage = features[activeFeatureIndex]?.image || '/images/benefit-01.svg';

        setImageOpacity(0);

        const fadeTimeout = setTimeout(() => {
            setDisplayedImage(currentImage);
            setImageOpacity(1);
        }, 200);

        return () => clearTimeout(fadeTimeout);
    }, [activeFeatureIndex, features]);

    useEffect(() => {
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + (100 / (4000 / 50));
            });
        }, 50);

        const featureInterval = setInterval(() => {
            setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
            setProgress(0);
        }, 4000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(featureInterval);
        };
    }, [activeFeatureIndex, features.length]);

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
        <div>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/hero-vid.mp4" type="video/mp4" />
                    <img
                        src="/images/hero-vid-img.svg"
                        alt="Construction in Africa"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </video>

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
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base font-bold text-[#414651] mb-4 uppercase tracking-wide">
                            Trending Projects
                        </h2>
                        <h3 className="text-3xl text-[#414651] font-bitter">
                            Get Insights and Updates on Projects Across Africa
                        </h3>
                    </div>

                    <div className="relative mb-10">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            centeredSlides={false}
                            // breakpoints={{
                            //     640: {
                            //         slidesPerView: 2,
                            //     },
                            //     768: {
                            //         slidesPerView: 2.5,
                            //     },
                            //     1024: {
                            //         slidesPerView: 2.7,
                            //     },
                            // }}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            className="trending-projects-swiper"
                        >
                            {trendingProjectsData?.data.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <ProjectCard3 project={{
                                        image: project.image,
                                        id: project.id.toString(),
                                        title: project.title,
                                        description: project.description,
                                        location: project.location,
                                    }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className="swiper-button-prev-custom absolute left-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowBack size={20} className="text-gray-600" />
                        </button>
                        <button className="swiper-button-next-custom absolute right-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowForward size={20} className="text-gray-600" />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <ActionButton
                            buttonText="Learn More"
                            link="/projects"
                            width="fit"
                            paddingX="px-8"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-5 sm:px-10 lg:px-20">
                <div className="flex flex-col items-start lg:flex-row gap-20">
                    <div className="basis-[40%]">
                        <p className="text-base text-[#414651] uppercase tracking-wide mb-4">
                            BUILT FOR RESULTS. POWERED BY INSIGHTS.
                        </p>
                        <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                            Uncover Real Opportunities, Win Businesses
                        </h2>
                        <p className="text-lg text-[#414651] mb-4.5 leading-relaxed">
                            We deliver trusted, on-the-ground project intelligence, giving you clarity to act fast, plan smarter, and lead in Africa's evolving construction markets.
                        </p>

                        <div className="space-y-0 max-w-md">
                            {features.map((feature, index) => {
                                const isActive = index === activeFeatureIndex;
                                return (
                                    <div
                                        key={feature.id}
                                        className="mb-3 relative"
                                    >
                                        <div className="border-b-2 border-[#D5D7DA]">
                                            <div className="w-full text-left py-4">
                                                <h3 className={`text-[20px] font-semibold transition-colors duration-500 ${isActive ? "text-[#181D27]" : "text-[#A4A7AE]"
                                                    }`}>
                                                    {feature.title}
                                                </h3>
                                            </div>

                                            <div
                                                className={`pb-4 transition-all duration-500 overflow-hidden ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <p className="text-[#414651] text-base leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>

                                        {isActive && (
                                            <div
                                                className="absolute bottom-0 left-0 h-[2px] bg-[#E0891E] transition-all duration-75 ease-linear"
                                                style={{ width: `${progress}%` }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div style={{
                            background: "linear-gradient(45deg, #101828 0%, #535862 100%)",
                        }} className="rounded-4xl pt-10 px-16 h-full flex flex-col">
                            <div className="flex items-center gap-6 justify-center mb-6">
                                <div className="bg-white text-[#181D27] px-3 py-1 rounded-full text-sm font-medium">
                                    {features[activeFeatureIndex]?.headerBadge || 'Email inbox'}
                                </div>
                                <span className="text-white text-base">
                                    {features[activeFeatureIndex]?.headerText || 'Email notifications for all projects'}
                                </span>
                            </div>

                            <div className="flex-1 border-[#a2a6ac] border-6 rounded-t-4xl border-b-0 p-2 pb-0">
                                <img
                                    src={displayedImage}
                                    alt={features[activeFeatureIndex]?.title || 'Email notifications'}
                                    className="w-full h-full object-cover transition-opacity duration-500 rounded-t-3xl"
                                    style={{ opacity: imageOpacity }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl p-14 bg-[url('/images/cta-bg.png')] bg-cover bg-center mx-auto rounded-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="z-10 relative">
                        <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-white mb-4">
                            Make Smarter Decisions
                        </h2>
                        <p className="text-base text-white leading-relaxed">
                            Get real-time insights to make quick decisions and stay ahead in Africa's construction industry.
                        </p>
                    </div>
                    <ActionButton
                        buttonText="Book a Demo"
                        width="fit"
                        textColor="#181D27"
                        backgroundColor="#ffffff"
                        textSize="text-base"
                    />
                </div>
            </section>

            {/* News and Insights Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base font-bold text-[#414651] mb-4 uppercase tracking-wide">
                            NEWS AND INSIGHTS
                        </h2>
                        <h3 className="text-3xl text-[#414651] font-bitter">
                            Keep up-to-date with the Construction Landscape in Africa
                        </h3>
                    </div>

                    <div className="relative mb-10">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            centeredSlides={false}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            className="trending-projects-swiper"
                        >
                            {trendingProjects.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <ProjectCard3 project={{
                                        image: project.image,
                                        id: project.id.toString(),
                                        title: project.title,
                                        description: project.description,
                                        location: project.location,
                                    }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className="swiper-button-prev-custom absolute left-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowBack size={20} className="text-gray-600" />
                        </button>
                        <button className="swiper-button-next-custom absolute right-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                            <IoArrowForward size={20} className="text-gray-600" />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <ActionButton
                            buttonText="View More News"
                            link="/news"
                            width="fit"
                            paddingX="px-8"
                        />
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-7xl p-14 bg-[#FAFAFA] mx-auto rounded-2xl relative overflow-hidden">
                    <h2 className="text-3xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5">
                        Stay Ahead with Insights on LinkedIn
                    </h2>
                    <p className="text-base text-[#535862] mb-8 leading-relaxed max-w-xl">
                        Get the latest project updates, trends, and expert analysis delivered directly through our LinkedIn Newsletter.
                    </p>
                    <ActionButton
                        buttonText="Subscribe Now"
                        width="fit"
                        paddingX="px-3"
                    />
                    <img className="w-[400px] object-cover absolute right-0 bottom-0 rounded-tl-3xl" src="https://plus.unsplash.com/premium_photo-1681989486976-9ec9d2eac57a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900" alt="" />
                </div>
            </section>

            <section id="expert-opinions" className="py-20 px-5 sm:px-10 lg:px-20 bg-[#FEFBF8]">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Expert Opinions</h2>
                    <p className="text-lg text-[#535862] mb-6 leading-relaxed">
                        Hear from experts across different industries
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-4 mt-5 lg:mt-10">
                    {expertOpinionsData?.data.map((expert, index) => (
                        <ExpertCard
                            key={expert.id || index}
                            expertImage={expert.photo}
                            expertName={expert.name}
                            title={expert.title}
                            opinion={expert.opinion}
                            expertId={expert.id}
                        />
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div style={{
                    // background: "linear-gradient(26.57deg, #252B37 8.33%, #414651 91.67%)",
                }} className="max-w-7xl p-14 bg-[url('/images/cta-bg.png')] bg-cover bg-center mx-auto rounded-2xl flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="z-10 relative">
                        <h2 className="text-3xl lg:text-[30px] font-bitter font-semibold text-white mb-4">
                            Get listed
                        </h2>
                        <p className="text-base text-white leading-relaxed">
                            Get a competitive edge with Construct Africa. Join thousands of companies making data-driven decisions.
                        </p>
                    </div>
                    <ActionButton
                        buttonText="Request Listing"
                        width="fit"
                        textColor="#181D27"
                        backgroundColor="#ffffff"
                        textSize="text-base"
                        paddingX="px-8"
                        link="/get-listed"
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
                    {teamMembers.slice(0, 4).map((member, index: number) => (
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
                        link="/advisory-board"
                    />
                </div>
            </section >

            <section className="py-20 px-5 sm:px-10 lg:px-20">
                <div className="flex gap-20 items-center">
                    <div className="relative flex-1">
                        <div className="absolute inset-0"></div>
                        <img src="/images/map-illustration.svg" alt="Let's Construct Africa Together" className="w-full h-full object-cover" />
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

                                <ActionButton
                                    buttonText="Submit"
                                    backgroundColor="#E0891E"
                                    textSize="text-base"
                                    width="full"
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
