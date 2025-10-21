import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiLock, FiMapPin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ActionButton, ProjectCard } from '../components'
import { recentProjects } from '../data/home.data'
import { FaCheck } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const EventDetails = () => {
    return (
        <div className="min-h-screen bg-white">
            <section>
                <div className="pt-10 px-5 sm:px-10 lg:px-20">
                    <h2 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">InventU Fuel Evolution Congress</h2>

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
            </section>

            <section className='py-10 px-5 sm:px-10 lg:px-20 sm:grid grid-cols-1 lg:grid-cols-3 gap-20'>
                <div className='col-span-2'>
                    <div>
                        <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">Quick info</h3>
                        <p className='text-sm text-[#535862] mb-5 leading-relaxed'>
                            The congress serves as a strategic platform for policymakers, industry leaders, and innovators to drive advancements in sustainable fuels, explore regulatory developments, and accelerate the transition to a low-carbon future.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base md:text-lg lg:text-[24px] font-bitter font-semibold text-[#181D27] mb-5 leading-tight">About</h3>
                        <div className='relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden mb-8'>
                            <img className='w-full h-full object-cover' src="https://plus.unsplash.com/premium_photo-1760932334268-7a88a6fdd612?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070" alt="" />
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
                <article className='col-span-1'>
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

export default EventDetails
