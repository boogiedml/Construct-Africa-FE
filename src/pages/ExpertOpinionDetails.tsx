import { useParams, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaXTwitter, FaGlobe } from 'react-icons/fa6';
import { FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import { useGetExpertByIdQuery, useGetExpertBySlugQuery } from '../store/services/expert';
import { ActionButton, ExpertOpinionDetailsSkeleton } from '../components';

const ExpertOpinionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch expert by slug
    const { data: expertResponse, isLoading, error } = useGetExpertByIdQuery(id || '');

    // The API returns an array, so we need to get the first item
    const expert = expertResponse?.data && Array.isArray(expertResponse.data) 
        ? expertResponse.data[0] 
        : expertResponse?.data;

    // Helper function to get expert image
    const getExpertImage = (expert: any) => {
        if (!expert?.photo) {
            return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop";
        }
        
        if (typeof expert.photo === 'string') {
            return `${import.meta.env.VITE_API_BASE_URL}/assets/${expert.photo}`;
        }
        
        return `${import.meta.env.VITE_API_BASE_URL}/assets/${expert.photo.id}`;
    };

    // Helper function to get header image (using photo or placeholder)
    const getHeaderImage = (expert: any) => {
        // Placeholder for header - you can use a different field if available
        return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0";
    };

    // Helper function to get location string
    const getLocation = (expert: any) => {
        const parts: string[] = [];
        
        if (expert?.countries && expert.countries.length > 0) {
            parts.push(expert.countries[0].countries_id.name);
        }
        
        if (expert?.regions && expert.regions.length > 0) {
            parts.push(expert.regions[0].regions_id.name);
        }
        
        return parts.join(', ') || '';
    };

    if (isLoading) {
        return <ExpertOpinionDetailsSkeleton />;
    }

    if (error || !expert) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-[#181D27] mb-4">Expert Not Found</h2>
                <p className="text-[#535862] mb-6">The expert profile you're looking for doesn't exist or has been removed.</p>
                <ActionButton
                    buttonText="Back to Expert Opinions"
                    // onClick={() => navigate('/admin/expert-opinions')}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="pt-10 ">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-lg sm:text-xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                        {expert.title}
                    </h1>
                    {/* <p className="text-sm text-[#535862] mb-4 leading-relaxed">
                        {expert.title}
                    </p> */}
                    {expert.position && expert.company && (
                        <p className="text-sm text-[#535862] mb-4 leading-relaxed">
                            {expert.position} at {expert.company}
                        </p>
                    )}
                    {getLocation(expert) && (
                        <p className="text-sm text-[#535862] mb-10 leading-relaxed">
                            {getLocation(expert)}
                        </p>
                    )}
                </div>
            </section>

            {/* Main Content Section */}
            <section className=" pb-10">
                <div className="max-w-4xl mx-auto">
                    {/* <h2 className="text-lg sm:text-xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-6 md:mb-8">
                        About
                    </h2> */}

                    {/* Featured Image */}
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden mb-8 md:mb-12">
                        <img
                            src={getHeaderImage(expert)}
                            alt={expert.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Expert Bio */}
                    {expert.bio && (
                        <article className="prose prose-lg max-w-none mb-8">
                            <div
                                className="text-base text-[#535862] leading-relaxed [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862] [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4"
                                dangerouslySetInnerHTML={{ __html: expert.bio }}
                            />
                        </article>
                    )}

                    {/* Expert Opinion */}
                    {expert.opinion && (
                        <article className="prose prose-lg max-w-none mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#181D27] mb-4">
                                Expert Opinion
                            </h3>
                            <div
                                className="text-base text-[#535862] leading-relaxed [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862] [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4"
                                dangerouslySetInnerHTML={{ __html: expert.opinion }}
                            />
                        </article>
                    )}

                    {/* Sectors */}
                    {expert.sectors && expert.sectors.length > 0 && (
                        <div className="mb-8">
                            <h4 className="text-sm font-semibold text-[#535862] mb-3">Areas of Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {expert.sectors.map((sector: any) => (
                                    <span 
                                        key={sector.sectors_id.id}
                                        className="px-3 py-1 bg-[#F89822]/10 text-[#F89822] text-sm rounded-full"
                                    >
                                        {sector.sectors_id.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Photo Caption if needed */}
                    <p className="text-sm text-[#717680] italic mt-8 mb-12">
                        Photo: {expert.name}
                    </p>
                </div>

                {/* Expert Profile Card */}
                <div className="max-w-4xl mx-auto border-y border-[#E9EAEB] py-8 mb-10">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200">
                                <img
                                    src={getExpertImage(expert)}
                                    alt={expert.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#181D27] mb-2">
                                {expert.name}
                            </h3>
                            
                            {expert.position && expert.company && (
                                <div className="flex items-center gap-2 text-[#535862] mb-3">
                                    <FiBriefcase size={16} />
                                    <p className="text-sm">
                                        {expert.position} at {expert.company}
                                    </p>
                                </div>
                            )}

                            {expert.title && (
                                <p className="text-base text-[#535862] leading-relaxed mb-4">
                                    {expert.title}
                                </p>
                            )}

                            {/* Contact Information */}
                            <div className="flex flex-col gap-2 mb-4">
                                {expert.email && (
                                    <a 
                                        href={`mailto:${expert.email}`}
                                        className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#F89822] transition-colors"
                                    >
                                        <FiMail size={16} />
                                        {expert.email}
                                    </a>
                                )}
                                
                                {expert.phone && (
                                    <a 
                                        href={`tel:${expert.phone}`}
                                        className="flex items-center gap-2 text-sm text-[#535862] hover:text-[#F89822] transition-colors"
                                    >
                                        <FiPhone size={16} />
                                        {expert.phone}
                                    </a>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {expert.linkedin && (
                                    <a
                                        href={expert.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0A66C2] hover:text-[#F89822] transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin size={20} />
                                    </a>
                                )}
                                
                                {expert.twitter && (
                                    <a
                                        href={expert.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#535862] hover:text-[#F89822] transition-colors"
                                        aria-label="X (Twitter)"
                                    >
                                        <FaXTwitter size={20} />
                                    </a>
                                )}
                                
                                {expert.website && (
                                    <a
                                        href={expert.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#535862] hover:text-[#F89822] transition-colors"
                                        aria-label="Website"
                                    >
                                        <FaGlobe size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExpertOpinionDetails;
