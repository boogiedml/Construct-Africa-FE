import { useParams, useNavigate } from 'react-router-dom';
import { FiLinkedin, FiPhone, FiTrello } from 'react-icons/fi';
import { IoBagOutline, IoEarthOutline } from 'react-icons/io5';
import { GrLocation } from 'react-icons/gr';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { SlSocialFacebook } from 'react-icons/sl';
import { LuBuilding } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { useGetProjectByIdQuery } from '../store/services/projects';
import { DetailPageSkeleton } from '../components';
import { countryMapImages } from '../data/countryMaps';

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: projectResponse, isLoading, error } = useGetProjectByIdQuery(id!);

    const project = projectResponse?.data;

    // Format date helper
    const formatDate = (dateString?: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Format currency helper
    const formatCurrency = (value?: number | null) => {
        if (!value) return 'N/A';
        return `$${value.toLocaleString()} mn`;
    };

    // Stage name mapping (same as Projects.tsx)
    const mapStatusToGroup = (status: string): string => {
        switch ((status || '').toLowerCase()) {
            case 'conceptplanning':
            case 'studyfeasibility':
                return 'Study';
            case 'design':
                return 'Design';
            case 'eoi':
            case 'maincontractbid':
            case 'maincontractidevaluation':
                return 'Bid';
            case 'executionunderconstruction':
                return 'Build';
            case 'onhold':
                return 'On Hold';
            case 'cancelled':
                return 'Cancelled';
            case 'complete':
                return 'Complete';
            default:
                return 'Study';
        }
    };

    const mapStatusToStageName = (status: string): string => {
        switch ((status || '').toLowerCase()) {
            case 'conceptplanning':
                return 'Planning';
            case 'studyfeasibility':
                return 'Study';
            case 'design':
                return 'Design';
            case 'eoi':
                return 'Qualification';
            case 'maincontractbid':
                return 'Bidding';
            case 'maincontractidevaluation':
                return 'Bids Evaluation';
            case 'executionunderconstruction':
                return 'Execution (Construction)';
            case 'onhold':
            case 'cancelled':
            case 'complete':
                return '';
            default:
                return 'Planning';
        }
    };

    // Get stage styles for dot and background color
    const getStageStyles = (group?: string) => {
        const g = group?.toLowerCase() || "";
        switch (g) {
            case "build":
                return { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' };
            case "bid":
                return { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' };
            case "design":
                return { dot: 'bg-[#2E90FA]', text: 'text-[#175CD3]', bg: 'bg-[#EFF8FF]' };
            case "study":
                return { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' };
            case "on hold":
            case "on_hold":
            case "onhold":
                return { dot: 'bg-[#717680]', text: 'text-[#525866]', bg: 'bg-[#F5F5F6]' };
            case "cancelled":
                return { dot: 'bg-[#D92D20]', text: 'text-[#B42318]', bg: 'bg-[#FEF3F2]' };
            case "complete":
                return { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' };
            default:
                return { dot: 'bg-gray-500', text: 'text-gray-600', bg: 'bg-gray-50' };
        }
    };

    // Parse location JSON if needed
    const parseLocation = (locationString?: string | null) => {
        if (!locationString) return '';
        try {
            const parsed = JSON.parse(locationString);
            return parsed.processed?.replace(/<[^>]*>/g, '').trim() || '';
        } catch {
            return locationString;
        }
    };

    if (isLoading) {
        return <DetailPageSkeleton />;
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#181D27] mb-2">Project not found</h2>
                    <p className="text-[#535862] mb-4">The project you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="px-6 py-2 bg-[#F89822] text-white rounded-lg hover:bg-[#E0891E] transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    // Extract data from project
    const country = project.countries?.[0]?.countries_id.name || 'N/A';
    const countrySlug = project.countries?.[0]?.countries_id.drupal_key || '';
    const region = project.regions?.[0]?.regions_id.name || '';
    const fullLocation = region ? `${country}, ${region}` : country;
    const sectors = project.sectors?.map(s => s.sectors_id.name).join(', ') || 'N/A';
    const projectTypes = project.types?.map(t => t.types_id.name) || [];
    const specificLocation = parseLocation(project.location);

    const countryMapImage = countrySlug
        ? countryMapImages[countrySlug.toLowerCase()] || ''
        : '';

    const imageUrl = project.featured_image?.filename_disk
        ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project.featured_image.filename_disk}`
        : '/images/null-image.svg';

    // Organize companies by role
    const companyRoles = [
        { key: 'client_owner', label: 'Client/Owner' },
        { key: 'developer', label: 'Developer' },
        { key: 'main_contractor', label: 'Main Contractor' },
        { key: 'architect', label: 'Architect' },
        { key: 'civil_engineer', label: 'Civil Engineer' },
        { key: 'structural_engineer', label: 'Structural Engineer' },
        { key: 'mep_engineer', label: 'MEP Engineer' },
        { key: 'design_consultant', label: 'Design Consultant' },
        { key: 'study_consultant', label: 'Study Consultant' },
        { key: 'quantity_surveyor', label: 'Quantity Surveyor' },
    ];

    const hasAnyCompanies = companyRoles.some(role => {
        const companies = project[role.key as keyof typeof project] as any[];
        return companies && companies.length > 0;
    });

    return (
        <div className="min-h-screen bg-white">
            <section className='pt-14 px-0 md:px-10 lg:px-20'>
                <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                    {project.title}
                </h2>
                <div className='flex flex-wrap items-center gap-1 md:gap-0'>
                    <p className='text-sm text-[#535862] mr-0 md:mr-3'>Go to:</p>
                    <a href="#overview" className='text-sm text-[#E0891E] underline px-2 md:px-3'>Overview</a>
                    {hasAnyCompanies && (
                        <a href="#companies" className='text-sm text-[#E0891E] underline px-2 md:px-3 border-x border-[#E9EAEB]'>Companies and Contacts</a>
                    )}
                    <a href="#milestones" className='text-sm text-[#E0891E] underline px-2 md:px-3'>Milestones</a>
                </div>
            </section>

            <section className='py-10 px-0 md:px-10 lg:px-20'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14'>
                    <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-10'>
                        {/* Quick Info */}
                        <div id="overview">
                            <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                                Quick info
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <GrLocation size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Location</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">{fullLocation}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <IoBagOutline size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Sector</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">{sectors}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <PiCurrencyCircleDollar size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Value</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">{formatCurrency(project.contract_value_usd)}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiTrello size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Stage</span>
                                    </div>
                                    {project.current_stage ? (
                                        <div className="ml-7">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getStageStyles(mapStatusToGroup(project.current_stage)).bg}`}>
                                                <div className={`w-2 h-2 rounded-full ${getStageStyles(mapStatusToGroup(project.current_stage)).dot}`}></div>
                                                <span className={`text-base font-medium ${getStageStyles(mapStatusToGroup(project.current_stage)).text}`}>
                                                    {mapStatusToStageName(project.current_stage)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-base text-[#181D27] ml-7">N/A</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Overview */}
                        {(project.description || project.summary || project.meta_description) && (
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Overview
                                </h3>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-base text-[#535862] leading-relaxed whitespace-pre-line'>
                                        {project.description || project.summary || project.meta_description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Capacities */}
                        {(project.gross_floor_area_m2 ||
                            project.volume_concrete_m3 ||
                            (project.total_built_up_area_m2 && project.total_built_up_area_m2.length > 0) ||
                            (project.road_km && project.road_km.length > 0) ||
                            (project.rail_km && project.rail_km.length > 0)) && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                                        Specifications
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                                        {project.gross_floor_area_m2 && (
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <RxDashboard size={18} className="text-[#535862]" />
                                                    <span className="text-base text-[#535862]">Floor area</span>
                                                </div>
                                                <span className="text-base text-[#181D27] ml-7">{project.gross_floor_area_m2.toLocaleString()} m²</span>
                                            </div>
                                        )}

                                        {project.volume_concrete_m3 && (
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <RxDashboard size={18} className="text-[#535862]" />
                                                    <span className="text-base text-[#535862]">Concrete volume</span>
                                                </div>
                                                <span className="text-base text-[#181D27] ml-7">{project.volume_concrete_m3.toLocaleString()} m³</span>
                                            </div>
                                        )}

                                        {project.road_km && project.road_km.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <LuBuilding size={18} className="text-[#535862]" strokeWidth={1.5} />
                                                    <span className="text-base text-[#535862]">Road length</span>
                                                </div>
                                                <span className="text-base text-[#181D27] ml-7">{project.road_km[0]} km</span>
                                            </div>
                                        )}

                                        {project.rail_km && project.rail_km.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <LuBuilding size={18} className="text-[#535862]" strokeWidth={1.5} />
                                                    <span className="text-base text-[#535862]">Rail length</span>
                                                </div>
                                                <span className="text-base text-[#181D27] ml-7">{project.rail_km[0]} km</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* Companies and Contacts */}
                        {hasAnyCompanies && (
                            <div id="companies">
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                                    Companies and Contacts
                                </h3>

                                {companyRoles.map(role => {
                                    const companies = project[role.key as keyof typeof project] as any[];
                                    if (!companies || companies.length === 0) return null;

                                    return companies.map((companyRelation, index) => {
                                        const company = companyRelation.companies_id;
                                        if (!company) return null;

                                        return (
                                            <div
                                                key={`${role.key}-${index}`}
                                                className='flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 border-b border-[#E9EAEB] pb-6 md:py-8'
                                            >
                                                <h4 className='text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>
                                                    {role.label}
                                                </h4>
                                                <div className='md:col-span-2'>
                                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>{company.name}</p>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                        {company.website && (
                                                            <div className='flex items-center gap-2'>
                                                                <IoEarthOutline size={18} color="#535862" />
                                                                <a href={company.website} target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                                    {company.website}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {company.phone && (
                                                            <div className='flex items-center gap-2'>
                                                                <FiPhone size={18} color="#535862" />
                                                                <a href={`tel:${company.phone}`} className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                                    {company.phone}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {company.email && (
                                                            <div className='flex items-center gap-2'>
                                                                <CiMail size={18} color="#535862" />
                                                                <a href={`mailto:${company.email}`} className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                                    {company.email}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {company.facebook && (
                                                            <div className='flex items-center gap-2'>
                                                                <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                                                <a href={company.facebook} target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                                    {company.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {company.linkedin && (
                                                            <div className='flex items-center gap-2'>
                                                                <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                                                <a href={company.linkedin} target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                                    {company.name}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })}
                            </div>
                        )}

                        {/* Milestones */}
                        <div id="milestones">
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                                Key Dates
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {project.project_launch_at && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Project Launched</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.project_launch_at)}</p>
                                    </div>
                                )}
                                {project.main_contract_tender_issue_date && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Tender Issued</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.main_contract_tender_issue_date)}</p>
                                    </div>
                                )}
                                {project.main_contract_bid_submission_date && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Bid Submission</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.main_contract_bid_submission_date)}</p>
                                    </div>
                                )}
                                {project.contract_awarded_at && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Contract Awarded</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.contract_awarded_at)}</p>
                                    </div>
                                )}
                                {project.construction_start_date && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Construction Started</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.construction_start_date)}</p>
                                    </div>
                                )}
                                {project.construction_completion_date && (
                                    <div className="border-b border-[#E9EAEB] pb-3">
                                        <p className="text-sm font-medium text-[#717680] mb-1">Expected Completion</p>
                                        <p className="text-base text-[#181D27]">{formatDate(project.construction_completion_date)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                        <div className='flex flex-col gap-6 lg:gap-10'>
                            {/* Featured Image */}
                            <div className='w-full h-[240px]'>
                                <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={project.title} />
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Location
                                </h3>
                                <p className='text-base text-[#535862] mb-2 leading-relaxed'>{fullLocation}</p>
                                {countryMapImage && (
                                    <div className='w-full h-[240px]'>
                                        <img
                                            src={countryMapImage}
                                            alt={`Map of ${country}`}
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                )}
                                {specificLocation && (
                                    <p className='text-sm text-[#717680] mt-1'>{specificLocation}</p>
                                )}
                            </div>

                            {/* Sector */}
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Sector
                                </h3>
                                <p className='text-base text-[#535862] mb-3 leading-relaxed'>{sectors}</p>
                                {projectTypes.length > 0 && (
                                    <div className='flex flex-col gap-2 pt-2 border-t border-[#E9EAEB]'>
                                        {projectTypes.map((type, index) => (
                                            <p key={index} className='text-base text-[#535862] leading-relaxed'>
                                                {type}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Stage */}
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                                    Stage
                                </h3>
                                {project.current_stage ? (
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getStageStyles(mapStatusToGroup(project.current_stage)).bg}`}>
                                        <div className={`w-2 h-2 rounded-full ${getStageStyles(mapStatusToGroup(project.current_stage)).dot}`}></div>
                                        <span className={`text-base font-medium ${getStageStyles(mapStatusToGroup(project.current_stage)).text}`}>
                                            {mapStatusToStageName(project.current_stage)}
                                        </span>
                                    </div>
                                ) : (
                                    <p className='text-base text-[#535862] leading-relaxed'>N/A</p>
                                )}
                            </div>

                            {/* Value */}
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                                    Value
                                </h3>
                                <p className='text-base text-[#535862] leading-relaxed'>
                                    {formatCurrency(project.contract_value_usd)}
                                </p>
                                {project.value_range && (
                                    <p className='text-sm text-[#717680] mt-1'>Range: ${project.value_range}M USD</p>
                                )}
                            </div>

                            {/* Links */}
                            {(project.website || project.email || project.linkedin || project.facebook) && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                                        Links
                                    </h3>
                                    <div className='flex flex-col gap-3'>
                                        {project.website && (
                                            <div className='flex items-center gap-2'>
                                                <IoEarthOutline size={18} color="#535862" />
                                                <a href={project.website} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {project.website}
                                                </a>
                                            </div>
                                        )}
                                        {project.email && (
                                            <div className='flex items-center gap-2'>
                                                <CiMail size={18} color="#535862" />
                                                <a href={`mailto:${project.email}`} className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {project.email}
                                                </a>
                                            </div>
                                        )}
                                        {project.linkedin && (
                                            <div className='flex items-center gap-2'>
                                                <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                                <a href={project.linkedin} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                    LinkedIn
                                                </a>
                                            </div>
                                        )}
                                        {project.facebook && (
                                            <div className='flex items-center gap-2'>
                                                <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                                <a href={project.facebook} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                    Facebook
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;