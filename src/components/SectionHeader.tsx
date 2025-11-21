import { RxCaretRight } from "react-icons/rx";
import ActionButton from "./ActionButton";

const SectionHeader = ({ title, showMoreLink = true, link }: { title: string, showMoreLink?: boolean, link?: string }) => (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-base md:text-lg lg:text-[24px] text-[#181D27] font-bitter !font-semibold">{title}</h2>
        {showMoreLink && (
            <ActionButton buttonText={<span className="flex items-center gap-3 justify-between">
                Show more
                <RxCaretRight color="#414651" className="text-base md:text-xl" />
            </span>} link={link} outline width="fit" />
        )}
    </div>
);

export default SectionHeader