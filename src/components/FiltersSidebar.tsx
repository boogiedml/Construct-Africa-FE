import React, { useState, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { LuChevronDown } from 'react-icons/lu';
import ActionButton from './ActionButton';
import PresetModal from './PresetModal';
import type { AppFilters } from '../types/filter.types';
import {
    useGetCountriesQuery,
    useGetRegionsQuery,
    useGetSectorsQuery,
    useGetTypesQuery
} from '../store/services/reference';
import { savePreset } from '../utils/presets';
import { toast } from 'react-toastify';

interface FiltersSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters?: (filters: AppFilters) => void;
    initialFilters?: AppFilters;
    type?: 'projects' | 'companies' | 'news' | 'tenders';
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    isOpen,
    onClose,
    onApplyFilters,
    initialFilters = {},
    type = 'projects'
}) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<AppFilters>(initialFilters);
    const [showPresetModal, setShowPresetModal] = useState(false);

    // Fetch reference data
    const { data: countriesData, isLoading: countriesLoading } = useGetCountriesQuery();
    const { data: regionsData, isLoading: regionsLoading } = useGetRegionsQuery();
    const { data: sectorsData, isLoading: sectorsLoading } = useGetSectorsQuery();
    const { data: typesData, isLoading: typesLoading } = useGetTypesQuery();

    // Extract data arrays
    const countries = countriesData?.data || [];
    const regions = regionsData?.data || [];
    const sectors = sectorsData?.data || [];
    const types = typesData?.data || [];

    // Different filter categories based on content type
    const getFilterCategories = () => {
        switch (type) {
            case 'projects':
                return ['Region', 'Country', 'Sector', 'Type', 'Status', 'Value'];
            case 'companies':
                return ['Region', 'Country', 'Sector', 'Type', 'Status'];
            case 'news':
                return ['Category', 'Author', 'Date'];
            case 'tenders':
                return ['Region', 'Country', 'Type', 'Date'];
            default:
                return ['Region', 'Country', 'Sector', 'Type', 'Status', 'Value'];
        }
    };

    const filterCategories = getFilterCategories();

    // Build options object with real data
    const filterOptions = useMemo(() => {
        return {
            Region: regions.map(r => r.name),
            Country: countries.map(c => c.name),
            Sector: sectors.map(s => s.name),
            Type: types.map(t => t.name),
            Status: ['Planning', 'Design', 'Bid', 'Build', 'Completed'],
            Value: ['< $10m', '$10m – $50m', '$50m – $100m', '$100m – $500m', '$500m+'],
            Category: ['Infrastructure', 'Technology', 'Healthcare', 'Education'],
            Author: ['Author 1', 'Author 2', 'Author 3'],
            Date: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last year']
        };
    }, [countries, regions, sectors, types]);

    const toggleCategory = (cat: string) => {
        setOpenCategory(prev => (prev === cat ? null : cat));
    };

    const handleCheckboxChange = (category: string, option: string, checked: boolean) => {
        const categoryKey = category.toLowerCase() as keyof AppFilters;

        setSelectedFilters(prev => {
            const currentValues = (prev[categoryKey] as string[]) || [];

            if (checked) {
                return {
                    ...prev,
                    [categoryKey]: [...currentValues, option]
                };
            } else {
                return {
                    ...prev,
                    [categoryKey]: currentValues.filter(v => v !== option)
                };
            }
        });
    };

    const handleReset = () => {
        setSelectedFilters({});
        onApplyFilters?.({});
    };

    const handleApply = () => {
        onApplyFilters?.(selectedFilters);
        onClose();
    };

    const handleSavePreset = (presetName: string) => {
        // Check if there are any filters selected
        const hasFilters = Object.values(selectedFilters).some(
            val => Array.isArray(val) && val.length > 0
        );

        if (!hasFilters) {
            toast.warning('Please select at least one filter before saving a preset.');
            return;
        }

        // Save the preset
        savePreset(presetName, selectedFilters, type);
        toast.success(`Preset "${presetName}" saved successfully!`);
    };

    const isOptionSelected = (category: string, option: string) => {
        const categoryKey = category.toLowerCase() as keyof AppFilters;
        const values = selectedFilters[categoryKey] as string[] | undefined;
        return values?.includes(option) || false;
    };

    // Get count of selected filters for a category
    const getSelectedCount = (category: string) => {
        const categoryKey = category.toLowerCase() as keyof AppFilters;
        const values = selectedFilters[categoryKey] as string[] | undefined;
        return values?.length || 0;
    };

    // Check if category is loading
    const isCategoryLoading = (category: string) => {
        switch (category) {
            case 'Country':
                return countriesLoading;
            case 'Region':
                return regionsLoading;
            case 'Sector':
                return sectorsLoading;
            case 'Type':
                return typesLoading;
            default:
                return false;
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="w-[340px] bg-white rounded-lg border border-[#D5D7DA] border-t-8 border-t-[#F89822] overflow-hidden flex flex-col max-h-[calc(100vh-200px)] sticky top-5">
                <div className="p-4 border-b border-[#E9EAEB] flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-[#252B37]">Apply filters</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <IoClose size={24} className="text-[#535862]" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filterCategories.map((category, index) => {
                        const selectedCount = getSelectedCount(category);
                        const isLoading = isCategoryLoading(category);

                        return (
                            <div key={category} className={`${index !== filterCategories.length - 1 ? 'border-b border-[#E9EAEB]' : ''}`}>
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(category)}
                                    className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-[#181D27]">{category}</span>
                                        {selectedCount > 0 && (
                                            <span className="px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                                                {selectedCount}
                                            </span>
                                        )}
                                    </div>
                                    <LuChevronDown
                                        size={18}
                                        className={`text-[#535862] transition-transform ${openCategory === category ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {openCategory === category && (
                                    <div className="px-4 pb-4">
                                        {isLoading ? (
                                            <div className="mt-2 space-y-4">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="mt-1 space-y-2 max-h-60 overflow-y-auto">
                                                {(filterOptions[category as keyof typeof filterOptions] || []).map((option) => (
                                                    <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                        <input
                                                            type="checkbox"
                                                            className="accent-[#FDB022]"
                                                            checked={isOptionSelected(category, option)}
                                                            onChange={(e) => handleCheckboxChange(category, option, e.target.checked)}
                                                        />
                                                        <span className="text-sm text-[#535862]">{option}</span>
                                                    </label>
                                                ))}
                                                {(filterOptions[category as keyof typeof filterOptions] || []).length === 0 && (
                                                    <div className="text-sm text-[#535862] text-center py-2">
                                                        No options available
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 space-y-3 sticky bottom-0 border-t border-[#E9EAEB] bg-white">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={handleReset}
                            className="text-sm font-medium text-[#535862] hover:text-[#F89822] transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setShowPresetModal(true)}
                            className="text-sm font-medium text-[#535862] hover:text-[#F89822] transition-colors"
                        >
                            Save preset
                        </button>
                        <ActionButton
                            buttonText="Apply filters"
                            outline={false}
                            width="fit"
                            fullyRounded
                            backgroundColor='#E0891E'
                            attributes={{
                                onClick: handleApply
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Preset Modal */}
            <PresetModal
                isOpen={showPresetModal}
                onClose={() => setShowPresetModal(false)}
                onSave={handleSavePreset}
            />
        </>
    );
};

export default FiltersSidebar;
