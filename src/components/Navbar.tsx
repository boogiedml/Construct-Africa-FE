import { useState, useRef, useEffect } from 'react';
import { BiBell, BiChevronDown, BiMenu, BiX } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from './form-fields/Input';
import { LuSearch } from 'react-icons/lu';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/features/authSlice';
import GlobalSearch from './GlobalSearch';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsProfileDropdownOpen(false);
    };

    const navItems = [
        { name: 'Home', href: '/admin', },
        { name: 'Projects', href: '/admin/projects' },
        { name: 'Companies', href: '/admin/companies' },
        { name: 'News', href: '/admin/news' },
        { name: 'Tenders', href: '/admin/tenders' },
        { name: 'Favourites', href: '/admin/favourites' },
    ];

    const isEventsPage = location.pathname.startsWith('/admin/events');
    const isExpertOpinionsPage = location.pathname.startsWith('/admin/expert-opinions');
    const isRecentlyViewedPage = location.pathname.startsWith('/admin/recently-viewed');

    // Handle search input focus and click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                // Check if click is outside the GlobalSearch component
                const globalSearch = document.querySelector('[data-global-search]');
                if (globalSearch && !globalSearch.contains(event.target as Node)) {
                    setIsSearchOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white border-b border-[#E9EAEB] h-[48px] md:h-[64px] z-20 sticky top-0">
            <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-10 h-full">
                <div className="flex justify-between items-center h-full gap-2 md:gap-4">
                    <div className='flex items-center gap-3 md:gap-6 lg:gap-10 h-full min-w-0 flex-1'>
                        <div className="w-[50px] sm:w-[60px] md:w-[80px] h-full flex-shrink-0 cursor-pointer" onClick={() => navigate('/admin')}>
                            <img className='w-full h-full object-contain' src="/images/logo.svg" alt="Construct Africa" />
                        </div>
                        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 min-w-0">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm xl:text-base transition-colors px-1 xl:px-2 py-2 duration-200 whitespace-nowrap ${item.href === location.pathname
                                        ? 'text-[#181D27] font-semibold'
                                        : 'text-[#717680] font-normal'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}

                            <div className="relative">
                                <button
                                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                                    className={`flex cursor-pointer items-center text-sm xl:text-base px-1 xl:px-2 py-2 font-medium transition-colors duration-200 whitespace-nowrap ${isEventsPage || isExpertOpinionsPage || isRecentlyViewedPage
                                        ? 'text-[#181D27] font-semibold'
                                        : 'text-[#717680] hover:text-[#181D27]'
                                        }`}
                                >
                                    {isEventsPage ? 'Events' : isExpertOpinionsPage ? 'Expert opinions' : isRecentlyViewedPage ? 'Recently viewed' : 'More'}
                                    <BiChevronDown size={20} className={`ml-1 transition-all duration-300 ${isMoreDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                                </button>
                                {isMoreDropdownOpen && (
                                    <div className="absolute right-0 mt-4 w-48 bg-white border border-[#E9EAEB] rounded-md shadow-lg py-1 z-10">
                                        <a
                                            href="/admin/events"
                                            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isEventsPage ? 'text-[#181D27] font-semibold bg-gray-50' : 'text-gray-700'}`}
                                        >
                                            Events
                                        </a>
                                        <a
                                            href="/admin/expert-opinions"
                                            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isExpertOpinionsPage ? 'text-[#181D27] font-semibold bg-gray-50' : 'text-gray-700'}`}
                                        >
                                            Expert opinions
                                        </a>
                                        <a
                                            href="/admin/recently-viewed"
                                            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isRecentlyViewedPage ? 'text-[#181D27] font-semibold bg-gray-50' : 'text-gray-700'}`}
                                        >
                                            Recently viewed
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                        <div className='w-48 lg:w-56 xl:w-64 relative' ref={searchInputRef}>
                            <Input
                                icon={<LuSearch />}
                                attributes={{
                                    placeholder: "Search",
                                    value: searchQuery,
                                    onChange: (e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSearchOpen(true);
                                    },
                                    onFocus: () => {
                                        setIsSearchOpen(true);
                                    }
                                }}
                            />
                            {isSearchOpen && (
                                <GlobalSearch
                                    isOpen={isSearchOpen}
                                    onClose={() => setIsSearchOpen(false)}
                                    searchQuery={searchQuery}
                                />
                            )}
                        </div>

                        <button className="p-2 text-[#717680] hover:text-gray-600 transition-colors duration-200 cursor-pointer flex-shrink-0">
                            <BiBell size={20} />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                            >
                                <span className="hidden xl:inline">Welcome, </span><span className='font-semibold'>Muaz</span>
                                <BiChevronDown size={20} color='#717680' className={`ml-1 transition-all duration-300 ${isProfileDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-6 w-48 bg-white border border-[#E9EAEB] rounded-md shadow-lg py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 cursor-pointer transition-colors duration-200"
                        >
                            {isMenuOpen ? (
                                <BiX className="" color='#717680' size={20} />
                            ) : (
                                <BiMenu className="" color='#717680' size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden border-y border-gray-200 py-4 bg-white">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${item.href === location.pathname
                                    ? 'text-[#181D27] font-semibold'
                                    : 'text-[#717680] font-normal'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="#"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        >
                            More
                        </a>
                    </div>

                    <div className="mt-4 px-3">
                        <div className='w-full relative'>
                            <Input
                                icon={<LuSearch />}
                                attributes={{
                                    placeholder: "Search",
                                    value: searchQuery,
                                    onChange: (e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSearchOpen(true);
                                    },
                                    onFocus: () => {
                                        setIsSearchOpen(true);
                                    }
                                }}
                            />
                            {isSearchOpen && (
                                <GlobalSearch
                                    isOpen={isSearchOpen}
                                    onClose={() => setIsSearchOpen(false)}
                                    searchQuery={searchQuery}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 px-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Welcome, Muaz</span>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <BiBell className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;