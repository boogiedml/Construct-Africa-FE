import React from 'react';
import ProjectCard from './ProjectCard';

export interface StageItem {
    id: number | string;
    image?: string;
    status?: string;
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
}

const StageView: React.FC<StageViewProps> = ({
    data,
    stageKey = 'stage',
    className = '',
    onProjectClick
}) => {
    const stages = ['Study', 'Design', 'Bid', 'Build'];

    // const getStageColor = (stage: string) => {
    //     switch (stage.toLowerCase()) {
    //         case 'study':
    //             return 'bg-blue-50 border-blue-200';
    //         case 'design':
    //             return 'bg-purple-50 border-purple-200';
    //         case 'bid':
    //             return 'bg-orange-50 border-orange-200';
    //         case 'build':
    //             return 'bg-green-50 border-green-200';
    //         default:
    //             return 'bg-gray-50 border-gray-200';
    //     }
    // };

    const getItemsByStage = (stage: string) => {
        return data.filter(item =>
            (item[stageKey as keyof StageItem] as string)?.toLowerCase() === stage.toLowerCase()
        );
    };

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

            {/* Stage Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stages.map((stage) => {
                    const items = getItemsByStage(stage);

                    return (
                        <div key={stage} className="space-y-4">
                            {/* Stage Header */}
                            {/* <div className={`p-4 rounded-lg border-2 ${getStageColor(stage)}`}>
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">{stage}</h3>
                                <p className="text-sm text-gray-600">{items.length} items</p>
                            </div> */}

                            {/* Stage Items */}
                            <div className="space-y-4">
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <ProjectCard
                                            key={item.id}
                                            image={item.image}
                                            status={item.status}
                                            title={item.title}
                                            description={item.description}
                                            location={item.location}
                                            category={item.category}
                                            value={item.value}
                                            isFavorite={item.isFavorite}
                                            deadline={item.deadline}
                                            onClick={() => onProjectClick?.(item.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                        <p className="text-sm">No items in this stage</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StageView;
