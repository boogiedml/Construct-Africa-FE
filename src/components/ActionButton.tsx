// import type { ButtonHTMLAttributes, ReactNode } from "react";
// import { Link } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

// interface ActionButtonProps {
//   buttonText: string | ReactNode;
//   textSize?: string;
//   outline?: boolean;
//   link?: string;
//   width?: string;
//   attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
//   loading?: boolean;
//   fullyRounded?: boolean;
//   paddingX?: string;
//   borderless?: boolean;
//   textColor?: string;
//   backgroundColor?: string
//   borderColor?: string
// }

// const ActionButton = ({
//   buttonText,
//   link,
//   textSize,
//   outline,
//   width,
//   attributes,
//   loading = false,
//   fullyRounded = false,
//   paddingX = "px-3",
//   borderless = false,
//   textColor = "#ffffff",
//   backgroundColor = "#F89822",
//   borderColor
// }: ActionButtonProps) => {
//   return (
//     <>
//       {link ? (
//         <Link
//           style={{
//             width:
//               width === "full" ? "100%" : width === "fit" ? "fit-content" : "",
//             backgroundColor: outline || borderless ? 'transparent' : backgroundColor,
//             color: outline || borderless ? '#414651' : textColor,
//             ...(borderColor && { borderColor })
//           }}
//           to={link || ""}
//           className={`action-button text-center inline-block`}
//         >
//           <div
//             className={`w-full ${paddingX} font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 md:py-2.5 text-xs md:text-sm"
//               } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"} 
//             ${outline && !borderless
//                 ? `text-[#414651] border border-[#D5D7DA]`
//                 : borderless
//                   ? "text-[#414651]"
//                   : ""
//               }   
//               `}
//           >
//             {buttonText}
//           </div>
//         </Link>
//       ) : (
//         <button
//           style={{
//             width:
//               width === "full" ? "100%" : width === "fit" ? "fit-content" : "",
//             backgroundColor: outline || borderless ? 'transparent' : backgroundColor,
//             color: outline || borderless ? '#414651' : textColor,
//             ...(borderColor && { borderColor })
//           }}
//           {...attributes}
//           className={`w-full ${paddingX} font-semibold ${textSize ? "py-2.5 text-" + textSize : "py-2 text-xs md:text-sm"
//             } flex items-center ${fullyRounded ? "rounded-full" : "rounded-lg"}
//           ${outline && !borderless
//               ? "border border-[#D5D7DA]"
//               : borderless
//                 ? ""
//                 : ""
//             }    
//               `}
//         >
//           <div className="w-fit mx-auto flex items-center">
//             {loading ? (
//               <>
//                 <span className="mr-2 flex items-center gap-2 text-nowrap">
//                   {buttonText}
//                 </span>{" "}
//                 <ClipLoader
//                   size={15}
//                   color={
//                     outline || borderless
//                       ? "#414651"
//                       : textColor
//                   }
//                 />
//               </>
//             ) : (
//               <span className="flex items-center gap-2 text-nowrap">{buttonText}</span>
//             )}
//           </div>
//         </button>
//       )}
//     </>
//   );
// };

// export default ActionButton;


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
  backgroundColor?: string;
  borderColor?: string;
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
  borderColor,
}: ActionButtonProps) => {
  const sharedStyle = {
    width:
      width === "full" ? "100%" : width === "fit" ? "fit-content" : undefined,
    backgroundColor: outline || borderless ? "transparent" : backgroundColor,
    color: outline || borderless ? "#414651" : textColor,
    borderColor: borderColor || (outline && !borderless ? "#D5D7DA" : "transparent"),
  };

  const sharedClasses = `
    inline-flex justify-center items-center relative font-semibold
    ${paddingX}
    ${textSize ? "py-2.5 text-" + textSize : "py-2 md:py-2.5 text-xs md:text-sm"}
    ${fullyRounded ? "rounded-full" : "rounded-md"}
    ${outline && !borderless ? "border border-[#D5D7DA]" : ""}
    ${borderless ? "border-0" : ""}
    transition-all duration-200
  `;

  const content = (
    <>
      {loading ? (
        <span className="flex items-center gap-2 text-nowrap">
          {buttonText}
          <ClipLoader
            size={15}
            color={outline || borderless ? "#414651" : textColor}
          />
        </span>
      ) : (
        <span className="flex items-center gap-2 text-nowrap">{buttonText}</span>
      )}
    </>
  );

  return link ? (
    <Link
      to={link}
      style={sharedStyle}
      className={sharedClasses}
    >
      {content}
    </Link>
  ) : (
    <button
      {...attributes}
      style={sharedStyle}
      className={sharedClasses}
    >
      {content}
    </button>
  );
};

export default ActionButton;
