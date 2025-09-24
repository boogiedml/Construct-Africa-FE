import { useState } from 'react';
import { BiBell, BiChevronDown, BiMenu, BiX } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import Input from './form-fields/Input';
import { LuSearch } from 'react-icons/lu';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/', },
        { name: 'Projects', href: '/projects' },
        { name: 'Companies', href: '/companies' },
        { name: 'News', href: '/news' },
        { name: 'Tenders', href: '/tenders' },
        { name: 'Favourites', href: '/favourites' },
    ];

    return (
        <nav className="bg-white border-b border-[#E9EAEB] h-[48px] md:h-[64px] z-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-10 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className='flex items-center gap-10 h-full'>
                        <div className="w-[60px] md:w-[80px] h-full">
                            <img className='w-full h-full object-cover' src="/images/logo.png" alt="" />
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-base transition-colors px-2 py-2 duration-200 ${item.href === location.pathname
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
                                    className="flex cursor-pointer items-center text-base px-2 py-2 font-medium text-[#717680] hover:text-[#181D27] transition-colors duration-200"
                                >
                                    More
                                    <BiChevronDown size={24} className={`ml-1 transition-all duration-300 ${isMoreDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                                </button>
                                {isMoreDropdownOpen && (
                                    <div className="absolute right-0 mt-4 w-48 bg-white border border-[#E9EAEB] rounded-md shadow-lg py-1 z-10">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Resources
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            About
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Contact
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className='w-64'>
                            <Input
                                icon={<LuSearch />}
                                attributes={{
                                    placeholder: "Search"
                                }}
                            />
                        </div>

                        <button className="p-2 text-[#717680] hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                            <BiBell size={20} />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center text-base text-gray-700 hover:text-gray-900 transition-colors duration-200"
                            >
                                Welcome, <span className='font-semibold ml-1'>Muaz</span>
                                <BiChevronDown size={24} color='#717680' className={`ml-1 transition-all duration-300 ${isProfileDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-6 w-48 bg-white border border-[#E9EAEB] rounded-md shadow-lg py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Sign out
                                    </a>
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
                            className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        >
                            More
                        </a>
                    </div>

                    <div className="mt-4 px-3">
                        <div className='w-full'>
                            <Input
                                icon={<LuSearch />}
                                attributes={{
                                    placeholder: "Search"
                                }}
                            />
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