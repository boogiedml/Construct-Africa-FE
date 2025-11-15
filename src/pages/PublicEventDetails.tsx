import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
import { ProjectCard } from '../components'
import { recentProjects } from '../data/home.data'
import { MdVerified } from 'react-icons/md'

const PublicEventDetails = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className='pt-10 px-5 sm:px-10 lg:px-20 mb-8'>
                <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Nigeria Committed To High-Speed Rail Construction</h2>
                <p className='text-sm text-[#535862] leading-relaxed'>West Africa - Nigeria - Transport/Infrastructure</p>
            </section>

            <section className='py-10 px-5 sm:px-10 lg:px-20 sm:grid grid-cols-1 lg:grid-cols-3 gap-14'>
                <div className='col-span-2'>
                    <div className='mb-10'>
                        <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Quick info</h2>

                        {/* Quick Info Section */}
                        <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-28">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiUser size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Organizer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-base text-[#181D27] ml-7">InventU Limited</span>
                                    <MdVerified size={18} color="#F89822" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Event date</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">07:30 AM - 04:30 PM GMT, 16 Sep 2025</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <FiClock size={18} className="text-[#535862]" />
                                    <span className="text-base text-[#535862]">Location</span>
                                </div>
                                <span className="text-base text-[#181D27] ml-7">Germany</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-8 leading-tight">About</h3>
                        <div className='relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden mb-8'>
                            <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071" alt="" />
                            <div className='absolute top-0 left-0 w-full h-full bg-black/50' />
                            <img src="/images/cawatermark.svg" alt="" className='absolute top-10 left-10' />
                        </div>
                        <p className='text-sm text-[#535862] mb-5 leading-relaxed'>
                            The congress serves as a strategic platform for policymakers, industry leaders, and innovators to drive advancements in sustainable fuels, explore regulatory developments, and accelerate the transition to a low-carbon future.
                        </p>
                        <p className='text-sm text-[#535862] mb-4 leading-relaxed'>The event will feature four focused forums:</p>
                        <ul className='list-disc list-inside text-sm text-[#535862] flex flex-col gap-2 leading-relaxed'>
                            <li>5th Biogas Forum</li>
                            <li>4th Sustainable Aviation Fuels Forum</li>
                            <li>4th Biofuels Forum</li>
                            <li>4th Sustainable Maritime Fuels Forum</li>
                        </ul>
                    </div>
                </div>
                <article className='col-span-1 sticky top-20'>
                    <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">Related Events</h3>
                    <div className='flex flex-col gap-5'>
                        {recentProjects.slice(0, 2).map((project) => (
                            <ProjectCard
                                key={project.id}
                                image={project.image}
                                status={project.status}
                                title={project.title}
                                description={project.description}
                                location={project.location}
                                category={project.category}
                                value={project.value}
                                isFavorite={project.isFavorite}
                            />
                        ))}
                    </div>
                </article>
            </section>
        </div>
    )
}

export default PublicEventDetails

