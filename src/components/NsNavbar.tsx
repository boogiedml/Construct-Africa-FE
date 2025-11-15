import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiBookOpen, FiGlobe, FiRss } from 'react-icons/fi';
import ActionButton from './ActionButton';

const NsNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPublicHome = location.pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [showInsightsDropdown, setShowInsightsDropdown] = useState(false);

    useEffect(() => {
        if (!isPublicHome) {
            setIsScrolled(false);
            return;
        }

        const handleScroll = () => {
            const scrollableSection = document.getElementById('scrollable-section');
            if (scrollableSection) {
                const scrollY = scrollableSection.scrollTop;
                const scrolled = scrollY > 150;
                setIsScrolled(scrolled);
            }
        };

        const scrollableSection = document.getElementById('scrollable-section');
        if (scrollableSection) {
            handleScroll();

            scrollableSection.addEventListener('scroll', handleScroll, { passive: true });
            return () => scrollableSection.removeEventListener('scroll', handleScroll);
        }
    }, [isPublicHome]);

    const navItems = [
        { name: 'Projects', href: '/projects' },
        { name: 'Insights', href: '/insights', hasDropdown: true },
        { name: 'Tenders', href: '/tenders' },
        { name: 'Events', href: '/events' },
    ];

    const insightsDropdownItems = [
        {
            name: 'News',
            href: '/insights/news',
            icon: FiBookOpen,
            description: 'Construction updates and insights.'
        },
        {
            name: 'Expert Opinion',
            href: '/insights/expert-opinions',
            icon: FiGlobe,
            description: 'Industry views and analysis.'
        },
        {
            name: 'Blog',
            href: '/insights/blog',
            icon: FiRss,
            description: 'Stories and trends.'
        }
    ];

    const navClassName = `border-[#E9EAEB] top-0 left-0 right-0 z-50 transition-all duration-300 fixed ${isPublicHome
        ? isScrolled
            ? 'bg-white border-0 shadow-sm pb-2 h-[56px] md:h-[106px]'
            : 'bg-transparent h-[48px] md:h-[90px]'
        : 'bg-white h-[48px] md:h-[90px]'
        }`;


    return (
        <nav className={navClassName}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div onClick={() => navigate("/")} className="w-[60px] md:w-[120px] h-[48px] md:h-[90px]">
                        <img className="w-full h-full object-cover" src="/images/logo.svg" alt="Logo" />
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isInsights = item.name === 'Insights';
                            const isActive = item.href === location.pathname || (isInsights && location.pathname.startsWith('/insights'));

                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => isInsights && setShowInsightsDropdown(true)}
                                    onMouseLeave={() => isInsights && setShowInsightsDropdown(false)}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            if (isInsights) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`text-base transition-colors px-2 py-2 duration-200 relative cursor-pointer ${isPublicHome && !isScrolled
                                            ? isActive
                                                ? 'text-white font-semibold'
                                                : 'text-white/80 font-normal hover:text-white'
                                            : isActive
                                                ? 'text-[#E0891E] font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#E0891E]'
                                                : 'text-[#717680] font-normal hover:text-[#181D27]'
                                            }`}
                                    >
                                        {item.name}
                                    </a>

                                    {isInsights && showInsightsDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-lg shadow-lg border border-[#E9EAEB] py-2 z-50">
                                            {insightsDropdownItems.map((dropdownItem) => {
                                                const Icon = dropdownItem.icon;

                                                return (
                                                    <a
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                    >
                                                        <Icon
                                                            size={20}
                                                            className="text-[#717680] group-hover:text-[#E0891E] transition-colors mt-0.5 flex-shrink-0"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="font-medium text-[#181D27] text-base group-hover:text-[#E0891E] transition-colors">
                                                                {dropdownItem.name}
                                                            </div>
                                                            <div className="text-sm text-[#717680] leading-relaxed">
                                                                {dropdownItem.description}
                                                            </div>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        {location.pathname !== '/login' && <ActionButton buttonText="Login" textColor={isPublicHome && !isScrolled ? 'white' : '#414651'} backgroundColor='transparent' paddingX="px-8" attributes={{
                            onClick: () => navigate('/login')
                        }} />}

                        {location.pathname !== '/login' && < ActionButton buttonText="Book a Demo" paddingX="px-5" attributes={{
                            onClick: () => navigate('/get-listed')
                        }} />}

                        {location.pathname === '/login' && <ActionButton buttonText="Contact us" paddingX="px-5" attributes={{
                            onClick: () => navigate('/contact')
                        }} />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NsNavbar;
