// import { useParams } from 'react-router-dom';
// import { FaLinkedin, FaXTwitter, FaFacebook } from 'react-icons/fa6';
// import { featuredOpinions } from '../data/home.data';

// const ExpertOpinionDetails = () => {
//     const { id } = useParams<{ id: string }>();
//     const expertId = id ? parseInt(id) : 1;

//     const expert = featuredOpinions.find(e => e.id === expertId) || featuredOpinions[0];

//     const expertImages = [
//         "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0",
//         "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0"
//     ];
//     const expertImage = expertImages[expertId - 1] || expertImages[0];

//     const articleContent = `
//         <h2>The Road from Concept to Capital</h2>
//         <p>Infrastructure tokenisation can address liquidity problems, structural hurdles in traditional investment, and how blockchain can unlock capital from a diverse investor base. For tokenisation to become a credible investment mechanism, it must involve financial instruments, outlining two pathways: tokenised bonds for indirect exposure and direct tokenisation of assets. Both approaches offer opportunities but also raise questions about structure, regulation, and execution.</p>

//         <h2>Infrastructure Bonds Reimagined</h2>
//         <p>Conventional bonds are the "workhorse" of infrastructure finance, highlighting their predictability but also their limitations (tying up capital, limited maneuverability). Tokenised infrastructure bonds are "intelligent, programmable assets" representing claims on future cash flows. It emphasizes their fractionalisation, opening access to a broader range of investors (from sovereign wealth funds to retail investors and diaspora communities) through regulated platforms and compliant digital markets.</p>
//         <p>These blockchain-powered instruments are dynamic, with automated coupon payments, embedded compliance, real-time transaction recording, and transparency. Traditional finance is already adopting this, mentioning "EIX Global" working with "Aquis Exchange" to deploy private placement bonds for infrastructure projects via a secondary market, indicating that tokenised bonds are a "redesign from the ground up."</p>
//         <p>The elimination of friction: no manual reconciliations, no dependency on custodians or clearing services, and smart contracts enabling issuance, trading, and settlement in moments. The adaptability of tokenised bonds, where coupon rates can respond to sustainability milestones, transfers can be restricted to verified investors based on compliance logic, and access is opened to everyday investors, community treasuries, and purpose-driven capital, with trust built into the blockchain protocol through live reporting and transparent audit trails.</p>

//         <h2>Secondary Markets and the Liquidity Question</h2>
//         <p>Compliant, peer-to-peer digital platforms, enabled by blockchain, make infrastructure operate like a public market instrument, offering transparency, traceability, and accessibility that was previously limited to institutional access. The momentum of platforms like OpenEden in tokenized Real World Assets, specifically mentioning their MOODY's rated investment grade treasury fund. It highlights the benefits of tokenization: efficiency, accessibility, and a streamlined user experience, describing it as a new language of finance that prioritizes access and executable code.</p>
//         <p>This is a pivot in financial architecture and a step towards reimagining how the physical world is funded. Direct tokenization of infrastructure assets involves dividing ownership into digital tokens that can be traded. This transforms infrastructure into asset-backed securities, granting token holders rights to revenues, governance, or equity value.</p>

//         <h2>Looking Ahead: From Innovation to Integration</h2>
//         <p>As Africa continues to develop its infrastructure, the integration of innovative financial instruments will be crucial. Tokenisation represents not just a technological advancement, but a fundamental shift in how we think about infrastructure investment, making it more accessible, transparent, and efficient for all stakeholders.</p>
//     `;

//     const expertBio = expertId === 1
//         ? `${expert.name} is a seasoned infrastructure investment professional with expertise in corporate finance, asset management, and blockchain applications in the built environment. She has extensive experience in developing innovative financial instruments for infrastructure projects across Africa.`
//         : expertId === 2
//             ? `${expert.name} is a seasoned infrastructure investment professional with expertise in corporate finance, asset management, and blockchain applications in the built environment. He serves as Director at AEO Group, where he leads initiatives in tokenized infrastructure assets.`
//             : `${expert.name} is a leading expert in infrastructure finance and blockchain technology, with a focus on making infrastructure investment more accessible and transparent across African markets.`;

//     return (
//         <div className="min-h-screen bg-white">
//             <section className="pt-10 px-4 sm:px-6 lg:px-10 xl:px-20">
//                 <div className="max-w-4xl mx-auto">
//                     <h1 className="text-lg sm:text-xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
//                         About {expert.name}
//                     </h1>
//                     <p className="text-sm text-[#535862] mb-10 leading-relaxed">
//                         {expert.title}
//                     </p>
//                 </div>
//             </section>

//             <section className="px-4 sm:px-6 lg:px-10 xl:px-20 pb-10">
//                 <div className="max-w-4xl mx-auto">
//                     <h2 className="text-lg sm:text-xl lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-6 md:mb-8">
//                         About
//                     </h2>

//                     <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden mb-8 md:mb-12">
//                         <img
//                             src={expertImage}
//                             alt={expert.title}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>

//                     <article className="prose prose-lg max-w-none">
//                         <div
//                             className="text-base text-[#535862] leading-relaxed [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862]"
//                             dangerouslySetInnerHTML={{ __html: articleContent }}
//                         />
//                     </article>

//                     <p className="text-sm text-[#717680] italic mt-8 mb-12">
//                         Top Photo: Smart City Digital Network (Setan Cell / Dreamstime)
//                     </p>
//                 </div>
//                 <div className="max-w-4xl mx-auto border-y border-[#E9EAEB] py-8 mb-10">
//                     <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
//                         <div className="flex-shrink-0">
//                             <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200">
//                                 <img
//                                     src={expert.image}
//                                     alt={expert.name}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex-1">
//                             <h3 className="text-xl sm:text-2xl font-semibold text-[#181D27] mb-3">
//                                 {expert.name}
//                             </h3>
//                             <p className="text-base text-[#535862] leading-relaxed mb-4">
//                                 {expertBio}
//                             </p>

//                             <div className="flex items-center gap-4">
//                                 <a
//                                     href="#"
//                                     className="text-[#0A66C2] hover:text-[#E0891E] transition-colors"
//                                     aria-label="LinkedIn"
//                                 >
//                                     <FaLinkedin size={20} />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="text-[#535862] hover:text-[#E0891E] transition-colors"
//                                     aria-label="X (Twitter)"
//                                 >
//                                     <FaXTwitter size={20} />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="text-[#0A66C2] hover:text-[#E0891E] transition-colors"
//                                     aria-label="Facebook"
//                                 >
//                                     <FaFacebook size={20} />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default ExpertOpinionDetails;



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
            <section className="pt-10 px-4 sm:px-6 lg:px-10 xl:px-20">
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
            <section className="px-4 sm:px-6 lg:px-10 xl:px-20 pb-10">
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
