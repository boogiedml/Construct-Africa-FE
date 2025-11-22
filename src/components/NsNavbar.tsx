import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FiBookOpen, FiGlobe, FiRss, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import ActionButton from './ActionButton';

const NsNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPublicHome = location.pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [showInsightsDropdown, setShowInsightsDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileInsightsDropdown, setShowMobileInsightsDropdown] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Always check scrollable-section first (it's used for all pages)
            const scrollableSection = document.getElementById('scrollable-section');
            let scrollY = 0;

            if (scrollableSection) {
                scrollY = scrollableSection.scrollTop;
            } else {
                // Fallback to window scroll if scrollable-section doesn't exist
                scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            }

            const scrolled = scrollY > 100;
            setIsScrolled(scrolled);
        };

        // Set up scrollable-section listener
        const setupScrollableSection = () => {
            const scrollableSection = document.getElementById('scrollable-section');
            if (scrollableSection) {
                // Initial check
                handleScroll();
                // Add scroll listener
                scrollableSection.addEventListener('scroll', handleScroll, { passive: true });
                return true;
            }
            return false;
        };

        // Try to set up immediately
        if (!setupScrollableSection()) {
            // If scrollable-section doesn't exist yet, check periodically
            const checkInterval = setInterval(() => {
                if (setupScrollableSection()) {
                    clearInterval(checkInterval);
                }
            }, 100);

            // Also set up window scroll as fallback
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check

            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearInterval(checkInterval);
            };
        } else {
            // Cleanup for scrollable-section
            return () => {
                const scrollableSection = document.getElementById('scrollable-section');
                if (scrollableSection) {
                    scrollableSection.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [isPublicHome]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen && mobileMenuRef.current && mobileMenuButtonRef.current) {
                const target = event.target as Node;
                if (
                    !mobileMenuRef.current.contains(target) &&
                    !mobileMenuButtonRef.current.contains(target)
                ) {
                    setIsMobileMenuOpen(false);
                    setShowMobileInsightsDropdown(false);
                }
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isMobileMenuOpen]);

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

    const navClassName = `top-0 left-0 right-0 z-50 transition-all duration-300 fixed border-b ${isPublicHome
        ? isScrolled
            ? 'bg-white border-[#E9EAEB] shadow-sm pb-2 h-[60px] md:h-[106px]'
            : 'bg-transparent border-transparent h-[60px] md:h-[90px]'
        : isScrolled
            ? 'bg-white border-[#E9EAEB] h-[60px] md:h-[90px]'
            : 'bg-white border-transparent h-[60px] md:h-[90px]'
        }`;

    const logoContainerClassName = `w-[70px] md:w-[120px] !cursor-pointer ${isPublicHome
        ? isScrolled
            ? 'h-[60px] md:h-[90px] self-start'
            : 'h-[60px] md:h-[90px]'
        : 'h-[60px] md:h-[90px]'
        }`;

    return (
        <nav className={navClassName}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div onClick={() => navigate("/")} className={logoContainerClassName}>
                        <img className="w-full h-full object-cover cursor-pointer" src="/images/logo.svg" alt="Logo" />
                    </div>

                    {/* Desktop Navigation Links - Hidden on mobile and tablet, visible on lg+ */}
                    <div className="hidden lg:flex items-center space-x-8">
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

                    {/* Action Buttons - Hidden on mobile, visible on md+ */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                        {location.pathname !== '/login' && <ActionButton buttonText="Login" textColor={isPublicHome && !isScrolled ? 'white' : '#414651'} backgroundColor='transparent' paddingX="px-4 lg:px-8" attributes={{
                            onClick: () => navigate('/login')
                        }} />}

                        {location.pathname !== '/login' && location.pathname !== '/book-a-demo' && <ActionButton buttonText="Book a Demo" paddingX="px-3 lg:px-5" attributes={{
                            onClick: () => navigate('/book-a-demo')
                        }} />}

                        {location.pathname === '/login' && <ActionButton buttonText="Contact us" paddingX="px-3 lg:px-5" attributes={{
                            onClick: () => navigate('/contact')
                        }} />}
                    </div>

                    {/* Mobile Menu Button - Visible on mobile and tablet */}
                    <div className="lg:hidden relative">
                        <button
                            ref={mobileMenuButtonRef}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-[#181D27] focus:outline-none rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX size={24} className={isPublicHome && !isScrolled ? 'text-white' : 'text-[#181D27]'} />
                            ) : (
                                <FiMenu size={24} className={isPublicHome && !isScrolled ? 'text-white' : 'text-[#181D27]'} />
                            )}
                        </button>

                        {/* Mobile Menu - Floating Dropdown */}
                        <div
                            ref={mobileMenuRef}
                            className={`lg:hidden absolute right-0 top-full mt-3 w-[280px] bg-white rounded-lg shadow-xl border border-[#E9EAEB] z-50 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                        >
                            {/* Navigation Items */}
                            <div className="py-2">
                                {navItems.map((item) => {
                                    const isInsights = item.name === 'Insights';
                                    const isActive = item.href === location.pathname || (isInsights && location.pathname.startsWith('/insights'));

                                    return (
                                        <div key={item.name} className="w-full">
                                            {isInsights ? (
                                                <div className="w-full overflow-hidden">
                                                    <button
                                                        onClick={() => setShowMobileInsightsDropdown(!showMobileInsightsDropdown)}
                                                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors rounded-md mx-2 ${isActive
                                                            ? 'bg-[#E0891E] text-white font-semibold'
                                                            : 'text-[#181D27] font-normal hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <span>{item.name}</span>
                                                        <FiChevronDown
                                                            size={18}
                                                            className={`transition-transform ${showMobileInsightsDropdown ? 'rotate-180' : ''
                                                                } ${isActive ? 'text-white' : 'text-[#717680]'}`}
                                                        />
                                                    </button>
                                                    <div className={`px-2 pr-4 overflow-hidden transition-all duration-300 space-y-1 ease-in-out mt-1 ${showMobileInsightsDropdown
                                                        ? 'max-h-96 opacity-100'
                                                        : 'max-h-0 opacity-0'
                                                        }`}>
                                                        {insightsDropdownItems.map((dropdownItem) => {
                                                            const Icon = dropdownItem.icon;
                                                            const isDropdownActive = location.pathname === dropdownItem.href;

                                                            return (
                                                                <a
                                                                    key={dropdownItem.name}
                                                                    href={dropdownItem.href}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setIsMobileMenuOpen(false);
                                                                        setShowMobileInsightsDropdown(false);
                                                                        // Small delay to allow animation to start before navigation
                                                                        setTimeout(() => {
                                                                            navigate(dropdownItem.href);
                                                                        }, 150);
                                                                    }}
                                                                    className={`flex items-start gap-3 pl-4 pr-2 py-2.5 rounded-md transition-colors hover:bg-gray-50 ${isDropdownActive
                                                                        ? 'text-[#E0891E]'
                                                                        : 'text-[#181D27]'
                                                                        }`}
                                                                >
                                                                    <Icon
                                                                        size={18}
                                                                        className={`mt-0.5 flex-shrink-0 ${isDropdownActive ? 'text-[#E0891E]' : 'text-[#717680]'
                                                                            }`}
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className={`font-medium text-sm ${isDropdownActive ? 'text-[#E0891E]' : 'text-[#181D27]'
                                                                            }`}>
                                                                            {dropdownItem.name}
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsMobileMenuOpen(false);
                                                        // Small delay to allow animation to start before navigation
                                                        setTimeout(() => {
                                                            navigate(item.href);
                                                        }, 150);
                                                    }}
                                                    className={`px-4 py-3 mx-2 rounded-lg text-sm transition-colors block mb-2 ${isActive
                                                        ? 'bg-[#E0891E] text-white font-semibold'
                                                        : 'text-[#181D27] font-normal hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {item.name}
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#E9EAEB] mb-3" />

                            {/* Action Buttons */}
                            <div className="px-3 pb-3 space-y-2">
                                {location.pathname !== '/login' && (
                                    <ActionButton
                                        buttonText="Login"
                                        width="full"
                                        outline
                                        paddingX="px-4"
                                        attributes={{
                                            onClick: () => {
                                                setIsMobileMenuOpen(false);
                                                setTimeout(() => {
                                                    navigate('/login');
                                                }, 150);
                                            }
                                        }}
                                    />
                                )}
                                {location.pathname !== '/login' && location.pathname !== '/book-a-demo' && (
                                    <ActionButton
                                        buttonText="Book a Demo"
                                        width="full"
                                        paddingX="px-4"
                                        attributes={{
                                            onClick: () => {
                                                setIsMobileMenuOpen(false);
                                                setTimeout(() => {
                                                    navigate('/book-a-demo');
                                                }, 150);
                                            }
                                        }}
                                    />
                                )}
                                {location.pathname === '/login' && (
                                    <ActionButton
                                        buttonText="Contact us"
                                        width="full"
                                        paddingX="px-4"
                                        attributes={{
                                            onClick: () => {
                                                setIsMobileMenuOpen(false);
                                                setTimeout(() => {
                                                    navigate('/contact');
                                                }, 150);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NsNavbar;
