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
    <div>
      <label
        className={`${
          labelColor ? "text-[" + labelColor + "] " : "text-[#101928]"
        } text-sm mona-sans-medium`}
        htmlFor={labelFor}
      >
        {label}
      </label>
      <select
        className="mt-1 w-full p-3 text-[15px] border-[1.5px] border-[#D0D5DD] font-medium group rounded-md outline-none focus-within:border-[#0E1333] focus-within:bg-[#F1FEF14D] transition-all duration-300"
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
