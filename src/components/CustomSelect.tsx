import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

export interface CustomSelectOption {
    value: string;
    label: string;
}

export interface CustomSelectProps {
    options: CustomSelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select",
    className = "",
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string) => {
        setSelectedValue(optionValue);
        onChange(optionValue);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                disabled={disabled}
                className={`
          w-full px-3 py-2 text-sm text-[#414651] border border-[#D5D7DA] rounded-lg 
          outline-none transition-all duration-200 flex items-center justify-between
          ${disabled
                        ? 'bg-gray-100 cursor-not-allowed opacity-50'
                        : 'bg-white cursor-pointer'
                    }
        `}
            >
                <span className="text-left truncate mr-2">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <LuChevronDown
                    size={16}
                    color="#414651"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="min-w-[150px] absolute top-full left-0 right-0 mt-1 bg-white border border-[#D5D7DA] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`
                w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors
                ${selectedValue === option.value
                                    ? 'bg-[#FDF5E8] text-[#E0891E] font-medium'
                                    : 'text-[#414651]'
                                }
                first:rounded-t-lg last:rounded-b-lg
              `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
