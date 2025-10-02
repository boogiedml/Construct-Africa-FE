import React from 'react';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
    size?: 'sm' | 'md' | 'lg';
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
    className = '',
    variant = 'default',
    size = 'md'
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-2 py-1 text-xs';
            case 'lg':
                return 'px-4 py-3 text-base';
            default:
                return 'px-3 py-2 text-sm';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'pills':
                return 'bg-transparent border border-[#D5D7DA] rounded-lg overflow-hidden';
            case 'underline':
                return 'border-b border-gray-200';
            default:
                return 'bg-gray-100 rounded-lg p-1';
        }
    };

    const getTabClasses = (isActive: boolean) => {
        const baseClasses = `flex items-center gap-2 font-medium transition-colors [&:not(:last-child)]:border-r border-[#D5D7DA] ${getSizeClasses()}`;

        if (variant === 'underline') {
            return `${baseClasses} border-b-2 pb-2 ${isActive
                ? 'border-[#181D27] text-[#181D27]'
                : 'border-transparent text-[#535862] hover:text-[#181D27] hover:border-gray-300'
                }`;
        }

        return `${baseClasses} ${isActive
            ? 'bg-[#FAFAFA] text-[#252B37]'
            : 'text-[#717680] hover:text-[#252B37]'
            }`;
    };

    return (
        <div className={`flex items-center ${getVariantClasses()} ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={getTabClasses(activeTab === tab.id)}
                    type="button"
                >
                    {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default Tabs;
