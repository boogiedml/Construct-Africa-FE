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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { africanCountries } from '../data/countryMaps';

const getListedFormSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    company: yup.string().required('Company is required'),
    jobTitle: yup.string().required('Job title is required'),
    country: yup.string().required('Country is required'),
    phoneNumber: yup.string(),
    email: yup.string().email('Invalid email address').required('Work email is required'),
});

const GetListedForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            company: '',
            jobTitle: '',
            country: '',
            phoneNumber: '',
            email: '',
        },
        validationSchema: getListedFormSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="First name"
                    isRequired
                    labelFor="firstName"
                    error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : undefined}
                    attributes={{
                        type: "text",
                        name: "firstName",
                        id: "firstName",
                        placeholder: "First name",
                        value: formik.values.firstName,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Last name"
                    isRequired
                    labelFor="lastName"
                    error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : undefined}
                    attributes={{
                        type: "text",
                        name: "lastName",
                        id: "lastName",
                        placeholder: "Last name",
                        value: formik.values.lastName,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Company"
                    isRequired
                    labelFor="company"
                    error={formik.touched.company && formik.errors.company ? formik.errors.company : undefined}
                    attributes={{
                        type: "text",
                        name: "company",
                        id: "company",
                        placeholder: "Company name",
                        value: formik.values.company,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Job title"
                    isRequired
                    labelFor="jobTitle"
                    error={formik.touched.jobTitle && formik.errors.jobTitle ? formik.errors.jobTitle : undefined}
                    attributes={{
                        type: "text",
                        name: "jobTitle",
                        id: "jobTitle",
                        placeholder: "Role in company",
                        value: formik.values.jobTitle,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    options={africanCountries}
                    label="Country"
                    isRequired
                    labelFor="country"
                    error={formik.touched.country && formik.errors.country ? formik.errors.country : undefined}
                    attributes={{
                        name: "country",
                        id: "country",
                        value: formik.values.country,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Phone number"
                    labelFor="phoneNumber"
                    error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : undefined}
                    attributes={{
                        type: "tel",
                        name: "phoneNumber",
                        id: "phoneNumber",
                        placeholder: "+1 (555) 000-0000",
                        value: formik.values.phoneNumber,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <Input
                label="Work email"
                isRequired
                labelFor="email"
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                attributes={{
                    type: "email",
                    name: "email",
                    id: "email",
                    placeholder: "you@company.com",
                    value: formik.values.email,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                }}
            />

            <ActionButton
                buttonText="Request listing"
                backgroundColor="#E0891E"
                textSize="text-sm sm:text-base"
                width="full"
                attributes={{
                    type: "submit",
                }}
            />
        </form>
    );
};

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
    const scrollToForm = () => {
        const scrollableSection = document.getElementById('scrollable-section');
        const formSection = document.getElementById('get-listed-form');

        if (formSection && scrollableSection) {
            const formPosition = formSection.getBoundingClientRect().top;
            const scrollableTop = scrollableSection.getBoundingClientRect().top;
            const offset = 100; // Account for fixed navbar
            const offsetPosition = formPosition - scrollableTop + scrollableSection.scrollTop - offset;

            scrollableSection.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (formSection) {
            // Fallback to window scroll if scrollable-section doesn't exist
            const offset = 100;
            const elementPosition = formSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

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
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 max-md:pt-14 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FFFBFA]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-end mb-6 sm:mb-8 md:mb-10">
                    <div className="order-2 lg:order-1">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-bitter font-semibold text-[#181D27] mb-3 sm:mb-4 leading-tight">
                            Get Listed. <span className="text-[#E0891E]">Get Discovered.</span> Get Ahead.
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-4 sm:mb-6 leading-relaxed">
                            Showcase your company and projects to those who matter. Join the leading platform for construction market intelligence in Africa.
                        </p>

                        <div className="border border-[#D5D7DA] rounded-lg p-4 sm:p-5 md:p-6 bg-white">
                            <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                By listing on ConstructAfrica, you don't just gain visibility — you become discoverable by decision-makers looking for partnerships, suppliers, and local presence across Africa's construction value chain.
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[320px] rounded-lg">
                            <img
                                src="/images/get-listed-01.svg"
                                alt="Modern building with solar panels"
                                className="w-full h-full object-cover"
                            />
                            <div style={{
                                boxShadow: '0px 4px 6px -2px #0A0D1208, 0px 12px 16px -4px #0A0D1214'
                            }}
                                className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -left-2 sm:-left-3 md:-left-4 bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
                                <LuChartLine size={18} className="sm:w-5 sm:h-5 text-[#E0891E]" />
                                <span className="text-sm sm:text-base font-semibold text-[#414651]">300+ Companies Listed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ActionButton
                    buttonText="Request Listing"
                    width="fit"
                    paddingX="px-6 sm:px-8 md:px-10"
                    textSize="text-sm sm:text-base"
                    attributes={{
                        onClick: scrollToForm
                    }}
                />
            </section>

            {/* Why Get Listed Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                        Why Get Listed on ConstructAfrica?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl mx-auto px-2">
                        Join Africa's most trusted construction network and connect with the professionals who drive the industry forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    {featureCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="bg-white border border-[#E9EAEB] rounded-lg p-5 sm:p-6"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${card.iconBgColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                                    <Icon size={24} className={`sm:w-7 sm:h-7 md:w-8 md:h-8 ${card.iconColor}`} />
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#181D27] mb-2 sm:mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-8 sm:mt-10 md:mt-12">
                    <ActionButton
                        buttonText="Request Listing"
                        width="fit"
                        paddingX="px-6 sm:px-8 md:px-10"
                        textSize="text-sm sm:text-base"
                        attributes={{
                            onClick: scrollToForm
                        }}
                    />
                </div>
            </section>

            {/* Who Can List Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FDFDFD]">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                        Who Can List?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl mx-auto px-2">
                        Every construction stakeholder involved in or looking for Africa's construction sector is welcome to join. Whether you're active in one or more countries, your footprint matters.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10">
                    {categoryCards.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.label}
                                style={{
                                    boxShadow: '0px 1px 2px 0px #0A0D120F, 0px 1px 3px 0px #0A0D121A'
                                }}
                                className="bg-white border border-[#E9EAEB] rounded-lg p-4 sm:p-5 md:p-6 pt-6 sm:pt-7 md:pt-8 flex flex-col items-center text-center"
                            >
                                <Icon size={32} className={`sm:w-9 sm:h-9 md:w-10 md:h-10 ${category.iconColor}`} />
                                <p className="text-xs sm:text-sm md:text-base font-medium text-[#181D27] mt-3 sm:mt-4">
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
                        paddingX="px-6 sm:px-8 md:px-10"
                        textSize="text-sm sm:text-base"
                        attributes={{
                            onClick: scrollToForm
                        }}
                    />
                </div>
            </section>

            {/* How to Get Started Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                            How to Get Started
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl mx-auto px-2">
                            Three simple steps to join Africa's leading construction network
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="flex flex-col items-center text-center"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${step.circleColor} rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6`}>
                                    <span className="text-xl sm:text-2xl font-bold text-white">{step.number}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-[#181D27] mb-2 sm:mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base text-[#535862] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Your Information is Safe Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#F6FEF9]">
                <div className="max-w-5xl mx-auto">
                    <div style={{
                        boxShadow: '0px 1px 2px 0px #0A0D120F, 0px 1px 3px 0px #0A0D121A'
                    }}
                        className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-6 sm:p-8 md:p-10 lg:p-12">
                        <div className="text-center mb-8 sm:mb-10">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#EBF4FC] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                                <FiInfo size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#3A8DDE]" strokeWidth={1} />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight px-2">
                                Your Information is Safe
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-2">
                                We do not publish or share your details or proprietary information in the public domain, or without your consent. Your privacy and business confidentiality are our priority.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                            {securityFeatures.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={feature.title}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <Icon size={24} className={`sm:w-6 sm:h-6 md:w-7 md:h-7 ${feature.iconColor}`} />
                                        <h3 className="text-base sm:text-lg font-semibold text-[#181D27] mt-3 sm:mt-4 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#535862]">
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="get-listed-form" className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-0 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="hidden lg:block relative w-full lg:flex-1 order-2 lg:order-1">
                        <img src="/images/map-illustration.svg" alt="Let's Construct Africa Together" className="w-full h-auto object-cover" />
                    </div>

                    <div className="w-full lg:flex-1 order-1 lg:order-2">
                        <div className="max-w-lg mx-auto lg:mx-0">
                            <div className="mb-8 sm:mb-10 md:mb-12 text-center lg:text-left">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight">
                                    Get Listed Today.
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-4 sm:mb-6 leading-relaxed">
                                    Get discovered by those who matter today.
                                </p>
                            </div>

                            <GetListedForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicGetListed;

