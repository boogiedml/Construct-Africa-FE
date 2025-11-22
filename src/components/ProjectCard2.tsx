import React from "react";
import { FiCalendar } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface ProjectCard2Props {
    id: number;
    image: string;
    region: string;
    title: string;
    description: string;
    author?: string;
    date?: string;
    location?: string;
    isPaid?: boolean;
    linkPath?: string;
    isEvent?: boolean;
}

const ProjectCard2: React.FC<ProjectCard2Props> = ({
    image,
    region,
    title,
    description,
    author,
    date,
    location,
    // isPaid = false,
    linkPath,
    isEvent = false,
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (linkPath) {
            navigate(linkPath);
        }
    };

    return (
        <div className="bg-transparent overflow-hidden cursor-pointer" onClick={handleCardClick}>
            {/* Image Container */}
            <div className="relative">
                <div className="relative h-[240px] overflow-hidden rounded-2xl">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* {isPaid && (
                    <span className='w-[32px] h-[32px] bg-white flex justify-center items-center border border-[#E9EAEB] rounded-full absolute top-3 left-3'>
                        <FiLock color='#E0891E' size={12} />
                    </span>
                )} */}
            </div>

            <div className="p-4 relative">
                <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">{region}</span>
                <div className="flex items-start gap-2 mt-2">
                    <h3 className="font-semibold flex-1 text-[#181D27] text-base md:text-lg mb-2 line-clamp-2 leading-tight group-hover:text-[#F89822] transition-colors duration-200">
                        {title}
                    </h3>
                </div>
                <p className="text-[#535862] text-sm md:text-base mb-3 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {isEvent ? <div className="flex flex-col gap-2">
                    {location && (
                        <div className="flex items-center text-gray-500 text-xs">
                            <GrLocation color="#717680" size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate text-sm md:text-base text-[#535862]">{location}</span>
                        </div>
                    )}

                    {date && (
                        <div className="flex items-center text-gray-500 text-xs">
                            <FiCalendar color="#717680" size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate text-sm md:text-base text-[#535862]">{date}</span>
                        </div>
                    )}
                </div> : <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span className="text-[#181D27] text-sm md:text-base font-medium">{author}</span>
                        <span className="text-[#535862] text-sm md:text-base font-normal">{date}</span>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ProjectCard2;
