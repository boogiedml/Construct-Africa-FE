import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';

const PublicRefund = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const refundContent = useMemo(() => `
        <h2>REFUND POLICY.</h2>
        <p>At ConstructAfrica, we are committed to providing high-quality services and ensuring customer satisfaction. This Refund Policy outlines the terms and conditions under which refunds may be issued.</p>

        <h2>ELIGIBILITY FOR REFUNDS.</h2>
        <p>Refunds may be considered under the following circumstances:</p>
        <p>If you are not satisfied with our services and request a refund within 30 days of purchase, we will review your request on a case-by-case basis.</p>
        <p>If there is a technical issue or error on our part that prevents you from accessing or using the service you purchased, you may be eligible for a full refund.</p>
        <p>If you have been charged incorrectly or multiple times for the same service, we will issue a full refund for the duplicate charges.</p>

        <h2>REFUND PROCESS.</h2>
        <p>To request a refund, please contact us at info@constructafrica.com with the following information:</p>
        <p>Your account information (name and email address used for purchase)</p>
        <p>Order number or transaction ID</p>
        <p>Reason for refund request</p>
        <p>Any relevant documentation or screenshots</p>
        <p>We will review your request within 5-7 business days and notify you of our decision via email.</p>

        <h2>REFUND METHODS.</h2>
        <p>If your refund request is approved, we will process the refund using the same payment method you used for the original purchase. Refunds may take 7-14 business days to appear in your account, depending on your financial institution.</p>

        <h2>NON-REFUNDABLE ITEMS.</h2>
        <p>The following items are generally not eligible for refunds:</p>
        <p>Services that have been fully utilized or accessed</p>
        <p>Digital products that have been downloaded or accessed</p>
        <p>Services purchased more than 30 days ago</p>
        <p>Custom or personalized services that have been completed</p>

        <h2>PARTIAL REFUNDS.</h2>
        <p>In some cases, we may offer partial refunds based on the extent of service usage or specific circumstances. This will be determined on a case-by-case basis.</p>

        <h2>CANCELLATION POLICY.</h2>
        <p>You may cancel your subscription or service at any time. Cancellation will take effect at the end of your current billing period. No refunds will be issued for the remaining period of an active subscription unless otherwise specified in your service agreement.</p>

        <h2>DISPUTES.</h2>
        <p>If you are not satisfied with our refund decision, you may contact us to discuss your concerns. We are committed to resolving disputes fairly and promptly.</p>

        <h2>CHANGES TO THIS POLICY.</h2>
        <p>ConstructAfrica reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on this page. We encourage you to review this policy periodically.</p>

        <h2>CONTACT US.</h2>
        <p>If you have any questions about this Refund Policy, please contact us at info@constructafrica.com.</p>
    `, []);

    const filteredContent = useMemo(() => {
        if (!searchQuery.trim()) return refundContent;
        
        const query = searchQuery.toLowerCase();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = refundContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        
        if (text.toLowerCase().includes(query)) {
            return refundContent;
        }
        return '';
    }, [refundContent, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        Refund Policy
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        Refund Policy
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Here are the terms and conditions that guide our refund policy at ConstructAfrica.
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

            {/* Refund Content Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    {filteredContent ? (
                        <div 
                            className="prose prose-lg max-w-none text-base text-[#535862] leading-relaxed [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-semibold [&>h2]:text-[#181D27] [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0 [&>p]:mb-4 [&>p]:text-[#535862] [&>a]:text-[#E0891E] [&>a]:underline [&>a]:hover:no-underline"
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

export default PublicRefund;

