import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';

const PublicGDPR = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const gdprContent = useMemo(() => `
        <h2>GDPR COMPLIANCE.</h2>
        <p>ConstructAfrica is committed to protecting your privacy and ensuring compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679. This GDPR Policy explains how we collect, use, store, and protect your personal data in accordance with GDPR requirements.</p>

        <h2>DATA CONTROLLER.</h2>
        <p>ConstructAfrica acts as the data controller for the personal data we collect and process. If you have any questions about this policy or how we handle your personal data, please contact us at info@constructafrica.com.</p>

        <h2>LEGAL BASIS FOR PROCESSING.</h2>
        <p>We process your personal data based on the following legal grounds:</p>
        <p><strong>Consent:</strong> When you have given clear consent for us to process your personal data for specific purposes.</p>
        <p><strong>Contract:</strong> When processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.</p>
        <p><strong>Legal Obligation:</strong> When processing is necessary for compliance with a legal obligation to which we are subject.</p>
        <p><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests or those of a third party, provided your interests and fundamental rights do not override those interests.</p>

        <h2>YOUR RIGHTS UNDER GDPR.</h2>
        <p>As a data subject, you have the following rights:</p>
        <p><strong>Right of Access:</strong> You have the right to request access to your personal data and obtain information about how we process it.</p>
        <p><strong>Right to Rectification:</strong> You have the right to request correction of inaccurate or incomplete personal data.</p>
        <p><strong>Right to Erasure ("Right to be Forgotten"):</strong> You have the right to request deletion of your personal data under certain circumstances.</p>
        <p><strong>Right to Restrict Processing:</strong> You have the right to request restriction of processing of your personal data.</p>
        <p><strong>Right to Data Portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</p>
        <p><strong>Right to Object:</strong> You have the right to object to processing of your personal data, including for direct marketing purposes.</p>
        <p><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you have the right to withdraw consent at any time.</p>

        <h2>HOW TO EXERCISE YOUR RIGHTS.</h2>
        <p>To exercise any of your rights, please contact us at info@constructafrica.com. We will respond to your request within one month of receipt. If your request is complex or we receive multiple requests, we may extend this period by up to two months, and we will inform you of any such extension.</p>

        <h2>DATA COLLECTION AND USE.</h2>
        <p>We collect and process personal data for the following purposes:</p>
        <p>To provide and improve our services</p>
        <p>To process your orders and manage your account</p>
        <p>To communicate with you about our services, updates, and promotional offers</p>
        <p>To comply with legal obligations</p>
        <p>To protect our legitimate business interests</p>
        <p>For more detailed information about the data we collect, please refer to our Privacy Policy.</p>

        <h2>DATA RETENTION.</h2>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. When determining the appropriate retention period, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, and the purposes for which we process the data.</p>

        <h2>DATA SECURITY.</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>DATA TRANSFERS.</h2>
        <p>If we transfer your personal data outside the European Economic Area (EEA), we ensure that appropriate safeguards are in place, such as standard contractual clauses approved by the European Commission, or that the recipient country has been deemed to provide an adequate level of data protection.</p>

        <h2>COOKIES AND TRACKING TECHNOLOGIES.</h2>
        <p>We use cookies and similar tracking technologies to collect and store information about your preferences and usage of our website. For more information about our use of cookies, please refer to our Cookie Policy.</p>

        <h2>CHILDREN'S DATA.</h2>
        <p>Our services are not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16. If we become aware that we have collected personal data from a child under 16, we will take steps to delete such information promptly.</p>

        <h2>DATA BREACH NOTIFICATION.</h2>
        <p>In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant supervisory authority without undue delay, and in any event within 72 hours of becoming aware of the breach, where feasible.</p>

        <h2>SUPERVISORY AUTHORITY.</h2>
        <p>If you are not satisfied with our response to your data protection concerns, you have the right to lodge a complaint with your local supervisory authority. For UK residents, this is the Information Commissioner's Office (ICO).</p>

        <h2>UPDATES TO THIS POLICY.</h2>
        <p>We may update this GDPR Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.</p>

        <h2>CONTACT US.</h2>
        <p>If you have any questions, concerns, or requests regarding this GDPR Policy or our data processing practices, please contact us at:</p>
        <p>Email: info@constructafrica.com</p>
        <p>We are committed to protecting your privacy and ensuring your rights under GDPR are respected.</p>
    `, []);

    const filteredContent = useMemo(() => {
        if (!searchQuery.trim()) return gdprContent;

        const query = searchQuery.toLowerCase();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = gdprContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';

        if (text.toLowerCase().includes(query)) {
            return gdprContent;
        }
        return '';
    }, [gdprContent, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10  max-md:pt-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm sm:text-base text-[#414651] mb-2 uppercase tracking-wide">
                        GDPR
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        GDPR Compliance
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Here is how we ensure GDPR compliance and protect your data at ConstructAfrica.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-[320px] mx-auto relative">
                        <FiSearch
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4A7AE]"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 border border-[#E9EAEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E0891E] focus:border-transparent text-[#181D27]"
                        />
                    </div>
                </div>
            </section>

            {/* GDPR Content Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    {filteredContent ? (
                        <div
                            className="prose prose-lg max-w-none text-base text-[#535862] leading-relaxed [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862] [&>a]:text-[#E0891E] [&>a]:underline [&>a]:hover:no-underline [&>strong]:font-semibold [&>strong]:text-[#181D27]"
                            dangerouslySetInnerHTML={{ __html: filteredContent }}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-base sm:text-lg text-[#535862]">
                                No content found matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Get Listed CTA Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-4 leading-tight">
                        Get listed
                    </h2>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Get a competitive edge with Construct Africa. Join thousands of companies making data-driven decisions.
                    </p>
                    <div className="max-w-md mx-auto">
                        <ActionButton
                            buttonText="Get Listed"
                            width="full"
                            paddingX="px-8"
                            backgroundColor="#E0891E"
                            link="/get-listed"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicGDPR;

