import type { SelectHTMLAttributes } from "react";
import { BsInfoCircle } from "react-icons/bs";

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
}

const Select = ({
  label,
  labelFor,
  labelColor,
  placeholder,
  options,
  attributes,
  error,
  note,
}: SelectProps) => {
  return (
    <div className="w-full">
      <label
        className={`${labelColor ? "text-[" + labelColor + "] " : "text-[#101928]"
          } text-sm mona-sans-medium`}
        htmlFor={labelFor}
      >
        {label}
      </label>
      <select
        className="w-full mt-1 px-3 py-2.5 text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
        {...attributes}
      >
        <option className="text-gray-400" value="">
          {placeholder ? placeholder : "Select"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-[#D95959] mt-[2px]">{error}</span>
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
