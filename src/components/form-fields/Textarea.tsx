import type { TextareaHTMLAttributes } from "react";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

export interface TextareaProps {
  label?: string;
  labelFor?: string;
  labelColor?: string;
  attributes?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  disabled?: boolean;
  error?: string;
  note?: string;
}

const Textarea = ({
  label,
  labelFor,
  labelColor,
  attributes,
  error,
  note,
  disabled,
}: TextareaProps) => {
  const [textValue, setTextValue] = useState(attributes?.defaultValue || "");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    if (attributes?.onChange) attributes.onChange(e);
  };

  return (
    <div>
      <label
        className={`${
          labelColor ? `text-[${labelColor}]` : "text-[#101928]"
        } text-sm mona-sans-medium`}
        htmlFor={labelFor}
      >
        {label}
      </label>
      <div className="relative mt-1">
        <textarea
          className={`w-full min-h-[108px] p-3 border-[1.5px] text-[15px] border-[#D0D5DD] group rounded-lg outline-none focus-within:border-[#0E1333] focus-within:bg-[#F1FEF14D] transition-all duration-300 resize-none ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          {...attributes}
          value={textValue}
          onChange={handleTextChange}
          disabled={disabled}
        />
      </div>
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

export default Textarea;
