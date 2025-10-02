import React from 'react';

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    id?: string;
    name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    disabled = false,
    size = 'md',
    className = '',
    id,
    name
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-4 h-4';
            case 'lg':
                return 'w-[20px] h-[20px]';
            default:
                return 'w-5 h-5';
        }
    };

    const getInnerSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-2 h-2';
            case 'lg':
                return 'w-[12px] h-[12px]';
            default:
                return 'w-2.5 h-2.5';
        }
    };

    return (
        <div className={`relative inline-flex items-center ${className}`}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only"
            />
            <button
                type="button"
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                className={`
          ${getSizeClasses()}
          relative rounded-md border p-2 border-[#D5D7DA] transition-all duration-200 ease-in-out
          ${disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:shadow-sm'
                    }
        `}
            >
                {checked && (
                    <div className={`
            ${getInnerSizeClasses()}
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            rounded bg-[#F89822]
          `} />
                )}
            </button>
        </div>
    );
};

export default Checkbox;
