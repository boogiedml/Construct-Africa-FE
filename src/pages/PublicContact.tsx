import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const PublicContact = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        Contact Us
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        Want To Get In Touch?
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        <a
                            href="/refund-policy"
                            className="text-[#535862] hover:text-[#E0891E] transition-colors underline"
                        >
                            Read about the ConstructAfrica refund guidelines.
                        </a>
                    </p>
                </div>
            </section>

            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bitter font-semibold text-[#181D27] mb-8 text-center">
                        Office Address
                    </h2>

                    <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 space-y-6">
                        {/* Physical Address */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiMapPin size={24} className="text-[#E0891E]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base sm:text-lg text-[#535862] leading-relaxed">
                                    34th & 35th Floor, Al Maqam Tower, Regus ADGM Square, AL Maryah Island Abu Dhabi, UAE
                                </p>
                            </div>
                        </div>

                        {/* Postal Address */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiMapPin size={24} className="text-[#E0891E]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base sm:text-lg text-[#535862] leading-relaxed">
                                    <span className="font-semibold text-[#181D27]">Postal Address:</span> P.O. Box 214597, Jumeirah Post Office Dubai, UAE
                                </p>
                            </div>
                        </div>

                        {/* Telephone */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiPhone size={24} className="text-[#E0891E]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base sm:text-lg text-[#535862] leading-relaxed">
                                    <span className="font-semibold text-[#181D27]">Telephone:</span>{' '}
                                    <a
                                        href="tel:+971501597966"
                                        className="text-[#E0891E] hover:underline transition-colors"
                                    >
                                        +971 50 1597966
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiMail size={24} className="text-[#E0891E]" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base sm:text-lg text-[#535862] leading-relaxed">
                                    <span className="font-semibold text-[#181D27]">General Enquiries:</span>{' '}
                                    <a
                                        href="mailto:hello@constructafrica.com"
                                        className="text-[#E0891E] hover:underline transition-colors"
                                    >
                                        hello@constructafrica.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicContact;

