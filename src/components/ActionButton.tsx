import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface ActionButtonProps {
  buttonText: string | ReactNode;
  textSize?: string;
  outline?: boolean;
  link?: string;
  width?: string;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  loading?: boolean;
  fullyRounded?: boolean;
}

const ActionButton = ({
  buttonText,
  link,
  textSize,
  outline,
  width,
  attributes,
  loading = false,
  fullyRounded = false,
}: ActionButtonProps) => {
  return (
    <>
      {link ? (
        <Link
          style={{
            width:
              width === "full" ? "100%" : width === "fit" ? "fit-content" : "",
          }}
          to={link || ""}
          className={`action-button text-center inline-block`}
        >
          <div
            className={`w-full px-3 font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 md:py-2.5 text-xs md:text-sm"
              } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"} 
            ${outline
                ? "text-[#414651] border border-[#D5D7DA]"
                : "bg-[#F89822] text-white"
              }   
              `}
          >
            {buttonText}
          </div>
        </Link>
      ) : (
        <button
          style={{
            width:
              width === "full" ? "100%" : width === "fit" ? "fit-content" : "",
          }}
          {...attributes}
            className={`w-full px-3 font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 md:py-2.5 text-xs md:text-sm"
            } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"}
          ${outline
              ? "text-[#414651] border border-[#D5D7DA]"
              : "bg-[#F89822] text-white"
            }    
              `}
        >
          <div className="w-fit mx-auto flex items-center">
            {loading ? (
              <>
                <span className="mr-2 flex items-center gap-2">
                  {buttonText}
                </span>{" "}
                <ClipLoader
                  size={15}
                  color={
                    outline
                      ? "#414651"
                      : "white"
                  }
                />
              </>
            ) : (
              <span className="flex items-center gap-2">{buttonText}</span>
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default ActionButton;
