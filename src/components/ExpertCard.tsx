import React from "react";
import { useNavigate } from "react-router-dom";
import ExpertCardSkeleton from "./ExpertCardSkeleton";

interface ExpertCardProps {
    expertImage: string;
    expertName: string;
    title: string;
    opinion: string;
    expertId: string | number;
    isLoading?: boolean;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
    expertImage,
    expertName,
    title,
    opinion,
    expertId,
    isLoading = false,
}) => {
    const navigate = useNavigate();

    const handleClick = (id: number | string ) => {
        if (id) {
            navigate(`/admin/expert-opinions/${id}`);
        }
    };

    if (isLoading) {
        return (
            <ExpertCardSkeleton />
        );
    }

    return (
        <div
            className="md:px-8 flex flex-col gap-4 md:gap-6 bg-white py-10 cursor-pointer hover:bg-transparent transition-colors duration-300"
            onClick={() => handleClick(expertId)}
        >
            <div className="flex justify-center">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200">
                    <img
                        src={expertImage || "/api/placeholder/80/80"}
                        alt={expertName}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <h3 className="text-center text-[#181D27] font-medium text-lg">
                {expertName}
            </h3>

            <h4 className="text-center text-[#E0891E] font-medium text-lg leading-tight">
                {title}
            </h4>

            <p className="text-center text-[#535862] text-base leading-relaxed line-clamp-3">
                {opinion}
            </p>
        </div>
    );
};

export default ExpertCard;
