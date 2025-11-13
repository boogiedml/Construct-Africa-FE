const PublicContact = () => {
    return (
        <div className="bg-[#FAFAFA]">
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
                    <h2 className="text-xl sm:text-2xl md:text-[30px] font-bitter font-semibold text-[#181D27] mb-6 sm:mb-8">
                        Office Address
                    </h2>

                    <div className="space-y-4 sm:space-y-6">
                        {/* Physical Address */}
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed">
                            34th & 35th Floor, Al Maqam Tower, Regus ADGM Square, AL Maryah Island Abu Dhabi, UAE
                        </p>

                        {/* Postal Address */}
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed">
                            <span className="font-semibold text-[#535862]">Postal Address:</span> P.O. Box 214597, Jumeirah Post Office Dubai, UAE
                        </p>

                        {/* Telephone */}
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed">
                            <span className="font-semibold text-[#535862]">Telephone:</span>{' '}
                            <a
                                href="tel:+971501597966"
                                className="text-[#535862] hover:text-[#E0891E] hover:underline transition-colors break-all sm:break-normal"
                            >
                                +971 50 1597966
                            </a>
                        </p>

                        {/* Email */}
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] leading-relaxed">
                            <span className="font-semibold text-[#535862]">General Enquiries:</span>{' '}
                            <a
                                href="mailto:hello@constructafrica.com"
                                className="text-[#F89822] underline hover:no-underline transition-colors break-all sm:break-normal"
                            >
                                hello@constructafrica.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicContact;

