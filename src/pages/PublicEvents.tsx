import { ActionButton, Select } from '../components'
import ProjectCard2 from '../components/ProjectCard2'
import { useState } from 'react'

const PublicEvents = () => {
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedSector, setSelectedSector] = useState("All");

    const eventsData = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Africa Construction Summit 2025",
            description: "Join industry leaders, government officials, and construction professionals for the largest construction conference in West Africa...",
            author: "Conference Organizers",
            date: "15-17 Feb 2025",
            isPaid: true
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Infrastructure Development Workshop",
            description: "A comprehensive workshop on modern infrastructure development techniques and sustainable construction practices...",
            author: "Engineering Institute",
            date: "22 Feb 2025",
            isPaid: false
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Smart Cities Expo Cape Town",
            description: "Explore the latest innovations in smart city development, IoT solutions, and urban planning technologies...",
            author: "Smart Cities Council",
            date: "8-10 Mar 2025",
            isPaid: true
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Renewable Energy Conference",
            description: "Focus on solar, wind, and hydroelectric power solutions for sustainable development across Central Africa...",
            author: "Energy Association",
            date: "5 Mar 2025",
            isPaid: false
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Port & Logistics Summit",
            description: "Comprehensive summit covering port modernization, logistics optimization, and maritime infrastructure...",
            author: "Maritime Authority",
            date: "12-14 Mar 2025",
            isPaid: true
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Urban Planning Symposium",
            description: "Strategic urban planning and development symposium aimed at improving city infrastructure and living conditions...",
            author: "Urban Development Institute",
            date: "19 Mar 2025",
            isPaid: false
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Railway Infrastructure Forum",
            description: "Major railway infrastructure forum connecting regional cities and discussing cross-border connectivity...",
            author: "Railway Authority",
            date: "26 Mar 2025",
            isPaid: true
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Metro Rail Technology Expo",
            description: "Comprehensive expo showcasing metro rail system upgrades and connectivity improvements...",
            author: "Transport Authority",
            date: "2 Apr 2025",
            isPaid: false
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Bridge Construction Workshop",
            description: "Workshop on major bridge construction techniques and regional connectivity improvements...",
            author: "Civil Engineering Society",
            date: "9 Apr 2025",
            isPaid: true
        },
        {
            id: 10,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Solar Energy Innovation Summit",
            description: "Large-scale solar energy innovation summit focusing on renewable energy capacity expansion...",
            author: "Solar Energy Association",
            date: "16 Apr 2025",
            isPaid: false
        },
        {
            id: 11,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Airport Development Conference",
            description: "Major airport development conference focusing on terminal expansion and passenger traffic management...",
            author: "Aviation Authority",
            date: "23 Apr 2025",
            isPaid: true
        },
        {
            id: 12,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Port Infrastructure Seminar",
            description: "Comprehensive seminar on port facility upgrades and cargo volume handling optimization...",
            author: "Port Authority",
            date: "30 Apr 2025",
            isPaid: false
        },
        {
            id: 13,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Water Treatment Technology Expo",
            description: "Expo showcasing new water treatment technologies and solutions for water scarcity challenges...",
            author: "Water Authority",
            date: "7 May 2025",
            isPaid: true
        },
        {
            id: 14,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Hydroelectric Power Summit",
            description: "Summit on hydroelectric dam construction and power generation capacity enhancement...",
            author: "Power Authority",
            date: "14 May 2025",
            isPaid: false
        },
        {
            id: 15,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Gas Pipeline Technology Forum",
            description: "Forum on natural gas pipeline network extension and energy distribution optimization...",
            author: "Energy Corporation",
            date: "21 May 2025",
            isPaid: true
        },
        {
            id: 16,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Digital Infrastructure Workshop",
            description: "Workshop on digital infrastructure development and digital transformation strategies...",
            author: "ICT Ministry",
            date: "28 May 2025",
            isPaid: false
        },
        {
            id: 17,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Road Network Modernization Summit",
            description: "Summit on comprehensive road network modernization and connectivity improvements...",
            author: "Transport Ministry",
            date: "4 Jun 2025",
            isPaid: true
        },
        {
            id: 18,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "Port Expansion Technology Conference",
            description: "Conference on major port expansion technologies and container traffic management...",
            author: "Port Authority",
            date: "11 Jun 2025",
            isPaid: false
        },
        {
            id: 19,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Forest Conservation Symposium",
            description: "Symposium on sustainable forest management and biodiversity protection strategies...",
            author: "Environmental Agency",
            date: "18 Jun 2025",
            isPaid: true
        },
        {
            id: 20,
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "North Africa",
            title: "Wind Energy Innovation Expo",
            description: "Expo on wind energy farm development and renewable energy capacity expansion...",
            author: "Renewable Energy Council",
            date: "25 Jun 2025",
            isPaid: false
        },
        {
            id: 21,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "West Africa",
            title: "Urban Transport System Summit",
            description: "Summit on modern urban transport system development for metropolitan areas...",
            author: "Transport Authority",
            date: "2 Jul 2025",
            isPaid: true
        },
        {
            id: 22,
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "East Africa",
            title: "Smart City Development Forum",
            description: "Forum on smart city infrastructure development and urban living improvements...",
            author: "Smart Cities Initiative",
            date: "9 Jul 2025",
            isPaid: false
        },
        {
            id: 23,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "South Africa",
            title: "University Campus Development Conference",
            description: "Conference on major university campus expansion and student accommodation solutions...",
            author: "Education Ministry",
            date: "16 Jul 2025",
            isPaid: true
        },
        {
            id: 24,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            region: "Central Africa",
            title: "Road Rehabilitation Workshop",
            description: "Workshop on major road network rehabilitation and regional connectivity enhancement...",
            author: "Infrastructure Ministry",
            date: "23 Jul 2025",
            isPaid: false
        }
    ];

    const regions = ["All", "West Africa", "East Africa", "South Africa", "Central Africa", "North Africa"];
    const countries = ["All", "Nigeria", "Kenya", "South Africa", "Egypt", "Ghana"];
    const sectors = ["All", "Infrastructure", "Energy", "Transportation", "Housing", "Technology"];

    const clearAllFilters = () => {
        setSelectedRegion("All");
        setSelectedCountry("All");
        setSelectedSector("All");
    };

    return (
        <div className="min-h-screen">
            <section className='px-5 sm:px-10 lg:px-20 py-10'>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
                    <div className='text-lg font-semibold text-[#181D27] border-b-4 border-[#F89822] py-1 pr-4 w-fit'>All Events</div>
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
                                attributes={{ type: "button", onClick: clearAllFilters }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                    {eventsData.map((event) => (
                        <ProjectCard2
                            key={event.id}
                            id={event.id}
                            image={event.image}
                            region={event.region}
                            title={event.title}
                            description={event.description}
                            author={event.author}
                            date={event.date}
                            isPaid={event.isPaid}
                            linkPath={`/events/${event.id}`}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default PublicEvents
