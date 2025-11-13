const ProjectCard3 = ({ project }: { project: { image: string, id: string, title: string, description: string, location: string } }) => {
    return (
        <div className='bg-white rounded-2xl border border-[#E9EAEB] duration-300 overflow-hidden group cursor-pointer'>
            <div className='relative h-[200px] overflow-hidden'>
                <img src={project.image} alt={project.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
            </div>
            <div className='p-3 md:p-4'>
                <span className='text-sm font-medium text-[#E0891E] whitespace-nowrap mb-2 inline-block'>{project.location}</span>
                <h3 className='font-semibold text-[#181D27] text-base md:text-lg mb-2 line-clamp-1 leading-tight group-hover:text-[#F89822] transition-colors duration-200'>{project.title}</h3>
                <p className='text-[#535862] text-sm md:text-base mb-3 line-clamp-2 leading-relaxed'>{project.description}</p>

                <button className='text-sm font-medium text-[#F89822] whitespace-nowrap py-1 inline-block'>Read more</button>
            </div>
        </div>
    )
}

export default ProjectCard3