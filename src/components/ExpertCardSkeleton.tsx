import React from 'react';

const ExpertCardSkeleton: React.FC = () => {
    return (
        <div className="md:px-8 flex flex-col gap-4 md:gap-6 bg-white py-10 animate-pulse">
            <div className="flex justify-center">
                <div className="w-[120px] h-[120px] rounded-full bg-gray-200"></div>
            </div>

            <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>

            <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>

            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
        </div>
    );
};

export default ExpertCardSkeleton;

