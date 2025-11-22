import { useState, useRef, useEffect } from "react";
import type { SelectHTMLAttributes } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { LuChevronDown } from "react-icons/lu";

export interface SelectProps {
  label?: string;
  labelFor?: string;
  labelColor?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  attributes?: SelectHTMLAttributes<HTMLSelectElement>;
  disabled?: boolean;
  error?: string;
  note?: string;
  isRequired?: boolean;
}

const Select = ({
  label,
  labelFor,
  labelColor,
  placeholder,
  options,
  attributes,
  disabled,
  error,
  note,
  isRequired,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = attributes?.value as string | undefined;
  const onChange = attributes?.onChange;

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      // Create a synthetic event for Formik compatibility
      const syntheticEvent = {
        target: {
          value: optionValue,
          name: attributes?.name || "",
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className={`${labelColor ? "text-[" + labelColor + "] " : "text-[#101928]"
            } text-sm mona-sans-medium`}
          htmlFor={labelFor}
        >
          {label} {isRequired && <span className="text-[#E0891E]">*</span>}
        </label>
      )}
      <div className="relative mt-1" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={`
            w-full px-3 py-2.5 text-sm text-[#414651] border rounded-lg 
            outline-none transition-all duration-200 flex items-center justify-between
            ${error
              ? "border-[#D95959] focus:border-[#D95959] focus:ring-1 focus:ring-[#D95959]"
            : "border-[#D5D7DA] focus:border-[#F89822] focus:ring-1 focus:ring-[#F89822]"
            }
            ${disabled
              ? "bg-gray-100 cursor-not-allowed opacity-50"
              : "bg-white cursor-pointer hover:border-[#414651]"
            }
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`text-left truncate mr-2 ${!selectedOption ? "text-gray-400" : ""
              }`}
          >
            {selectedOption ? selectedOption.label : placeholder || "Select"}
          </span>
          <LuChevronDown
            size={16}
            color="#414651"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D5D7DA] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400 text-center">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors
                    ${value === option.value
                      ? "bg-[#FDF5E8] text-[#E0891E] font-medium"
                      : "text-[#414651]"
                    }
                    first:rounded-t-lg last:rounded-b-lg
                  `}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-[#D95959] mt-[2px] block">{error}</span>
      )}
      {note && (
        <span className="mt-2 flex items-center gap-2 text-xs text-[#5C5C5C]">
          <BsInfoCircle />
          {note}
        </span>
      )}
    </div>
  );
};

export default Select;
