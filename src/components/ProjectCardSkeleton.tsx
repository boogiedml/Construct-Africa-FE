import React from 'react';

const ProjectCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-[#E9EAEB] overflow-hidden animate-pulse">
            <div className="relative h-[160px] bg-gray-200"></div>

            <div className="p-3 md:p-4">
                <div className="flex justify-between items-center mb-3">
                    <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>

                <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>

                <div className="space-y-2 mb-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;

