const Footer = () => {
    const navItems = [
        { name: 'News', href: '/news' },
        { name: 'Market Reports', href: '/report' },
        { name: 'Project Intelligence', href: '/project' },
    ];

    const year = new Date().getFullYear()

    return (
        <footer className='bg-[#0A0D12] text-white flex flex-col md:flex-row max-md:gap-10 items-center justify-between py-8 md:py-10 px-4 sm:px-6 lg:px-20'>
            <div className="w-[60px] md:w-[80px] h-full">
                <img className='w-full h-full object-cover' src="/images/logo-black.png" alt="" />
            </div>
            <div className="flex flex-col items-center gap-3 md:gap-5">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={`text-sm md:text-base transition-colors px-2 py-2 font-medium duration-200 ${item.href === location.pathname
                            ? 'text-white'
                            : 'text-[#A4A7AE]'
                            }`}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            <div className="text-[#A4A7AE] text-sm md:text-base font-normal">
                © {year} Construct Africa
            </div>
        </footer>
    )
}

export default Footer