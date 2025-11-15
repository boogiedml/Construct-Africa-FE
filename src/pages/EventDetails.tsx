// import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
// import { ProjectCard } from '../components'
// import { recentProjects } from '../data/home.data'
// import { MdVerified } from 'react-icons/md'

// const EventDetails = () => {
//     return (
//         <div className="min-h-screen bg-white">
//             <section className='pt-10 px-5 sm:px-10 lg:px-20 mb-8'>
//                 <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Nigeria Committed To High-Speed Rail Construction</h2>
//                 <p className='text-sm text-[#535862] leading-relaxed'>West Africa - Nigeria - Transport/Infrastructure</p>
//             </section>

//             <section className='py-10 px-5 sm:px-10 lg:px-20 sm:grid grid-cols-1 lg:grid-cols-3 gap-14'>
//                 <div className='col-span-2'>
//                     <div className='mb-10'>
//                         <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Quick info</h2>

//                         {/* Quick Info Section */}
//                         <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-28">
//                             <div className="flex flex-col gap-3">
//                                 <div className="flex items-center gap-2">
//                                     <FiUser size={18} className="text-[#535862]" />
//                                     <span className="text-base text-[#535862]">Organizer</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-base text-[#181D27] ml-7">InventU Limited</span>
//                                     <MdVerified size={18} color="#F89822" />
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <div className="flex items-center gap-2">
//                                     <FiCalendar size={18} className="text-[#535862]" />
//                                     <span className="text-base text-[#535862]">Event date</span>
//                                 </div>
//                                 <span className="text-base text-[#181D27] ml-7">07:30 AM - 04:30 PM GMT, 16 Sep 2025</span>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <div className="flex items-center gap-2">
//                                     <FiClock size={18} className="text-[#535862]" />
//                                     <span className="text-base text-[#535862]">Location</span>
//                                 </div>
//                                 <span className="text-base text-[#181D27] ml-7">Germany</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-8 leading-tight">About</h3>
//                         <div className='relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden mb-8'>
//                             <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071" alt="" />
//                             <div className='absolute top-0 left-0 w-full h-full bg-black/50' />
//                             <img src="/images/cawatermark.svg" alt="" className='absolute top-10 left-10' />
//                         </div>
//                         <p className='text-sm text-[#535862] mb-5 leading-relaxed'>
//                             The congress serves as a strategic platform for policymakers, industry leaders, and innovators to drive advancements in sustainable fuels, explore regulatory developments, and accelerate the transition to a low-carbon future.
//                         </p>
//                         <p className='text-sm text-[#535862] mb-4 leading-relaxed'>The event will feature four focused forums:</p>
//                         <ul className='list-disc list-inside text-sm text-[#535862] flex flex-col gap-2 leading-relaxed'>
//                             <li>5th Biogas Forum</li>
//                             <li>4th Sustainable Aviation Fuels Forum</li>
//                             <li>4th Biofuels Forum</li>
//                             <li>4th Sustainable Maritime Fuels Forum</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <article className='col-span-1 sticky top-20'>
//                     <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">Related Events</h3>
//                     <div className='flex flex-col gap-5'>
//                         {recentProjects.slice(0, 2).map((project) => (
//                             <ProjectCard
//                                 key={project.id}
//                                 image={project.image}
//                                 status={project.status}
//                                 title={project.title}
//                                 description={project.description}
//                                 location={project.location}
//                                 category={project.category}
//                                 value={project.value}
//                                 isFavorite={project.isFavorite}
//                             />
//                         ))}
//                     </div>
//                 </article>
//             </section>
//         </div>
//     )
// }

// export default EventDetails



import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiClock, FiMail, FiPhone, FiExternalLink, FiGlobe } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { ProjectCard, ActionButton } from '../components';
import { useGetEventByIdQuery, useGetEventsQuery } from '../store/services/events';
import type { Event } from '../types/events.types';

const EventDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch single event
    const { data: eventResponse, isLoading, error } = useGetEventByIdQuery(id || '');
    
    // Fetch related events (same country or event type)
    const { data: relatedEventsResponse } = useGetEventsQuery({
        limit: 3,
        "filter[id][_neq]": id,
        "filter[status][_eq]": "published",
    });

    const event = eventResponse?.data;
    const relatedEvents = relatedEventsResponse?.data || [];

    // Helper function to format date and time
    const formatEventDate = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const startTime = start.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const endTime = end.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const startDateFormatted = start.toLocaleDateString('en-US', { 
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        const endDateFormatted = end.toLocaleDateString('en-US', { 
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        // Check if same day
        if (startDateFormatted === endDateFormatted) {
            return `${startTime} - ${endTime}, ${startDateFormatted}`;
        }
        
        return `${startDateFormatted} - ${endDateFormatted}`;
    };

    // Helper function to get event location
    const getEventLocation = (event: Event) => {
        const parts: string[] = [];
        if (event.city) parts.push(event.city);
        if (event.state) parts.push(event.state);
        if (event.country) parts.push(event.country);
        return parts.join(', ') || event.venue_address;
    };

    // Helper function to get region/country breadcrumb
    const getBreadcrumb = (event: Event) => {
        const parts: string[] = [];
        
        if (event.regions && event.regions.length > 0) {
            parts.push(event.regions[0].regions_id.name);
        }
        
        if (event.countries && event.countries.length > 0) {
            parts.push(event.countries[0].countries_id.name);
        }
        
        if (event.sectors && event.sectors.length > 0) {
            parts.push(event.sectors[0].sectors_id.name);
        }
        
        return parts.join(' - ') || 'Event';
    };

    // Helper function to get event image
    const getEventImage = (event: Event) => {
        if (!event.featured_image) {
            return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0";
        }
        
        if (typeof event.featured_image === 'string') {
            return `${import.meta.env.VITE_API_BASE_URL}/assets/${event.featured_image}`;
        }
        
        return `${import.meta.env.VITE_API_BASE_URL}/assets/${event.featured_image.id}`;
    };

    // Helper function to get event type name
    const getEventTypeName = (event: Event) => {
        if (!event.event_type) return 'Event';
        
        if (typeof event.event_type === 'string') {
            return 'Event';
        }
        
        return event.event_type.name || 'Event';
    };

    // Helper function to strip HTML tags
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, '').trim();
    };

    // Helper function to parse HTML content
    const parseHtmlContent = (html: string) => {
        // Remove HTML tags but preserve structure
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F89822]"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-[#181D27] mb-4">Event Not Found</h2>
                <p className="text-[#535862] mb-6">The event you're looking for doesn't exist or has been removed.</p>
                {/* <ActionButton
                    buttonText="Back to Events"
                /> */}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className='pt-10 px-5 sm:px-10 lg:px-20 mb-8'>
                <h1 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                    {event.title}
                </h1>
                <p className='text-sm text-[#535862] leading-relaxed'>
                    {getBreadcrumb(event)}
                </p>
            </section>

            {/* Main Content Section */}
            <section className='py-10 px-5 sm:px-10 lg:px-20 sm:grid grid-cols-1 lg:grid-cols-3 gap-14'>
                <div className='col-span-2'>
                    {/* Quick Info Section */}
                    <div className='mb-10'>
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-6 leading-tight">
                            Quick info
                        </h2>

                        <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20">
                            {/* Event Type */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Event Type</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-base text-[#181D27] ml-7 font-medium">
                                        {getEventTypeName(event)}
                                    </span>
                                    <MdVerified size={18} color="#F89822" />
                                </div>
                            </div>

                            {/* Event Date */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiClock size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Event Date</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">
                                    {formatEventDate(event.start_date, event.end_date)}
                                </span>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiMapPin size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Location</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">
                                    {getEventLocation(event)}
                                </span>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20">

                            {/* Registration Deadline */}
                            {event.registration_required === 1 && event.registration_deadline && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Registration Deadline</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">
                                        {new Date(event.registration_deadline).toLocaleDateString('en-US', { 
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-8 leading-tight">
                            About
                        </h3>
                        
                        {/* Featured Image */}
                        <div className='relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden mb-8'>
                            <img 
                                className='w-full h-full object-cover' 
                                src={getEventImage(event)} 
                                alt={event.title}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0";
                                }}
                            />
                            <div className='absolute top-0 left-0 w-full h-full bg-black/50' />
                            <img src="/images/cawatermark.svg" alt="" className='absolute top-10 left-10' />
                        </div>

                        {/* Event Description */}
                        <div className='text-sm text-[#535862] leading-relaxed space-y-4'>
                            <div dangerouslySetInnerHTML={{ __html: event.description }} />
                        </div>

                        {/* Summary if available */}
                        {event.summary && (
                            <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                                <p className='text-sm text-[#535862] leading-relaxed'>
                                    {parseHtmlContent(event.summary)}
                                </p>
                            </div>
                        )}

                        {/* Event Website Button */}
                        {/* {event.event_website && (
                            <div className='mt-8'>
                                <ActionButton
                                    buttonText={
                                        <div className="flex items-center gap-2">
                                            <FiExternalLink size={18} />
                                            {event.event_website_label || 'Visit Event Website'}
                                        </div>
                                    }
                                    onClick={() => window.open(event.event_website, '_blank')}
                                    width="fit"
                                />
                            </div>
                        )} */}

                        {/* Venue Address */}
                        <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
                            <h4 className='text-base font-semibold text-[#181D27] mb-3'>Venue</h4>
                            <p className='text-sm text-[#535862]'>{event.venue_address}</p>
                        </div>

                        {/* Sectors and Regions */}
                        {(event.sectors && event.sectors.length > 0) || (event.countries && event.countries.length > 0) ? (
                            <div className='mt-8 flex flex-wrap gap-4'>
                                {event.sectors && event.sectors.length > 0 && (
                                    <div>
                                        <h4 className='text-sm font-semibold text-[#535862] mb-2'>Sectors</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {event.sectors.map((sector) => (
                                                <span 
                                                    key={sector.sectors_id.id}
                                                    className='px-3 py-1 bg-[#F89822]/10 text-[#F89822] text-xs rounded-full'
                                                >
                                                    {sector.sectors_id.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {event.countries && event.countries.length > 0 && (
                                    <div>
                                        <h4 className='text-sm font-semibold text-[#535862] mb-2'>Countries</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {event.countries.map((country) => (
                                                <span 
                                                    key={country.countries_id.id}
                                                    className='px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full'
                                                >
                                                    {country.countries_id.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Related Events Sidebar */}
                <article className='col-span-1 lg:sticky lg:top-20 h-fit'>
                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">
                        Related Events
                    </h3>
                    <div className='flex flex-col gap-5'>
                        {relatedEvents.length > 0 ? (
                            relatedEvents.slice(0, 2).map((relatedEvent) => (
                                <ProjectCard
                                    key={relatedEvent.id}
                                    image={getEventImage(relatedEvent)}
                                    title={relatedEvent.title}
                                    description={stripHtml(relatedEvent.description)}
                                    location={getEventLocation(relatedEvent)}
                                    value={new Date(relatedEvent.start_date).toLocaleDateString('en-US', { 
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                    onClick={() => navigate(`/admin/events/${relatedEvent.id}`)}
                                />
                            ))
                        ) : (
                            <p className='text-sm text-[#535862]'>No related events available</p>
                        )}
                    </div>
                    <h3 className="text-base mt-10 md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">
                        Links
                    </h3>
                    <div className='flex flex-col gap-5'>
                        {event.contact_email && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiMail size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Contact Email</span>
                                    </div>
                                    <a 
                                        href={`mailto:${event.contact_email}`}
                                        className="text-base text-[#F89822] ml-7 hover:underline"
                                    >
                                        {event.contact_email}
                                    </a>
                                </div>
                            )}

                            {/* Phone */}
                            {event.contact_number && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiPhone size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Contact Phone</span>
                                    </div>
                                    <a 
                                        href={`tel:${event.contact_number}`}
                                        className="text-base text-[#F89822] ml-7 hover:underline"
                                    >
                                        {event.contact_number}
                                    </a>
                                </div>
                            )}

                            {/* Website */}
                            {event.event_website && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiGlobe size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Event Website</span>
                                    </div>
                                    <a 
                                        href={event.event_website}
                                        className="text-base text-[#F89822] ml-7 hover:underline"
                                    >
                                        {event.event_website}
                                    </a>
                                </div>
                            )}
                    </div>
                </article>
            </section>
        </div>
    );
};

export default EventDetails;
