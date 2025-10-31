import React from "react";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoBagOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";

interface ProjectCardProps {
    image?: string;
    status?: string;
    stageName?: string;
    stageGroup?: string;
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
    stageName,
    stageGroup,
    title,
    description,
    location,
    category,
    value,
    isFavorite = false,
    deadline,
    onClick,
}) => {
    const getStageStyles = (group?: string) => {
        const g = group?.toLowerCase() || "";
        switch (g) {
            case "build":
                return { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' };
            case "bid":
                return { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' };
            case "design":
                return { dot: 'bg-[#2E90FA]', text: 'text-[#175CD3]', bg: 'bg-[#EFF8FF]' };
            case "study":
                return { dot: 'bg-[#AE6A19]', text: 'text-[#AE6A19]', bg: 'bg-[#FDF5E8]' };
            case "on hold":
            case "on_hold":
            case "onhold":
                return { dot: 'bg-[#717680]', text: 'text-[#525866]', bg: 'bg-[#F5F5F6]' };
            case "cancelled":
                return { dot: 'bg-[#D92D20]', text: 'text-[#B42318]', bg: 'bg-[#FEF3F2]' };
            case "complete":
                return { dot: 'bg-[#12B76A]', text: 'text-[#027A48]', bg: 'bg-[#ECFDF3]' };
            default:
                return { dot: 'bg-gray-500', text: 'text-gray-600', bg: 'bg-gray-50' };
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
                <div className="flex justify-between items-center mb-3 gap-2">
                    <div className="flex items-center gap-2 flex-1">
                        {status && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                                {status}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 flex-1 justify-end">
                        {stageName && stageGroup && (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${getStageStyles(stageGroup).bg} whitespace-nowrap`}>
                                <div className={`w-2 h-2 rounded-full ${getStageStyles(stageGroup).dot}`}></div>
                                <span className={`text-xs font-medium ${getStageStyles(stageGroup).text}`}>{stageName}</span>
                            </div>
                        )}
                        {deadline && (
                            <div className="text-sm text-[#535862] whitespace-nowrap">
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
