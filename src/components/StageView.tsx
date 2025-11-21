import React, { useRef, useCallback, useEffect } from 'react';
import ProjectCard from './ProjectCard';

export interface StageItem {
    id: number | string;
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
    stage?: string;
}

export interface StageViewProps {
    data: StageItem[];
    stageKey?: string;
    className?: string;
    onProjectClick?: (id: number | string) => void;
    toggleFavorite?: (id: number | string) => void;
}

const StageView: React.FC<StageViewProps> = ({
    data,
    stageKey = 'stage',
    className = '',
    onProjectClick,
    toggleFavorite
}) => {
    const stages = ['Study', 'Design', 'Bid', 'Build'];
    const observerRefs = useRef<Record<string, IntersectionObserver | null>>({});
    const sentinelRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const getItemsByStage = (stage: string) => {
        return data.filter(item =>
            (item[stageKey as keyof StageItem] as string)?.toLowerCase() === stage.toLowerCase()
        );
    };

    const calculateStageTotal = (stage: string): number => {
        const items = getItemsByStage(stage);
        return items.reduce((total, item) => {
            // Handle different value formats
            let numericValue = 0;
            if (typeof item.value === 'number') {
                numericValue = item.value;
            } else if (typeof item.value === 'string') {
                // Remove currency symbols, commas, and "million" text, then parse
                const cleaned = item.value.replace(/[$,\s]|million/gi, '');
                numericValue = parseFloat(cleaned) || 0;
            }
            return total + numericValue;
        }, 0);
    };

    // Format currency value
    const formatCurrency = (value: number): string => {
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}B`;
        }
        return `$${value.toFixed(0)}M`;
    };

    const handleScroll = useCallback((stage: string) => {
        const container = containerRefs.current[stage];
        const sentinel = sentinelRefs.current[stage];

        if (!container || !sentinel) return;

        const containerRect = container.getBoundingClientRect();
        const sentinelRect = sentinel.getBoundingClientRect();

        // Check if sentinel is visible within the container
        const isVisible = sentinelRect.top < containerRect.bottom && sentinelRect.bottom > containerRect.top;

        if (isVisible) {
            console.log(`Reached bottom of ${stage} stage`);
            // You can trigger load more here if needed
            // onLoadMore?.(stage);
        }
    }, []);

    useEffect(() => {
        stages.forEach((stage) => {
            const container = containerRefs.current[stage];
            if (!container) return;

            const scrollHandler = () => handleScroll(stage);
            container.addEventListener('scroll', scrollHandler);

            return () => {
                container.removeEventListener('scroll', scrollHandler);
            };
        });
    }, [stages, handleScroll]);

    return (
        <div className={`w-full ${className}`}>
            {/* Stage Navigation */}
            <div className="bg-[#535862] rounded-lg p-4 mb-6">
                <div className="grid grid-cols-4 gap-8">
                    {stages.map((stage, index) => {
                        const items = getItemsByStage(stage);
                        const isLast = index === stages.length - 1;

                        return (
                            <div className="flex items-center justify-between" key={stage}>
                                <div className="flex items-center">
                                    <div className="text-white font-medium text-sm">
                                        {stage} ({items.length})
                                    </div>
                                </div>
                                {!isLast && (
                                    <div className="text-white mx-2">
                                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                                            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Stage Columns - Fixed height with independent scrolling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stages.map((stage) => {
                    const items = getItemsByStage(stage);
                    const totalValue = calculateStageTotal(stage);

                    return (
                        <div key={stage} className="flex flex-col">
                            <div className="text-sm md:text-4xl font-semibold text-gray-800 mb-4 text-center">
                                {formatCurrency(totalValue)}
                            </div>
                            {/* Scrollable container for each stage */}
                            <div
                                ref={(el) => (containerRefs.current[stage] = el)}
                                className="overflow-y-auto hide-scrollbar pr-2"
                                style={{
                                    height: 'calc(100vh - 280px)',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#cbd5e0 #f1f1f1'
                                }}
                            >
                                <div className="space-y-4">
                                    {items.length > 0 ? (
                                        <>
                                            {items.map((item) => (
                                                <ProjectCard
                                                    key={item.id}
                                                    image={item.image}
                                                    status={item.status}
                                                    stageName={item.stageName}
                                                    stageGroup={item.stageGroup}
                                                    title={item.title}
                                                    description={item.description}
                                                    location={item.location}
                                                    category={item.category}
                                                    value={item.value}
                                                    isFavorite={item.isFavorite}
                                                    deadline={item.deadline}
                                                    onClick={() => onProjectClick?.(item.id)}
                                                    toggleFavorite={() => toggleFavorite?.(item.id)}
                                                />
                                            ))}

                                            {/* Intersection Observer Sentinel */}
                                            <div
                                                ref={(el) => (sentinelRefs.current[stage] = el)}
                                                className="h-4"
                                            />
                                        </>
                                    ) : (
                                        <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                            <p className="text-sm">No items in this stage</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StageView;
