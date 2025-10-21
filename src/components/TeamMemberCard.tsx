import React from "react";
import { BsDribbble, BsLinkedin, BsTwitterX } from "react-icons/bs";

interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
    return (
        <div className="flex flex-col items-center bg-[#FAFAFA] p-8">
            <img
                src={member.image}
                alt={member.name}
                className="w-[96px] h-[96px] rounded-full object-cover mb-4"
            />
            <h3 className="text-[18px] font-semibold text-[#181D27]">{member.name}</h3>
            <p className="text-base text-[#AE6A19] mb-2">{member.role}</p>
            <p className="text-center text-[#535862] text-base leading-relaxed mb-4">{member.description}</p>

            <div className="flex items-center gap-4">
                <a href={member.twitter || "#"} target="_blank" rel="noopener noreferrer">
                    <BsTwitterX size={20} color="#A4A7AE" />
                </a>
                <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                    <BsLinkedin size={20} color="#A4A7AE" />
                </a>
                <a href={member.dribbble || "#"} target="_blank" rel="noopener noreferrer">
                    <BsDribbble size={20} color="#A4A7AE" />
                </a>
            </div>
        </div>
    );
};

export default TeamMemberCard;
