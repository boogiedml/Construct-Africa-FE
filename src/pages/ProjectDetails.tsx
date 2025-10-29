import { useParams } from 'react-router-dom';
import { FiLinkedin, FiPhone, FiTrello } from 'react-icons/fi';
import { IoBagOutline, IoEarthOutline } from 'react-icons/io5';
import { GrLocation } from 'react-icons/gr';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { SlSocialFacebook } from 'react-icons/sl';
import { LuBuilding } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    return (
        <div className="min-h-screen bg-white">
            <section className='pt-14 px-0 md:px-10 lg:px-20'>
                <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">Marassi Red Sea, Egypt</h2>
                <div className='flex flex-wrap items-center gap-1 md:gap-0'>
                    <p className='text-sm text-[#535862] mr-0 md:mr-3'>Go to:</p>
                    <span className='text-sm text-[#E0891E] underline px-2 md:px-3'>Overview</span>
                    <span className='text-sm text-[#E0891E] underline px-2 md:px-3 border-x border-[#E9EAEB]'>Companies and Contacts</span>
                    <span className='text-sm text-[#E0891E] underline px-2 md:px-3'>News and Updates</span>
                </div>
            </section>

            <section className='py-10 px-0 md:px-10 lg:px-20'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14'>
                    <div className='lg:col-span-2 flex flex-col gap-8 lg:gap-10'>
                        <div className=''>
                            <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">Quick info</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <GrLocation size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Location</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">Egypt, North Africa</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <IoBagOutline size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Sector</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">Transport/Infrastructure</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <PiCurrencyCircleDollar size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Value</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">$149.5 mn</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <FiTrello size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Stage</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">Design</span>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Overview</h3>
                            <div className='flex flex-col gap-4'>
                                <p className='text-base text-[#535862] leading-relaxed'>
                                    The development spans 2,426 feddans and is located 30 minutes from Hurghada International Airport. It represents a strategic collaboration between Emaar Misr, a subsidiary of UAE-based Emaar Properties, and the Al-Sharbatly Group, and is designed to transform the Red Sea region into a premier global tourism and investment hub. The project draws inspiration from the success of Marassi North Coast.
                                </p>
                                <p className='text-base text-[#535862] leading-relaxed'>
                                    Red Sea Marassi will bring tourism and leisure components to the area. The development features a 1.5-kilometer seafront with a private beach, swimmable lagoons, and an international-standard marina. It will also include internal waterways and 400 meters of sea docks, in addition to 12 luxury hotels, Maldives-style floating cabins, and over 500 waterfront shops and restaurants. The master plan further integrates schools, hospitals, an international convention center, and a wide range of sports and entertainment facilities, creating a fully self-contained destination.
                                </p>
                            </div>
                        </div>

                        <div className=''>
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">Capacities</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <RxDashboard size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Land area</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">2,426 feddans</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <RxDashboard size={18} className="text-[#535862]" />
                                        <span className="text-base text-[#535862]">Built up area</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">1,000,000 m²</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <LuBuilding size={18} className="text-[#535862]" strokeWidth={1.5} />
                                        <span className="text-base text-[#535862]">Apartments</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">500,000 m²</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <LuBuilding size={18} className="text-[#535862]" strokeWidth={1.5} />
                                        <span className="text-base text-[#535862]">Hotel rooms</span>
                                    </div>
                                    <span className="text-base text-[#181D27] ml-7">2,000</span>
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">Companies and Contacts</h3>

                            <div className='flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 border-b border-[#E9EAEB] pb-6 md:py-8'>
                                <h4 className='text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>Developer</h4>
                                <div className='md:col-span-2'>
                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>Emaar Misr</p>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <IoEarthOutline size={18} color="#535862" />
                                            <a href='https://emaarmisr.com' target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                https://emaarmisr.com
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiPhone size={18} color="#535862" />
                                            <a href='tel:+201234567890' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                +20 123 456 7890
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 border-b border-[#E9EAEB] pb-6 md:py-8'>
                                <h4 className='text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>Contractor</h4>
                                <div className='md:col-span-2'>
                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>Al-Sharbatly Group</p>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <IoEarthOutline size={18} color="#535862" />
                                            <a href='https://emaarmisr.com' target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                https://emaarmisr.com
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiPhone size={18} color="#535862" />
                                            <a href='tel:+201234567890' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                +20 123 456 7890
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 pb-0 md:py-8'>
                                <h4 className='text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>Project Manager</h4>
                                <div className='md:col-span-2'>
                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>Jorge Martinez</p>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <IoEarthOutline size={18} color="#535862" />
                                            <a href='https://emaarmisr.com' target='_blank' rel='noopener noreferrer' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                https://emaarmisr.com
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiPhone size={18} color="#535862" />
                                            <a href='tel:+201234567890' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                +20 123 456 7890
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                            <a href='#' className='text-base leading-relaxed text-[#535862] hover:text-[#E0891E] transition-colors'>
                                                Emaar Misr
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-4 md:mb-6 leading-tight">News and Updates</h3>

                            <div className='flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-0 border-b border-[#E9EAEB] pb-6 md:py-8'>
                                <h4 className='text-sm md:text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>09 Sep 2025</h4>
                                <div className='md:col-span-2'>
                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>Egypt launches LE 900 B Red Sea Marassi project</p>
                                    <p className='text-base text-[#535862] leading-relaxed'>
                                        Prime Minister Mostafa Madbouly attended the signing of partnership agreements between Emaar Misr and City Stars to launch the Red Sea Marassi project on the Hurghada coast, with investments estimated at LE 900 billion.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-0 pb-0 md:py-8'>
                                <h4 className='text-sm md:text-base text-[#535862] leading-relaxed md:text-center font-medium md:font-normal'>09 Sep 2025</h4>
                                <div className='md:col-span-2'>
                                    <p className='text-lg font-semibold text-[#181D27] mb-3'>Egypt launches LE 900 B Red Sea Marassi project</p>
                                    <p className='text-base text-[#535862] leading-relaxed'>
                                        Prime Minister Mostafa Madbouly attended the signing of partnership agreements between Emaar Misr and City Stars to launch the Red Sea Marassi project on the Hurghada coast, with investments estimated at LE 900 billion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                        <div className='flex flex-col gap-6 lg:gap-10'>
                            <div className='w-full h-[240px]'>
                                <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071" alt="" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Location</h3>
                                <p className='text-base text-[#535862] mb-4 leading-relaxed'>Egypt, North Africa</p>
                                <div className='w-full h-[240px]'>
                                    <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1577086664693-894d8405334a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900" alt="" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Sector</h3>
                                <p className='text-base text-[#535862] mb-3 leading-relaxed'>Buildings</p>
                                <div className='flex flex-col gap-2 pt-2 border-t border-[#E9EAEB]'>
                                    <p className='text-base text-[#535862] leading-relaxed'>Mixed-use</p>
                                    <p className='text-base text-[#535862] leading-relaxed'>Hospitality</p>
                                    <p className='text-base text-[#535862] leading-relaxed'>Housing</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">Stage</h3>
                                <p className='text-base text-[#535862] leading-relaxed'>Design</p>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">Value</h3>
                                <p className='text-base text-[#535862] leading-relaxed'>$149.5 (USD million)</p>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">Milestones</h3>
                                <div className='flex flex-col gap-3'>
                                    <div className='border-b border-[#E9EAEB] pb-2'>
                                        <p className='text-sm font-medium text-[#717680] mb-1'>Launched:</p>
                                        <p className='text-base text-[#535862]'>18 September 2025</p>
                                    </div>
                                    <div className='border-b border-[#E9EAEB] pb-2'>
                                        <p className='text-sm font-medium text-[#717680] mb-1'>Construction started:</p>
                                        <p className='text-base text-[#535862]'>01 April 2026</p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-[#717680] mb-1'>Estimated completion:</p>
                                        <p className='text-base text-[#535862]'>01 December 2036</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">Links</h3>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <IoEarthOutline size={18} color="#535862" />
                                        <a href='https://merassibuild.com' target='_blank' rel='noopener noreferrer' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                            https://merassibuild.com
                                        </a>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <CiMail size={18} color="#535862" />
                                        <a href='mailto:info@merassibuild.com' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                            info@merassibuild.com
                                        </a>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FiLinkedin size={18} color="#535862" strokeWidth={1} />
                                        <a href='#' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                            Merassi Red Sea
                                        </a>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <SlSocialFacebook size={18} color="#535862" strokeWidth={0.5} />
                                        <a href='#' className='text-base text-[#535862] hover:text-[#E0891E] transition-colors'>
                                            Merassi Red Sea
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;

