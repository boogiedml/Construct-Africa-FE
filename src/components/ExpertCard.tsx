import React from "react";

interface ExpertCardProps {
    expertImage: string;
    expertName: string;
    title: string;
    opinion: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
    expertImage,
    expertName,
    title,
    opinion,
}) => {
    return (
        <div className="md:px-16 flex flex-col gap-4 md:gap-6 bg-white py-10">
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

            <p className="text-center text-[#535862] text-base leading-relaxed">
                {opinion}
            </p>
        </div>
    );
};

export default ExpertCard;
