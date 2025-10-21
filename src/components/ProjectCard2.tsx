import React from "react";
import { FiArrowUpRight, FiLock } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface ProjectCard2Props {
    id: number;
    image: string;
    region: string;
    title: string;
    description: string;
    author: string;
    date: string;
    isPaid?: boolean;
    linkPath?: string;
}

const ProjectCard2: React.FC<ProjectCard2Props> = ({
    image,
    region,
    title,
    description,
    author,
    date,
    isPaid = false,
    linkPath,
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
                <div className="relative h-[260px] overflow-hidden rounded-xl">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {isPaid && (
                    <span className='w-[32px] h-[32px] bg-white flex justify-center items-center border border-[#E9EAEB] rounded-full absolute top-3 left-3'>
                        <FiLock color='#E0891E' size={12} />
                    </span>
                )}
            </div>

            <div className="p-4 relative">
                <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">{region}</span>
                <div className="flex items-start gap-2">
                    <h3 className="font-semibold flex-1 text-[#181D27] text-base md:text-lg mb-2 line-clamp-2 leading-tight group-hover:text-[#F89822] transition-colors duration-200">
                        {title}
                    </h3>
                    <div className="cursor-pointer">
                        <FiArrowUpRight color="#A4A7AE" size={20} />
                    </div>
                </div>
                <p className="text-[#535862] text-sm md:text-base mb-3 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center gap-2">
                    <div className="w-[38px] h-[38px] bg-[#F5F5F5] border border-[#E9EAEB] rounded-full flex items-center justify-center">
                        <LuUser color="#A4A7AE" size={25} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#181D27] text-sm font-medium">{author}</span>
                        <span className="text-[#535862] text-xs font-normal">{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard2;
