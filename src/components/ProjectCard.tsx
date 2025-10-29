import React from "react";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoBagOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";

interface ProjectCardProps {
    image?: string;
    status?: string;
    title: string;
    description?: string;
    location?: string;
    category?: string;
    value?: string | number;
    isFavorite?: boolean;
    deadline?: string;
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    image,
    status,
    title,
    description,
    location,
    category,
    value,
    isFavorite = false,
    deadline,
    onClick,
}) => {
    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case "ongoing":
                return "bg-blue-100 text-blue-800";
            case "accepting proposals":
                return "bg-green-100 text-green-800";
            case "completed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl border border-[#E9EAEB] hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
        >
            <div className="relative h-[160px] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-3 md:p-4">
                <div className="flex justify-between items-center mb-3">
                    {status && (
                        <div className="">
                            <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                    status
                                )}`}
                            >
                                {status}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {deadline && (
                            <div className="text-sm text-[#535862]">
                                {deadline}
                            </div>
                        )}
                        {isFavorite && (
                            <div className="">
                                <FaStar className="w-5 h-5 text-[#FDB022]" />
                            </div>
                        )}
                    </div>
                </div>
                <h3 className="font-semibold text-[#181D27] text-base md:text-lg mb-2 line-clamp-1 leading-tight group-hover:text-[#F89822] transition-colors duration-200">
                    {title}
                </h3>

                {description && (
                    <p className="text-[#535862] text-sm md:text-base mb-3 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}

                <div className="flex flex-col gap-2">
                    {location && (
                        <div className="flex items-center text-gray-500 text-xs">
                            <GrLocation color="#717680" size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate text-sm md:text-base text-[#535862]">{location}</span>
                        </div>
                    )}

                    {category && (
                        <div className="flex items-center text-gray-500 text-xs">
                            <IoBagOutline color="#717680" size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate text-sm md:text-base text-[#535862]">{category}</span>
                        </div>
                    )}

                    {value && (
                        <div className="flex items-center text-gray-500 text-xs">
                            <PiCurrencyCircleDollar color="#717680" size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate text-sm md:text-base text-[#535862]">{value}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
