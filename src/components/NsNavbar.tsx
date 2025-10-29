import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ActionButton from './ActionButton';

const NsNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPublicHome = location.pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);

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
        { name: 'Insights', href: '/insights' },
        { name: 'Tenders', href: '/tenders' },
        { name: 'Events', href: '/events' },
    ];

    const navClassName = `border-[#E9EAEB] h-[48px] md:h-[90px] top-0 left-0 right-0 z-50 transition-all duration-300 fixed ${isPublicHome
        ? isScrolled
            ? 'bg-white border-b shadow-sm'
            : 'bg-transparent'
        : 'bg-white'
        }`;


    return (
        <nav className={navClassName}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="w-[60px] md:w-[120px] h-full">
                        <img className="w-full h-full object-cover" src="/images/logo.png" alt="Logo" />
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-base transition-colors px-2 py-2 duration-200 ${isPublicHome && !isScrolled
                                    ? item.href === location.pathname
                                        ? 'text-white font-semibold'
                                        : 'text-white/80 font-normal hover:text-white'
                                    : item.href === location.pathname
                                        ? 'text-[#181D27] font-semibold'
                                        : 'text-[#717680] font-normal hover:text-[#181D27]'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <ActionButton buttonText="Login" textColor={isPublicHome && !isScrolled ? 'white' : '#414651'} backgroundColor='transparent' paddingX="px-8" attributes={{
                            onClick: () => navigate('/login')
                        }} />
                        <ActionButton buttonText="Book a demo" paddingX="px-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NsNavbar;
