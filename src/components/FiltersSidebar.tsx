import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { LuChevronDown } from 'react-icons/lu';
import ActionButton from './ActionButton';

interface FiltersSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ isOpen, onClose }) => {
    const filterCategories = [
        'Region',
        'Country',
        'Sector',
        'Type',
        'Status',
        'Value'
    ];

    const dummyOptions: Record<string, string[]> = {
        Region: ['Central Africa', 'East Africa', 'North Africa', 'Southern Africa', 'West Africa'],
        Country: ['Nigeria', 'Kenya', 'Egypt', 'South Africa', 'Ghana', 'Ethiopia'],
        Sector: ['Transport', 'Energy', 'Buildings', 'Water', 'Industrial'],
        Type: ['PPP', 'EPC', 'Design & Build', 'Maintenance', 'Study'],
        Status: ['Planning', 'Design', 'Bid', 'Build', 'Completed'],
        Value: ['< $10m', '$10m – $50m', '$50m – $100m', '$100m – $500m', '$500m+']
    };

    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const toggleCategory = (cat: string) => {
        setOpenCategory(prev => (prev === cat ? null : cat));
    };

    if (!isOpen) return null;

    return (
        <div className="w-[340px] bg-white rounded-lg border border-[#D5D7DA] border-t-8 border-t-[#F89822] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#E9EAEB] flex items-center justify-between sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-[#252B37]">Apply filters</h3>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                    <IoClose size={24} className="text-[#535862]" />
                </button>
            </div>

            <div className="border-b border-[#E9EAEB] flex-1">
                {filterCategories.map((category, index) => (
                    <div key={category} className={`${index !== filterCategories.length - 1 ? 'border-b border-[#E9EAEB]' : ''}`}>
                        <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-sm font-medium text-[#181D27]">{category}</span>
                            <LuChevronDown
                                size={18}
                                className={`text-[#535862] transition-transform ${openCategory === category ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {openCategory === category && (
                            <div className="px-4 pb-4">
                                <div className="mt-1 space-y-2">
                                    {(dummyOptions[category] || []).map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="accent-[#FDB022]" />
                                            <span className="text-sm text-[#535862]">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 space-y-3 sticky bottom-0 border-t border-[#E9EAEB]">
                <div className="flex items-center justify-between gap-3">
                    <button className="text-sm font-medium text-[#535862] hover:text-[#F89822] transition-colors">
                        Reset
                    </button>
                    <button className="text-sm font-medium text-[#535862] hover:text-[#F89822] transition-colors">
                        Save preset
                    </button>
                    <ActionButton
                        buttonText="Apply filters"
                        outline={false}
                        width="fit"
                        fullyRounded
                        backgroundColor='#E0891E'
                    />
                </div>
            </div>
        </div>
    );
};

export default FiltersSidebar;

