import { FaRegCircleCheck } from 'react-icons/fa6'
import { FiUsers, FiBriefcase } from 'react-icons/fi'
import { IoBookOutline } from 'react-icons/io5'
import ActionButton from '../components/ActionButton'

const PublicNewsDetails = () => {
    return (
        <div className="min-h-screen bg-white">
            <section>
                <div className="py-10  max-md:pt-14 md:py-16 lg:py-20 max-w-5xl mx-auto text-center px-5 sm:px-10 lg:px-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Construction intelligence for smarter decisions</h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed max-w-2xl mx-auto">
                        Your one-stop-shop for information and actionable intelligence on the construction and infrastructure pipeline in African countries
                    </p>
                    <div className='flex justify-center'>
                        <ActionButton buttonText="Subscribe to Projects" width="fit" paddingX="px-6" />
                    </div>
                </div>
            </section>

            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center pb-10 md:pb-16 lg:pb-20'>
                <div className='flex-1 px-4 sm:px-6 lg:px-10 lg:pl-20 lg:pr-0 order-2 lg:order-1'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <FiBriefcase size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">Pipeline Platform tracking construction and infrastructure project opportunities across Africa</h2>
                        <p className="text-base sm:text-lg text-[#535862] leading-relaxed text-center lg:text-left">
                            Get real-time updates on construction projects in Africa.
                        </p>

                        <ul className='mt-6 sm:mt-8 space-y-4 sm:space-y-6'>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Identify new project leads</p>
                            </li>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Find key companies</p>
                            </li>
                            <li className='flex items-center gap-3 sm:gap-4'>
                                <FaRegCircleCheck size={24} color='#F89822' className="flex-shrink-0" />
                                <p className='text-base sm:text-lg text-[#535862] leading-relaxed'>Access key contact details</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex-1 order-1 lg:order-2'>
                    <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-none sm:rounded-l-2xl'>
                        <img className='w-full h-full object-cover' src="/images/01screen-mockup.svg" alt="" />
                    </div>
                </div>
            </section>
            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center py-10 md:py-16 lg:py-20'>
                <div className='flex-1 order-1 lg:order-1'>
                    <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-none sm:rounded-r-2xl'>
                        <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1760932334268-7a88a6fdd612?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070" alt="" />
                    </div>
                </div>
                <div className='flex-1 px-4 sm:px-6 lg:px-10 lg:pr-20 lg:pl-0 order-2 lg:order-2'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <FiUsers size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">Access to contact details of developers, contractors, and consultants on construction projects in Africa.</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed text-center lg:text-left">
                            Connect with key companies and people involved in construction & infrastructure projects in Africa,
                        </p>
                    </div>
                </div>
            </section>

            <section className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center pb-10 md:pb-16 lg:pb-20'>
                <div className='flex-1 px-4 sm:px-6 lg:px-10 lg:pl-20 lg:pr-0 order-2 lg:order-1'>
                    <div className='max-w-xl mx-auto lg:mx-0'>
                        <div className='mb-4 sm:mb-6 bg-[#F4EBFF] border-8 border-[#F9F5FF] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full mx-auto lg:mx-0'>
                            <IoBookOutline size={16} color='#F89822' />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight text-center lg:text-left">News, analysis and commentary to keep up-to-date with the construction landscape in Africa</h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed text-center lg:text-left">
                            News updates and feature stories related to construction, infrastructure and the built environment in African countries
                        </p>
                    </div>
                </div>
                <div className='flex-1 order-1 lg:order-2'>
                    <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-none sm:rounded-l-2xl'>
                        <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1760932334268-7a88a6fdd612?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PublicNewsDetails