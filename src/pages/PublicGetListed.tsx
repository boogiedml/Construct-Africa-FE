import { FiSearch, FiShield, FiGlobe, FiInfo } from 'react-icons/fi';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { LuChartLine } from 'react-icons/lu';
import ActionButton from '../components/ActionButton';
import { useMemo } from 'react';
import type { IconType } from 'react-icons';
import { Input, Select } from '../components';
import { BiSolidLockAlt } from 'react-icons/bi';
import { HiMiniEyeSlash } from 'react-icons/hi2';
import { FaBuilding, FaDraftingCompass, FaHandshake, FaHardHat, FaTruck, FaUserCheck } from 'react-icons/fa';

interface FeatureCard {
    icon: IconType;
    title: string;
    description: string;
    iconBgColor: string;
    iconColor: string;
}

interface CategoryCard {
    icon: IconType;
    label: string;
    iconColor: string;
}

interface StepCard {
    number: number;
    title: string;
    description: string;
    circleColor: string;
}

interface SecurityFeature {
    icon: IconType;
    title: string;
    subtitle: string;
    iconColor: string;
}

const PublicGetListed = () => {
    const featureCards: FeatureCard[] = useMemo(() => [
        {
            icon: FiSearch,
            title: 'Be Found by the Right People',
            description: 'Decision-makers across the African construction industry use ConstructAfrica to discover partners. Showcase your work where it can be seen.',
            iconBgColor: 'bg-[#FEF3F2]',
            iconColor: 'text-[#F89822]'
        },
        {
            icon: FiShield,
            title: 'Build Credibility and Trust',
            description: 'Demonstrate your involvement in projects and build trust. Increase your prequalification chances and strengthen your company\'s profile across the industry.',
            iconBgColor: 'bg-[#EBF4FC]',
            iconColor: 'text-[#3A8DDE]'
        },
        {
            icon: FiGlobe,
            title: 'Join a Trusted African Network',
            description: 'Connect to a network of industry professionals. Join the only market intelligence platform focused exclusively on construction in Africa.',
            iconBgColor: 'bg-[#F6FEF9]',
            iconColor: 'text-[#12B76A]'
        },
        {
            icon: PiCurrencyCircleDollar,
            title: 'No Cost. High Return',
            description: 'Get listed for free. Simply provide your company details and project portfolio, and we\'ll amplify your reach across the African construction industry.',
            iconBgColor: 'bg-[#E6E7EF]',
            iconColor: 'text-[#000A61]'
        }
    ], []);

    const categoryCards: CategoryCard[] = useMemo(() => [
        {
            icon: FaBuilding,
            label: 'Project Owners',
            iconColor: 'text-[#F89822]'
        },
        {
            icon: FaHardHat,
            label: 'Contractors',
            iconColor: 'text-[#3A8DDE]'
        },
        {
            icon: FaDraftingCompass,
            label: 'Consultants',
            iconColor: 'text-[#12B76A]'
        },
        {
            icon: FaTruck,
            label: 'Suppliers',
            iconColor: 'text-[#000A61]'
        },
        {
            icon: FaHandshake,
            label: 'Investors',
            iconColor: 'text-[#F89822]'
        }
    ], []);

    const steps: StepCard[] = useMemo(() => [
        {
            number: 1,
            title: 'Fill the Form',
            description: 'Complete our short form with your company and project details. It takes less than 5 minutes.',
            circleColor: 'bg-[#F89822]'
        },
        {
            number: 2,
            title: 'We Review & Publish',
            description: 'Our team will review and publish your profile within 48 hours, ensuring quality and accuracy.',
            circleColor: 'bg-[#3A8DDE]'
        },
        {
            number: 3,
            title: 'Get Discovered',
            description: 'Be discovered by hundreds of active subscribers looking for trusted construction partners.',
            circleColor: 'bg-[#12B76A]'
        }
    ], []);

    const securityFeatures: SecurityFeature[] = useMemo(() => [
        {
            icon: BiSolidLockAlt,
            title: 'Secure Data',
            subtitle: 'Enterprise-grade security',
            iconColor: 'text-[#F89822]'
        },
        {
            icon: HiMiniEyeSlash,
            title: 'Private Details',
            subtitle: 'Contact info stays private',
            iconColor: 'text-[#3A8DDE]'
        },
        {
            icon: FaUserCheck,
            title: 'Your Consent',
            subtitle: 'You control what\'s shared',
            iconColor: 'text-[#12B76A]'
        }
    ], []);

    return (
        <div className="min-h-screen bg-white">
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FFFBFA]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-10">
                    <div className="order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                            Get Listed. <span className="text-[#E0891E]">Get Discovered.</span> Get Ahead.
                        </h1>
                        <p className="text-base sm:text-lg text-[#535862] mb-6 leading-relaxed">
                            Showcase your company and projects to those who matter. Join the leading platform for construction market intelligence in Africa.
                        </p>

                        <div className="border border-[#D5D7DA] rounded-lg p-6 bg-white">
                            <p className="text-base text-[#535862] leading-relaxed">
                                By listing on ConstructAfrica, you don't just gain visibility — you become discoverable by decision-makers looking for partnerships, suppliers, and local presence across Africa's construction value chain.
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="relative w-full h-[400px] lg:h-[320px] rounded-lg">
                            <img
                                src="/images/get-listed-01.svg"
                                alt="Modern building with solar panels"
                                className="w-full h-full object-cover"
                            />
                            <div style={{
                                boxShadow: '0px 4px 6px -2px #0A0D1208, 0px 12px 16px -4px #0A0D1214'
                            }}
                                className="absolute -bottom-5 -left-4 bg-white rounded-lg px-4 py-3 flex items-center gap-3">
                                <LuChartLine size={20} className="text-[#E0891E]" />
                                <span className="text-base font-semibold text-[#414651]">300+ Companies Listed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ActionButton
                    buttonText="Request Listing"
                    width="fit"
                    paddingX="px-10"
                />
            </section>

            {/* Why Get Listed Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                        Why Get Listed on ConstructAfrica?
                    </h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-12 leading-relaxed max-w-2xl mx-auto">
                        Join Africa's most trusted construction network and connect with the professionals who drive the industry forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
                    {featureCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="bg-white border border-[#E9EAEB] rounded-lg p-6 lg:py-8xx"
                            >
                                <div className={`w-[64px] h-[64px] ${card.iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
                                    <Icon size={32} className={card.iconColor} />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-[#181D27] mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-base text-[#535862] leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-12">
                    <ActionButton
                        buttonText="Request Listing"
                        width="fit"
                        paddingX="px-10"
                    />
                </div>
            </section>

            {/* Who Can List Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FDFDFD]">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                        Who Can List?
                    </h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-12 leading-relaxed max-w-2xl mx-auto">
                        Every construction stakeholder involved in or looking for Africa's construction sector is welcome to join. Whether you're active in one or more countries, your footprint matters.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10">
                    {categoryCards.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.label}
                                style={{
                                    boxShadow: '0px 1px 2px 0px #0A0D120F, 0px 1px 3px 0px #0A0D121A'
                                }}
                                className="bg-white border border-[#E9EAEB] rounded-lg p-6 pt-8 flex flex-col items-center text-center"
                            >
                                <Icon size={42} className={category.iconColor} />
                                <p className="text-base font-medium text-[#181D27] mt-4">
                                    {category.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <ActionButton
                        buttonText="Request Listing"
                        width="fit"
                        paddingX="px-10"
                    />
                </div>
            </section>

            {/* How to Get Started Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                            How to Get Started
                        </h2>
                        <p className="text-base sm:text-lg text-[#535862] mb-12 leading-relaxed max-w-2xl mx-auto">
                            Three simple steps to join Africa's leading construction network
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="flex flex-col items-center text-center"
                            >
                                <div className={`w-[64px] h-[64px] ${step.circleColor} rounded-full flex items-center justify-center mb-6`}>
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#181D27] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-base text-[#535862] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Your Information is Safe Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#F6FEF9]">
                <div className="max-w-5xl mx-auto">
                    <div style={{
                        boxShadow: '0px 1px 2px 0px #0A0D120F, 0px 1px 3px 0px #0A0D121A'
                    }}
                        className="bg-white rounded-4xl p-8 md:p-12">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-[#EBF4FC] rounded-full flex items-center justify-center mx-auto mb-8">
                                <FiInfo size={32} className="text-[#3A8DDE]" strokeWidth={1} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">
                                Your Information is Safe
                            </h2>
                            <p className="text-base sm:text-lg text-[#535862] mb-12 leading-relaxed max-w-2xl mx-auto">
                                We do not publish or share your details or proprietary information in the public domain, or without your consent. Your privacy and business confidentiality are our priority.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {securityFeatures.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={feature.title}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <Icon size={28} className={feature.iconColor} />
                                        <h3 className="text-lg font-semibold text-[#181D27] mt-4 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-[#535862]">
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-md:py-10 px-5 sm:px-10 lg:px-20">
                <div className="flex gap-20 items-center">
                    <div className="relative flex-1">
                        <div className="absolute inset-0"></div>
                        <img src="/images/map-illustration.svg" alt="Let's Construct Africa Together" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                        <div className="max-w-lg">

                            <div className="mb-12 max-w-3xl mx-auto">
                                <h2 className="text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 leading-tight">Get Listed Today.</h2>
                                <p className="text-lg text-[#535862] mb-6 leading-relaxed">
                                    Get discovered by those who matter today.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="First name" attributes={{
                                        type: "text",
                                        placeholder: "First name",
                                    }} />

                                    <Input label="Last name" attributes={{
                                        type: "text",
                                        placeholder: "Last name",
                                    }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="Company" attributes={{
                                        type: "text",
                                        placeholder: "Company name",
                                    }} />

                                    <Input label="Job title" attributes={{
                                        type: "text",
                                        placeholder: "Role in company",
                                    }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select options={[
                                        { value: "NG", label: "Nigeria" },
                                        { value: "ZA", label: "South Africa" },
                                        { value: "KE", label: "Kenya" },
                                        { value: "GH", label: "Ghana" },
                                        { value: "EG", label: "Egypt" },
                                    ]}
                                        label="Country"
                                    />

                                    <Input label="Phone number" attributes={{
                                        type: "tel",
                                        placeholder: "+1 (555) 000-0000",
                                    }} />
                                </div>

                                <Input label="Work email"
                                    attributes={{
                                        type: "email",
                                        placeholder: "you@company.com",
                                    }} />

                                <ActionButton
                                    buttonText="Request listing"
                                    backgroundColor="#E0891E"
                                    textSize="text-base"
                                    width="full"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicGetListed;

