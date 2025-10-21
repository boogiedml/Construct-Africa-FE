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
  paddingX?: string;
  borderless?: boolean;
  textColor?: string;
  backgroundColor?: string
  borderColor?: string
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
  paddingX = "px-3",
  borderless = false,
  textColor = "#ffffff",
  backgroundColor = "#F89822",
  borderColor
}: ActionButtonProps) => {
  return (
    <>
      {link ? (
        <Link
          style={{
            width:
              width === "full" ? "100%" : width === "fit" ? "fit-content" : "",
            backgroundColor: outline || borderless ? 'transparent' : backgroundColor,
            color: outline || borderless ? '#414651' : textColor,
            borderColor: borderColor ? borderColor : "transparent"
          }}
          to={link || ""}
          className={`action-button text-center inline-block`}
        >
          <div
            className={`w-full ${borderColor ? "border" : ""} ${paddingX} font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 md:py-2.5 text-xs md:text-sm"
              } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"} 
            ${outline || borderless
                ? `text-[#414651] ${borderless ? "" : "border border-[#D5D7DA]"}`
                : ""
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
            backgroundColor: outline || borderless ? 'transparent' : backgroundColor,
            color: outline || borderless ? '#414651' : textColor,
            borderColor: borderColor ? borderColor : "transparent"
          }}
          {...attributes}
          className={`w-full ${borderColor ? "border" : ""} ${paddingX}  font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 text-xs md:text-sm"
            } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"}
          ${outline || borderless
              ? `${borderless ? "" : "border border-[#D5D7DA]"}`
              : ""
            }    
              `}
        >
          <div className="w-fit mx-auto flex items-center">
            {loading ? (
              <>
                <span className="mr-2 flex items-center gap-2 text-nowrap">
                  {buttonText}
                </span>{" "}
                <ClipLoader
                  size={15}
                  color={
                    outline || borderless
                      ? "#414651"
                      : textColor
                  }
                />
              </>
            ) : (
              <span className="flex items-center gap-2 text-nowrap">{buttonText}</span>
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default ActionButton;
