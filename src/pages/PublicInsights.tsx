import { FiLock } from 'react-icons/fi'
import { sidebarArticles } from '../data/home.data'
import { ActionButton, Select } from '../components'
import ProjectCard2 from '../components/ProjectCard2'

const PublicInsights = () => {
    // const [selectedRegion, setSelectedRegion] = useState("All");
    // const [selectedCountry, setSelectedCountry] = useState("All");
    // const [selectedSector, setSelectedSector] = useState("All");

    const newsArticles = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest. The Egyptian Environmental Affairs Agency invites consulting firm...",
            author: "Phoenix Baker",
            date: "19 Jan 2025",
            isPaid: true
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Kenya Infrastructure Development Project",
            description: "Major infrastructure development initiative across multiple regions in Kenya including roads, bridges, and public facilities...",
            author: "Sarah Johnson",
            date: "18 Jan 2025",
            isPaid: false
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Cape Town Smart City Initiative",
            description: "Comprehensive smart city development project focusing on sustainable urban planning and digital infrastructure...",
            author: "Michael Chen",
            date: "17 Jan 2025",
            isPaid: false
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Renewable Energy Grid Expansion",
            description: "Large-scale renewable energy infrastructure project to expand the national grid across multiple provinces...",
            author: "Aisha Okafor",
            date: "16 Jan 2025",
            isPaid: true
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Port Modernization Program",
            description: "Comprehensive modernization of major port facilities including container terminals and logistics infrastructure...",
            author: "David Rodriguez",
            date: "15 Jan 2025",
            isPaid: true
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Urban Development Initiative",
            description: "Strategic urban planning and development project aimed at improving city infrastructure and living conditions...",
            author: "Emma Thompson",
            date: "14 Jan 2025",
            isPaid: false
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Ethiopian Railway Network Expansion",
            description: "Major railway infrastructure project connecting Addis Ababa with regional cities and neighboring countries...",
            author: "James Wilson",
            date: "13 Jan 2025",
            isPaid: true
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Johannesburg Metro Rail Upgrade",
            description: "Comprehensive upgrade of the metro rail system to improve connectivity and reduce travel times...",
            author: "Lisa Anderson",
            date: "12 Jan 2025",
            isPaid: false
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Congo River Bridge Construction",
            description: "Construction of a major bridge across the Congo River to improve regional connectivity...",
            author: "Robert Kim",
            date: "11 Jan 2025",
            isPaid: true
        },
        {
            id: 10,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Morocco Solar Farm Development",
            description: "Large-scale solar energy project to increase renewable energy capacity in the region...",
            author: "Maria Garcia",
            date: "10 Jan 2025",
            isPaid: false
        },
        {
            id: 11,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Lagos Airport Terminal Expansion",
            description: "Major expansion of Lagos International Airport to accommodate growing passenger traffic...",
            author: "Ahmed Hassan",
            date: "9 Jan 2025",
            isPaid: true
        },
        {
            id: 12,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Tanzania Port Infrastructure Upgrade",
            description: "Comprehensive upgrade of Dar es Salaam port facilities to handle increased cargo volumes...",
            author: "Grace Mwangi",
            date: "8 Jan 2025",
            isPaid: false
        },
        {
            id: 13,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Cape Town Water Treatment Plant",
            description: "New water treatment facility to address water scarcity challenges in the Western Cape...",
            author: "Peter van der Merwe",
            date: "7 Jan 2025",
            isPaid: true
        },
        {
            id: 14,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Cameroon Hydroelectric Dam",
            description: "Construction of a new hydroelectric dam to boost power generation capacity...",
            author: "François Mbemba",
            date: "6 Jan 2025",
            isPaid: false
        },
        {
            id: 15,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Algeria Gas Pipeline Extension",
            description: "Extension of natural gas pipeline network to improve energy distribution...",
            author: "Youssef Benali",
            date: "5 Jan 2025",
            isPaid: true
        },
        {
            id: 16,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Ghana Digital Infrastructure Project",
            description: "Development of digital infrastructure to support the country's digital transformation...",
            author: "Kwame Asante",
            date: "4 Jan 2025",
            isPaid: false
        },
        {
            id: 17,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Uganda Road Network Modernization",
            description: "Comprehensive modernization of Uganda's road network to improve connectivity...",
            author: "Patience Nakato",
            date: "3 Jan 2025",
            isPaid: true
        },
        {
            id: 18,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Durban Port Expansion Project",
            description: "Major expansion of Durban port to handle increased container traffic...",
            author: "Thabo Mthembu",
            date: "2 Jan 2025",
            isPaid: false
        },
        {
            id: 19,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Gabon Forest Conservation Initiative",
            description: "Sustainable forest management project to protect biodiversity and support local communities...",
            author: "Jean-Baptiste Nguema",
            date: "1 Jan 2025",
            isPaid: true
        },
        {
            id: 20,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Tunisia Wind Energy Farm",
            description: "Development of wind energy farms to increase renewable energy capacity...",
            author: "Fatma Ben Salem",
            date: "31 Dec 2024",
            isPaid: false
        },
        {
            id: 21,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Senegal Urban Transport System",
            description: "Development of modern urban transport system for Dakar metropolitan area...",
            author: "Aminata Diop",
            date: "30 Dec 2024",
            isPaid: true
        },
        {
            id: 22,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Rwanda Smart City Development",
            description: "Development of smart city infrastructure in Kigali to improve urban living...",
            author: "Jean-Paul Uwimana",
            date: "29 Dec 2024",
            isPaid: false
        },
        {
            id: 23,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Pretoria University Campus Expansion",
            description: "Major expansion of University of Pretoria campus to accommodate growing student population...",
            author: "Nomsa Dlamini",
            date: "28 Dec 2024",
            isPaid: true
        },
        {
            id: 24,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Central African Republic Road Rehabilitation",
            description: "Rehabilitation of major road networks to improve regional connectivity and trade...",
            author: "Pierre Bokassa",
            date: "27 Dec 2024",
            isPaid: false
        }
    ];

    // Filter options
    const regions = ["All", "West Africa", "East Africa", "South Africa", "Central Africa", "North Africa"];
    const countries = ["All", "Nigeria", "Kenya", "South Africa", "Egypt", "Ghana"];
    const sectors = ["All", "Infrastructure", "Energy", "Transportation", "Housing", "Technology"];

    // const clearAllFilters = () => {
    //     setSelectedRegion("All");
    //     setSelectedCountry("All");
    //     setSelectedSector("All");
    // };

    return (
        <div className="min-h-screen">
            <section className="mx-auto py-5 md:py-8 px-5 sm:px-10 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className='text-lg font-semibold text-[#181D27] border-b-4 mb-5 border-[#F89822] py-1 px-2 w-fit'>Top News</div>
                        <div className="">
                            <div className="relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
                                    alt="Solar panels installation"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="mt-6">
                                <div className='flex items-center gap-2 mb-1 md:mb-2'>
                                    <span className='w-[32px] h-[32px] flex justify-center items-center border border-[#E9EAEB] rounded-full'>
                                        <FiLock color='#E0891E' size={12} />
                                    </span>
                                    <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">
                                        West Africa
                                    </span>
                                </div>
                                <h1 className="text-lg md:text-xl lg:text-[30px] text-[#181D27] font-bitter !font-semibold mb-2 lg:leading-10 max-w-3xl">
                                    Construction Begins On First Moroccan-Made Solar Water Heater Plant
                                </h1>
                                <p className="text-[#535862] text-sm md:text-base font-normal">
                                    Green Innov Industry Investment (Gi3) launched the construction of a plant for the first Moroccan-designed and developed solar
                                    water heaters at the Ain Johra Industrial Parkin Tiflet on 16 January.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col">
                        <div className='text-lg font-semibold text-[#181D27] border-b-4 mb-5 border-[#F89822] py-1 px-2 w-fit'>Latest News</div>
                        <div className='lg:items-end flex flex-col'>
                            <div className="flex flex-col gap-5 max-lg:mb-5">
                                {sidebarArticles.map((article, index) => (
                                    <article key={article.id + index} className="">
                                        <div className='flex items-center gap-2 mb-1 md:mb-2'>
                                            <span className='w-[32px] h-[32px] flex justify-center items-center border border-[#E9EAEB] rounded-full'>
                                                <FiLock color='#E0891E' size={12} />
                                            </span>
                                            <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">
                                                {article.category}
                                            </span>
                                        </div>

                                        <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight">
                                            {article.title}
                                        </h3>

                                        <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
                                            {article.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='px-5 sm:px-10 lg:px-20 py-10'>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
                    <div className='text-lg font-semibold text-[#181D27] border-b-4 border-[#F89822] py-1 pr-4 w-fit'>All News</div>
                    <ActionButton
                        buttonText="Filters"
                        outline
                        width="fit"
                        link='/filters'
                        paddingX='px-6'
                    />
                </div>

                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className='w-[300px]'>
                                <Select
                                    label="Region"
                                    labelFor="region"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Region"
                                    options={regions.map((region) => ({ value: region, label: region }))}
                                />
                            </div>

                            <div className='w-[300px]'>
                                <Select
                                    label="Country"
                                    labelFor="country"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Country"
                                    options={countries.map((country) => ({ value: country, label: country }))}
                                />
                            </div>

                            <div className='w-[300px]'>
                                <Select
                                    label="Sector"
                                    labelFor="sector"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Sector"
                                    options={sectors.map((sector) => ({ value: sector, label: sector }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-end">
                            <ActionButton
                                buttonText="Clear All"
                                outline
                                width="fit"
                                // attributes={{ type: "button", onClick: clearAllFilters }}
                            />
                        </div>
                    </div>
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
    )
}

export default PublicInsights