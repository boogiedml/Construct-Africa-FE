import { useMemo } from 'react';
import { FaLinkedin } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';

export interface AdvisoryBoardMember {
    name: string;
    title: string;
    biography: string;
    image: string;
    linkedin?: string;
    id?: string;
}

const AdvisoryBoard = () => {
    const chairman: AdvisoryBoardMember = useMemo(() => ({
        id: "dr-nelson-ogunshakin",
        name: "Dr Nelson Ogunshakin FREng, OBE",
        title: "Chair of AEO Group & HS2 Ltd Board Director",
        biography: "Accomplished dynamic corporate executive, visionary business leader, strategic negotiator, with over 35 years' global experiences in infrastructure investment planning, finance, procurement, delivery, and asset management experts. As Chairman of the ConstructAfrica Industry Advisory Board, he provides strategic leadership and guidance to advance construction intelligence across the African continent.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
        linkedin: "#",
        readMoreLink: "#"
    }), []);

    const viceChairman: AdvisoryBoardMember = useMemo(() => ({
        id: "dr-nelson-ogunshakin",
        name: "Dr Nelson Ogunshakin FREng, OBE",
        title: "Chair of AEO Group & HS2 Ltd Board Director",
        biography: "Accomplished dynamic corporate executive, visionary business leader, strategic negotiator, with over 35 years' global experiences in infrastructure investment planning, finance, procurement, delivery, and asset management experts. As Chairman of the ConstructAfrica Industry Advisory Board, he provides strategic leadership and guidance to advance construction intelligence across the African continent.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
        linkedin: "#",
        readMoreLink: "#"
    }), []);

    const members: AdvisoryBoardMember[] = useMemo(() => [
        {
            id: "chris-campbell",
            name: "Chris Campbell",
            title: "Chief Executive Officer, Consulting Engineers South Africa (CESA)",
            biography: "Chris Campbell brings over four decades of experience in the engineering industry. At CESA, he promotes engineering excellence and professional development across South Africa.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
            linkedin: "#",
            readMoreLink: "#"
        },
        {
            id: "derreck-omath",
            name: "Derreck Omath",
            title: "Director General, Seychelles Infrastructure Agency",
            biography: "Derreck Omath oversees the planning and execution of national infrastructure projects in Seychelles, bringing strategic vision to infrastructure development across the region.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
            linkedin: "#",
            readMoreLink: "#"
        },
        {
            id: "dr-olubukola-tokede",
            name: "Dr. Olubukola (Bukky) O. Tokede",
            title: "Co-Founder and Convenor of the African LCA Initiative (ALIES)",
            biography: "Dr. Tokede is a Senior Lecturer and Associate Head of School at Deakin University, Australia, with over a decade of experience in sustainable construction and life cycle assessment.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
            linkedin: "#",
            readMoreLink: "#"
        },
        {
            id: "dr-segun-faniran",
            name: "Dr. Segun Faniran",
            title: "Founder & Publisher, ConstructAfrica",
            biography: "Dr. Faniran is the Founder & Publisher of ConstructAfrica, a thought leader in the African construction industry, and a civil engineer with over 30 years of international experience.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
            linkedin: "#",
            readMoreLink: "#"
        }
    ], []);

    const renderProfileCard = (member: AdvisoryBoardMember, isHorizontal: boolean = false) => {
        if (isHorizontal) {
            return (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium font-bitter text-[#181D27] mb-2">
                            {member.name}
                        </h3>
                        <p className="text-sm sm:text-base text-[#E0891E] mb-3 sm:mb-4 font-medium">
                            {member.title}
                        </p>
                        <p className="text-sm sm:text-base text-[#535862] leading-relaxed mb-3 sm:mb-4">
                            {member.biography}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0077B5] hover:text-[#005885] transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
                                </a>
                            )}
                            {member.id && (
                                <a
                                    href={`/advisory-board/${member.id}`}
                                    className="flex items-center gap-2 text-[#E0891E] hover:text-[#C77A1A] transition-colors text-xs sm:text-sm font-medium"
                                >
                                    Read more
                                    <FiArrowRight className='-rotate-45 w-4 h-4 sm:w-[18px] sm:h-[18px]' />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-48 w-full sm:h-56 md:h-64 lg:h-72 rounded-lg object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-[#181D27] mb-1.5 sm:mb-2">
                        {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#AE6A19] mb-2 sm:mb-3 md:mb-4 font-medium">
                        {member.title}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-[#535862] leading-relaxed mb-3 sm:mb-4">
                        {member.biography}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0077B5] hover:text-[#005885] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
                            </a>
                        )}
                        {member.id && (
                            <a
                                href={`/advisory-board/${member.id}`}
                                className="flex items-center gap-2 text-[#E0891E] hover:text-[#C77A1A] transition-colors text-xs sm:text-sm font-medium"
                            >
                                Read more
                                <FiArrowRight className='-rotate-45 w-4 h-4 sm:w-[18px] sm:h-[18px]' />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs sm:text-sm md:text-base text-[#414651] mb-2 sm:mb-3 uppercase tracking-wide px-2">
                        The Advisory Board
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 sm:mb-4 leading-tight px-2">
                        Meet the ConstructAfrica Industry Advisory Board (CIAB)
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed max-w-2xl mx-auto px-2">
                        With over 200 years of combined experience, our advisory board ensures that ConstructAfrica always heads in the right direction.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 xl:space-y-40">
                {/* Chairman Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-bitter text-[#181D27] mb-4 sm:mb-5 md:mb-6">
                        Chairman, Advisory Board
                    </h2>
                    {renderProfileCard(chairman, true)}
                </div>

                {/* Vice Chairman Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-bitter text-[#181D27] mb-4 sm:mb-5 md:mb-6">
                        Vice Chairman, Advisory Board
                    </h2>
                    {renderProfileCard(viceChairman, true)}
                </div>

                {/* Members Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-bitter text-[#181D27] mb-4 sm:mb-5 md:mb-6">
                        Members, Advisory Board
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {members.map((member, index) => (
                            <div key={index}>
                                {renderProfileCard(member, false)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdvisoryBoard;
