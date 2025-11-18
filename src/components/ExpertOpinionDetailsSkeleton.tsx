import React from 'react';

const ExpertOpinionDetailsSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section Skeleton */}
            <section className="pt-10 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto animate-pulse">
                    <div className="h-6 md:h-7 lg:h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-10"></div>
                </div>
            </section>

            {/* Main Content Section Skeleton */}
            <section className="px-4 sm:px-6 lg:px-10 xl:px-20 pb-10">
                <div className="max-w-4xl mx-auto">
                    {/* Featured Image Skeleton */}
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg bg-gray-200 mb-8 md:mb-12 animate-pulse"></div>

                    {/* Bio Content Skeleton */}
                    <div className="space-y-4 mb-8 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>

                    {/* Expert Opinion Section Skeleton */}
                    <div className="mb-8 animate-pulse">
                        <div className="h-6 md:h-7 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>

                    {/* Areas of Expertise Skeleton */}
                    <div className="mb-8 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-40 mb-3"></div>
                        <div className="flex flex-wrap gap-2">
                            <div className="h-7 bg-gray-200 rounded-full w-24"></div>
                            <div className="h-7 bg-gray-200 rounded-full w-32"></div>
                            <div className="h-7 bg-gray-200 rounded-full w-28"></div>
                            <div className="h-7 bg-gray-200 rounded-full w-20"></div>
                        </div>
                    </div>

                    {/* Photo Caption Skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-48 mb-12 animate-pulse"></div>

                    {/* Expert Profile Card Skeleton */}
                    <div className="max-w-4xl mx-auto border-y border-[#E9EAEB] py-8 mb-10">
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 animate-pulse">
                            {/* Profile Image Skeleton */}
                            <div className="flex-shrink-0">
                                <div className="w-[120px] h-[120px] rounded-full bg-gray-200"></div>
                            </div>

                            {/* Profile Info Skeleton */}
                            <div className="flex-1 space-y-4">
                                <div className="h-6 md:h-7 bg-gray-200 rounded w-48"></div>
                                
                                {/* Position Skeleton */}
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                                </div>

                                {/* Title Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>

                                {/* Contact Info Skeleton */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                </div>

                                {/* Social Links Skeleton */}
                                <div className="flex items-center gap-4">
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExpertOpinionDetailsSkeleton;

