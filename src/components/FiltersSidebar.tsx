import React from 'react';
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
                    <div
                        key={category}
                        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${index !== filterCategories.length - 1 ? 'border-b border-[#E9EAEB]' : ''
                            }`}
                    >
                        <span className="text-sm font-medium text-[#181D27]">{category}</span>
                        <LuChevronDown size={18} className="text-[#535862]" />
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

