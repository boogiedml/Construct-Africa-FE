import React from 'react';
import ProjectCardSkeleton from './ProjectCardSkeleton';

const HomeSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section Skeleton */}
            <div className="mx-auto py-5 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured News Skeleton */}
                    <div className="lg:col-span-2">
                        <div className="animate-pulse">
                            {/* Image Skeleton */}
                            <div className="h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl bg-gray-200"></div>

                            {/* Content Skeleton */}
                            <div className="mt-6 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="h-6 md:h-8 lg:h-10 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Articles Skeleton */}
                    <div className="lg:col-span-1 flex flex-col justify-between lg:items-end">
                        <div className="w-full flex flex-col gap-5 max-lg:mb-5">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <article key={index} className="animate-pulse">
                                    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                                    <div className="h-5 md:h-6 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-5 md:h-6 bg-gray-200 rounded w-4/5 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </article>
                            ))}
                        </div>
                        {/* Button Skeleton */}
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-5 mt-8">
                <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
                    {/* Recently Added Projects Section */}
                    <section className="">
                        <div className="animate-pulse mb-4">
                            <div className="h-6 bg-gray-200 rounded w-48"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ProjectCardSkeleton key={`project-skeleton-${index}`} />
                            ))}
                        </div>
                    </section>

                    {/* Tenders Section */}
                    <section>
                        <div className="animate-pulse mb-4">
                            <div className="h-6 bg-gray-200 rounded w-32"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ProjectCardSkeleton key={`tender-skeleton-${index}`} />
                            ))}
                        </div>
                    </section>

                    {/* Expert Opinions Section */}
                    <section>
                        <div className="animate-pulse mb-4">
                            <div className="h-6 bg-gray-200 rounded w-40"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div key={`expert-skeleton-${index}`} className="bg-white rounded-xl border border-[#E9EAEB] p-6 animate-pulse">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Activity Lists Skeleton */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Recently Viewed Skeleton */}
                    <div className="bg-white rounded-lg border border-[#E9EAEB] p-4 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={`viewed-skeleton-${index}`} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
                    </div>

                    {/* Favourites Skeleton */}
                    <div className="bg-white rounded-lg border border-[#E9EAEB] p-4 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={`favourite-skeleton-${index}`} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSkeleton;

