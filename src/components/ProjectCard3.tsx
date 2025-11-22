import ImageWithSkeleton from "./ImageWithSkeleton";

const ProjectCard3 = ({ project }: { project: { image: string, id: string, title: string, description: string, location: string,  } }) => {
    return (
        <div style={{
            boxShadow: '0px 24px 48px -12px #0A0D122E',
        }} className='bg-white rounded-2xl duration-300 overflow-hidden group cursor-pointer'>
            <div className='group-hover:scale-105 transition-transform duration-300'>
                <ImageWithSkeleton
                    src={project.image}
                    alt={project.title}
                    className="rounded-t-2xl h-[200px] w-full"
                />
            </div>
            <div className='p-3 md:p-4'>
                <span className='text-sm font-medium text-[#E0891E] whitespace-nowrap mb-2 inline-block'>{project.location}</span>
                <h3 className='font-semibold text-[#181D27] text-base md:text-lg mb-2 line-clamp-2 leading-tight group-hover:text-[#F89822] transition-colors duration-200'>{project.title}</h3>
                <p className='text-[#535862] text-sm md:text-base mb-3 line-clamp-3 leading-relaxed'>{project.description}</p>

                <button className='text-sm font-medium text-[#F89822] whitespace-nowrap py-1 inline-block'>Read more</button>
            </div>
        </div>
    )
}

export default ProjectCard3