import { FaLinkedin, FaYoutube, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const NsFooter = () => {
    const year = new Date().getFullYear();

    const navigationSections = [
        {
            title: "Construction in Africa",
            links: [
                { label: "Construction News", href: "#" },
                { label: "Construction Market Reports", href: "#" },
                { label: "Construction Project Intelligence", href: "#" }
            ]
        },
        {
            title: "About",
            links: [
                { label: "Contact Us", href: "/contact" },
                { label: "About ConstructAfrica", href: "/about" },
                { label: "Advisory Board", href: "#" }
            ]
        },
        {
            title: "Useful Links",
            links: [
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "GDPR", href: "/gdpr" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Advertise", href: "#" },
                { label: "FAQS", href: "/faqs" },
                { label: "Africa Press Releases", href: "#" }
            ]
        }
    ];

    const socialLinks = [
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
        { icon: FaYoutube, href: "#", label: "YouTube" },
        { icon: FaFacebook, href: "#", label: "Facebook" },
        { icon: FaXTwitter, href: "#", label: "X (Twitter)" }
    ];

    return (
        <footer className='bg-black text-white'>
            {/* Main Footer Content */}
            <div className="py-8 md:py-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Logo Section */}
                    <div className="w-full lg:w-[180px] flex justify-center lg:justify-start">
                        <div className="w-[120px] md:w-[150px] lg:w-[180px] h-auto">
                            <img
                                className='w-full h-full object-contain'
                                src="/images/logo-black.png"
                                alt="Construct Africa Logo"
                            />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
                            {/* Navigation Sections */}
                            {navigationSections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`${section.links.length > 3
                                        ? "sm:col-span-2 lg:col-span-1 xl:col-span-2"
                                        : ""
                                        }`}
                                >
                                    <h3 className="text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4 pb-2 border-b border-[#717680]">
                                        {section.title}
                                    </h3>
                                    <ul className={`space-y-2 lg:space-y-3 ${section.links.length > 3
                                        ? "grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3"
                                        : ""
                                        }`}>
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a
                                                    href={link.href}
                                                    className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Social Media Section */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <h3 className="text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4 pb-2 border-b border-[#717680]">
                                    Follow Us
                                </h3>
                                <div className="flex gap-3 lg:gap-4">
                                    {socialLinks.map((social, index) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={social.href}
                                                className="text-gray-300 hover:text-white transition-colors"
                                                aria-label={social.label}
                                            >
                                                <IconComponent size={18} className="lg:w-5 lg:h-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-[#717680]">
                <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
                    <p className="text-gray-300 text-center text-xs lg:text-sm">
                        Copyright ©{year}. All Rights Reserved CA Digital Marketplace.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default NsFooter