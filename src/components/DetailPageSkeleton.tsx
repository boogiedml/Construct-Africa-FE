import React from 'react';

interface DetailPageSkeletonProps {
    showSidebar?: boolean;
    className?: string;
}

const DetailPageSkeleton: React.FC<DetailPageSkeletonProps> = ({
    showSidebar = true,
    className = ''
}) => {
    return (
        <div className={`min-h-screen bg-white ${className}`}>
            <section className='pt-14 px-0 md:px-10 lg:px-20'>
                {/* Title Skeleton */}
                <div className="mb-4">
                    <div className="h-7 md:h-8 lg:h-9 bg-gray-200 rounded w-3/4 md:w-1/2 animate-pulse"></div>
                </div>

                {/* Navigation Links Skeleton */}
                <div className='flex flex-wrap items-center gap-1 md:gap-0 mb-6'>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
            </section>

            <section className='py-10 px-0 md:px-10 lg:px-20'>
                <div className={`grid grid-cols-1 ${showSidebar ? 'lg:grid-cols-3' : ''} gap-8 lg:gap-14`}>
                    {/* Main Content */}
                    <div className={`${showSidebar ? 'lg:col-span-2' : ''} flex flex-col gap-8 lg:gap-10`}>
                        {/* Section Headers and Content */}
                        {Array.from({ length: 4 }).map((_, sectionIndex) => (
                            <div key={sectionIndex}>
                                {/* Section Title */}
                                <div className="mb-4 md:mb-6">
                                    <div className="h-6 md:h-7 lg:h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                                </div>

                                {/* Content Grid */}
                                {sectionIndex === 0 ? (
                                    // Quick Info Grid
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                                        {Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index} className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                                </div>
                                                <div className="h-5 bg-gray-200 rounded w-24 ml-7 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : sectionIndex === 1 ? (
                                    // Text Content
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                ) : sectionIndex === 2 ? (
                                    // Grid Content
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="border-b border-[#E9EAEB] pb-3">
                                                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // List Items
                                    <div className="space-y-4">
                                        {Array.from({ length: 2 }).map((_, index) => (
                                            <div key={index} className="border-b border-[#E9EAEB] pb-6">
                                                <div className="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    {showSidebar && (
                        <aside className='lg:col-span-1 mt-8 lg:mt-20'>
                            <div className='flex flex-col gap-6 lg:gap-10'>
                                {/* Image Skeleton */}
                                <div className='w-full h-[240px] bg-gray-200 rounded-lg animate-pulse'></div>

                                {/* Sidebar Sections */}
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index}>
                                        <div className="h-6 md:h-7 lg:h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                                        {index === 1 && (
                                            <div className="space-y-2 pt-2 border-t border-[#E9EAEB]">
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Links Skeleton */}
                                <div>
                                    <div className="h-6 md:h-7 lg:h-8 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
                                    <div className='flex flex-col gap-3'>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DetailPageSkeleton;

