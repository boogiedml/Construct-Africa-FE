import { useParams, useNavigate } from 'react-router-dom';
import { FiLinkedin, FiPhone } from 'react-icons/fi';
import { IoEarthOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { SlSocialFacebook } from 'react-icons/sl';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineShare } from 'react-icons/hi';
import { useGetCompanyByIdQuery } from '../store/services/companies';
import { DetailPageSkeleton, DataTable } from '../components';
import type { TableColumn } from '../components/DataTable';
import type { Project } from '../types/project.types';
import {
    useGetCountriesQuery,
    useGetSectorsQuery
} from '../store/services/reference';
import { useMemo } from 'react';
import { cleanHtmlContent } from '../utils';

const CompanyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: companyResponse, isLoading, error } = useGetCompanyByIdQuery(id!);

    const company = companyResponse?.data;

    const { data: countriesData } = useGetCountriesQuery();
    const { data: sectorsData } = useGetSectorsQuery();

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

    const mapStatusToStatusName = (status: string): string => {
        switch ((status || '').toLowerCase()) {
            case 'conceptplanning':
            case 'studyfeasibility':
            case 'design':
            case 'eoi':
            case 'maincontractbid':
            case 'maincontractidevaluation':
                return 'Upcoming';
            case 'executionunderconstruction':
                return 'Ongoing';
            case 'onhold':
                return 'On Hold';
            case 'cancelled':
                return 'Cancelled';
            case 'complete':
                return 'Complete';
            default:
                return 'Upcoming';
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

    const projects = useMemo(() => {
        if (!company?.projects || !Array.isArray(company.projects)) return [];

        return (company.projects as unknown as Array<{ projects_id: Project }>).map((item) => {
            const project = item.projects_id;

            const countries = ((project.countries as unknown) as number[])?.map((countryId: number) => {
                const country = countriesData?.data.find(c => Number(c.id) === countryId);
                return country ? { countries_id: { name: country.name } } : null;
            }).filter((item): item is { countries_id: { name: string } } => item !== null) || [];

            const sectors = ((project.sectors as unknown) as number[])?.map((sectorId: number) => {
                const sector = sectorsData?.data.find(s => String(s.id) === String(sectorId));
                return sector ? { sectors_id: { name: sector.name } } : null;
            }).filter((item): item is { sectors_id: { name: string } } => item !== null) || [];

            return {
                ...project,
                countries,
                sectors,
                stage: mapStatusToGroup(project.current_stage),
                status: mapStatusToStatusName(project.current_stage),
                stageName: mapStatusToStageName(project.current_stage)
            };
        });
    }, [company?.projects, countriesData, sectorsData]);

    type ProjectWithStage = Project & Record<string, unknown> & {
        stage: string;
        status: string;
        stageName: string;
        countries: Array<{ countries_id: { name: string } }>;
        sectors: Array<{ sectors_id: { name: string } }>
    };

    const projectColumns: TableColumn<ProjectWithStage>[] = [
        {
            key: 'title',
            label: 'Name',
            sortable: true,
            width: '30%',
            render: (value: unknown, row: ProjectWithStage) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/projects/${row.id}`);
                    }}
                    className="text-left text-[#181D27] hover:text-[#F89822] transition-colors font-semibold"
                >
                    {value as string}
                </button>
            )
        },
        {
            key: 'sectors',
            label: 'Sector',
            sortable: true,
            width: '15%',
            render: (value: unknown) => {
                const sectors = value as { sectors_id: { name: string } }[];
                return <span className="text-sm text-[#535862]">{sectors?.map(sector => sector.sectors_id.name).join(', ') || '---'}</span>;
            }
        },
        {
            key: 'countries',
            label: 'Country',
            sortable: true,
            width: '15%',
            render: (value: unknown) => {
                const countries = value as { countries_id: { name: string } }[];
                return <span className="text-sm text-[#535862]">{countries?.map(country => country.countries_id.name).join(', ') || '---'}</span>;
            }
        },
        {
            key: 'contract_value_usd',
            label: 'Value ($mn)',
            sortable: true,
            width: '12%',
            render: (value) => {
                if (!value) return 'N/A';
                const numericValue = String(value).replace(/[^0-9.]/g, '');
                return `${parseFloat(numericValue).toLocaleString()}`;
            }
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: '12%',
            render: (value: unknown) => {
                return <span className="text-sm text-[#181D27]">{value as string || '---'}</span>;
            }
        },
        {
            key: 'stageName',
            label: 'Stage',
            sortable: true,
            width: '18%',
            render: (value: unknown, row: ProjectWithStage) => {
                const stageName = value as string;
                if (!stageName) return <span className="text-sm text-[#535862]">---</span>;

                const groupStage = row.stage;
                const stageStyles = {
                    'Build': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' },
                    'Bid': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
                    'Design': { dot: 'bg-[#2E90FA]', text: 'text-[#175CD3]', bg: 'bg-[#EFF8FF]' },
                    'Study': { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' },
                    'On Hold': { dot: 'bg-[#717680]', text: 'text-[#525866]', bg: 'bg-[#F5F5F6]' },
                    'Cancelled': { dot: 'bg-[#D92D20]', text: 'text-[#B42318]', bg: 'bg-[#FEF3F2]' },
                    'Complete': { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' }
                } as const;
                const styles = stageStyles[groupStage as keyof typeof stageStyles] || { dot: 'bg-gray-500', text: 'text-gray-600', bg: 'bg-gray-50' };
                return (
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles.bg}`}>
                        <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
                        <span className={`text-sm font-medium text-nowrap truncate ${styles.text}`}>{stageName}</span>
                    </div>
                );
            }
        }
    ];

    if (isLoading) {
        return <DetailPageSkeleton />;
    }

    if (error || !company) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#181D27] mb-2">Company not found</h2>
                    <p className="text-[#535862] mb-4">The company you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/admin/companies')}
                        className="px-6 py-2 bg-[#F89822] text-white rounded-lg hover:bg-[#E0891E] transition-colors"
                    >
                        Back to Companies
                    </button>
                </div>
            </div>
        );
    }

    const country = company.countries?.[0]?.countries_id.name || 'N/A';
    const region = (company.regions as unknown as Array<{ regions_id?: { name: string } }>)?.[0]?.regions_id?.name || '';
    const fullLocation = region ? `${country}, ${region}` : country;
    const sectors = (company.sectors as unknown as Array<{ sectors_id: { name: string } }>)?.map((s) => s.sectors_id.name).join(', ') || 'N/A';
    const roles = company.company_role ? [company.company_role] : [];

    const imageUrl = company.logo?.filename_disk
        ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${company.logo.filename_disk}`
        : 'https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071';

    return (
        <div className="min-h-screen bg-white">
            <section className='pt-14 px-0 md:px-10 lg:px-20'>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                            {company.name}
                        </h2>
                        <div className='flex flex-wrap items-center gap-1 md:gap-0'>
                            <p className='text-sm text-[#535862] mr-0 md:mr-3'>Go to:</p>
                            <a href="#overview" className='text-sm text-[#E0891E] underline px-2 md:px-3'>Overview</a>
                            <a href="#projects" className='text-sm text-[#E0891E] underline px-2 md:px-3'>Projects</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                            <AiOutlineStar size={18} className="text-[#535862]" />
                            <span className="text-sm text-[#535862]">Add to favourites</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors">
                            <HiOutlineShare size={18} className="text-[#535862]" />
                            <span className="text-sm text-[#535862]">Share</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className='py-10 px-0 md:px-10 lg:px-20'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14'>
                    <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-10'>
                        {/* Overview */}
                        <div id="overview">
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                Overview
                            </h3>
                            <div className='flex flex-col gap-4'>
                                <p className='text-base text-[#535862] leading-relaxed'>
                                    {company.description ? cleanHtmlContent(company.description) : 'No description available.'}
                                </p>
                            </div>
                        </div>

                        {/* Projects */}
                        <div id="projects">
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">
                                Projects
                            </h3>
                            <DataTable
                                data={projects as unknown as (Record<string, unknown> & { id: unknown })[]}
                                columns={projectColumns as unknown as TableColumn<Record<string, unknown> & { id: unknown }>[]}
                                onRowSelect={(rows) => console.log('Selected rows:', rows)}
                                onToggleFavorite={(row) => {
                                    console.log('Toggle favorite:', row);
                                }}
                                onRowClick={(row) => {
                                    const project = row as unknown as ProjectWithStage;
                                    navigate(`/admin/projects/${project.id}`);
                                }}
                                showCheckboxes={true}
                                showFavorites={true}
                            />
                        </div>
                    </div>

                    <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                        <div className='flex flex-col gap-6 lg:gap-10'>
                            <div className='w-full h-[240px] border border-[#E9EAEB] rounded-lg overflow-hidden flex items-center justify-center'>
                                <img className='w-[150px] object-cover rounded-lg' src={imageUrl} alt={company.name} />
                            </div>

                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Location
                                </h3>
                                <p className='text-base text-[#535862] mb-2 leading-relaxed'>{fullLocation}</p>
                                {company.map_iframe && (
                                    <div className="mt-3 w-full h-[240px] rounded-lg overflow-hidden border border-[#E9EAEB]" dangerouslySetInnerHTML={{ __html: company.map_iframe }} />
                                )}
                            </div>

                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                    Sector
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {sectors.split(', ').map((sector: string, index: number) => (
                                        <p key={index} className='text-base text-[#535862] leading-relaxed'>
                                            {sector}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {roles.length > 0 && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                        Roles
                                    </h3>
                                    <p className='text-base text-[#535862] leading-relaxed capitalize'>{roles.join(', ')}</p>
                                </div>
                            )}

                            {(company.website || company.email || company.company_email || company.linkedin || company.facebook) && (
                                <div>
                                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                                        Links
                                    </h3>
                                    <div className='flex flex-col gap-3'>
                                        {company.website && (
                                            <div className='flex items-center gap-2'>
                                                <IoEarthOutline size={18} color="#535862" />
                                                <a href={company.website} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {company.website}
                                                </a>
                                            </div>
                                        )}
                                        {(company.email || company.company_email) && (
                                            <div className='flex items-center gap-2'>
                                                <CiMail size={18} color="#535862" />
                                                <a href={`mailto:${company.email || company.company_email}`} className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {company.email || company.company_email}
                                                </a>
                                            </div>
                                        )}
                                        {company.phone && (
                                            <div className='flex items-center gap-2'>
                                                <FiPhone size={18} color="#535862" />
                                                <a href={`tel:${company.phone}`} className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {company.phone}
                                                </a>
                                            </div>
                                        )}
                                        {company.linkedin && (
                                            <div className='flex items-center gap-2'>
                                                <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                                <a href={company.linkedin} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {company.name}
                                                </a>
                                            </div>
                                        )}
                                        {company.facebook && (
                                            <div className='flex items-center gap-2'>
                                                <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                                <a href={company.facebook} target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors truncate'>
                                                    {company.name}
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

export default CompanyDetails;

