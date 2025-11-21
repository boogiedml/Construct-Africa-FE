import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import ExpertCard from "./ExpertCard";
import ExpertCardSkeleton from "./ExpertCardSkeleton";

interface ListItemProps {
    type: string;
    title: string;
    date: string;
    isUpdated?: boolean;
    onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
    type,
    title,
    date,
    isUpdated = false,
    onClick,
}) => {
    return (
        <div
            className="py-4 border-b border-[#E9EAEB] rounded-xl cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#181D27] font-medium">{type}</span>
                            {isUpdated && (
                                <span className="bg-[#ECFDF3] text-[#027A48] text-xs font-medium px-2.5 py-1 rounded-full">
                                    Updated
                                </span>
                            )}
                        </div>

                        <div className="text-[#535862] text-sm ml-4 flex-shrink-0">
                            {date}
                        </div>
                    </div>

                    <h3 className="text-gray-900 font-normal text-sm leading-relaxed">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

interface ActivityItem {
    id?: string | number;
    type: string;
    title: string;
    date: string;
    isUpdated?: boolean;
}

interface ActivityListProps {
    title?: string;
    items?: ActivityItem[];
    showMore?: boolean;
    onShowMore?: () => void;
    onItemClick?: (item: ActivityItem, index: number) => void;
    className?: string;
    maxHeight?: string | number;
    minHeight?: string | number;
    isLoading?: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({
    title = "Recently viewed",
    items = [],
    showMore = true,
    onShowMore,
    onItemClick,
    className = "",
    maxHeight = "450px",
    minHeight = "450px",
    isLoading = false,
}) => {

    const navigate = useNavigate();
    const handleItemClick = (type: string, id: string | number) => {
        if( type === 'News' ) {
            navigate(`/admin/news/${id}`);
        } else if ( type === 'Company' ) {
            navigate(`/admin/companies/${id}`);
        } else if ( type === 'Project' ) {
            navigate(`/admin/projects/${id}`);
        } else if ( type === 'Tender' ) {
            navigate(`/admin/tenders/${id}`);
        }
    };

    if (isLoading) {
        return( <ExpertCardSkeleton /> );
    }

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-[#E9EAEB] border-t-8 border-t-[#F89822] overflow-hidden ${className}`}
        >
            <div>
                <div className="flex justify-between items-center mb-3 px-4 md:px-5 pt-4">
                    <h2 className="text-base md:text-lg text-[#181D27] font-bitter !font-semibold">
                        {title}
                    </h2>
                    {showMore && (
                        <ActionButton buttonText="Show more" outline width="fit" attributes={{ onClick: onShowMore }} />
                    )}
                </div>

                <div
                    className="space-y-0 overflow-y-auto px-4 md:px-5 pb-5"
                    style={{ maxHeight, minHeight }}
                >
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <ListItem
                                key={item.id || index}
                                type={item.type}
                                title={item.title}
                                date={item.date}
                                isUpdated={item.isUpdated}
                                onClick={() => handleItemClick(item.type, item.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">No items to display</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityList;
