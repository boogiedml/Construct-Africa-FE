import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';

const PublicPrivacy = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const privacyContent = useMemo(() => `
        <h2>INFORMATION GATHERED BY www.constructafrica.com.</h2>
        <p>This privacy policy applies to www.constructafrica.com. This policy covers how ConstructAfrica treats personal information that ConstructAfrica collects and receives, including information related to your past use of ConstructAfrica products and services. Personal information is information about you that is personally identifiable like your name, address, email address, or phone number, and that is not otherwise publicly available.</p>
        <p>This policy does not apply to the practices of companies that ConstructAfrica does not own or control, or to people that ConstructAfrica does not employ or manage. In addition, certain ConstructAfrica associated companies such as ConstructAfrica have their own privacy statements which can be viewed by clicking on the links.</p>
        <p>www.constructafrica.com collects anonymous data when users visit the site, such as the number of visits per page, the length of stay per page, and common paths through the site. This information is collected to help ConstructAfrica improve the content and navigation of the site.</p>
        <p>www.constructafrica.com collects personally identifiable information when you register with www.constructafrica.com, when you use www.constructafrica.com products or services, when you visit www.constructafrica.com pages or the pages of certain ConstructAfrica partners, and when you enter promotions or sweepstakes. www.constructafrica.com may also receive personally identifiable information from our business partners.</p>
        <p>When you register with www.constructafrica.com, we ask for your name, email address, zip code, occupation, industry, and personal ConstructAfrica interests. Once you register with www.constructafrica.com and sign in to our services, you are not anonymous to us.</p>
        <p>www.constructafrica.com also automatically receives and records information on our server logs from your browser including your IP address, www.constructafrica.com cookie information, and the page you requested.</p>
        <p>www.constructafrica.com uses information for three general purposes: to customize the advertising and content you see, to fulfill your requests for certain products and services, and to contact you about specials and new products.</p>

        <h2>COOKIES.</h2>
        <p>www.constructafrica.com may set and access www.constructafrica.com cookies on your computer. www.constructafrica.com lets other companies that show advertisements on some of our pages set and access their cookies on your computer. Other companies' use of their cookies is subject to their own privacy policies, not this one. Advertisers or other companies do not have access to www.constructafrica.com's cookies.</p>
        <p>www.constructafrica.com uses web beacons to access www.constructafrica.com cookies inside and outside our network of web sites and in connection with www.constructafrica.com products and services.</p>

        <h2>USE AND DISCLOSURE OF INFORMATION.</h2>
        <p>www.constructafrica.com does not rent, sell, or share personal information about you with other people or nonaffiliated companies except to provide products or services you've requested, when we have your permission, or under the following circumstances:</p>
        <p>We provide the information to trusted partners who work on behalf of or with www.constructafrica.com under confidentiality agreements. These companies may use your personal information to help www.constructafrica.com communicate with you about offers from www.constructafrica.com and our marketing partners. However, these companies do not have any independent right to share this information.</p>
        <p>We respond to subpoenas, court orders, or legal process, or to establish or exercise our legal rights or defend against legal claims.</p>
        <p>We believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of www.constructafrica.com's terms of use, or as otherwise required by law.</p>
        <p>We transfer information about you if www.constructafrica.com is acquired by or merged with another company. In this event, www.constructafrica.com will notify you before information about you is transferred and becomes subject to a different privacy policy.</p>
        <p>www.constructafrica.com displays targeted advertisements based on personal information. Advertisers (including ad serving companies) may assume that people who interact with, view, or click on targeted ads meet the targeting criteria - for example, women ages 18-24 from a particular geographic area.</p>
        <p>www.constructafrica.com does not provide any personal information to the advertiser when you interact with or view a targeted ad. However, by interacting with or viewing an ad you are consenting to the possibility that the advertiser will make the assumption that you meet the targeting criteria used to display the ad.</p>
        <p>www.constructafrica.com advertisers include financial service providers (such as banks, insurance agents, stock brokers and mortgage lenders) and non-financial companies (such as stores, airlines, and software companies).</p>
        <p>www.constructafrica.com works with vendors, partners, advertisers, and other service providers in different industries and categories of business. For more information regarding providers of services or products that may be of interest to you, click on the links to their sites.</p>
        <p>www.constructafrica.com does not sell, trade, or rent your personal information to others. www.constructafrica.com may provide aggregate statistics about our customers, sales, traffic patterns, and related site information to reputable third-party vendors, but these statistics will not include personally identifying information.</p>
        <p>www.constructafrica.com may release account information when we believe, in good faith, that such release is reasonably necessary to (i) comply with law, (ii) enforce or apply the terms of any of our user agreements or (iii) protect the rights, property or safety of www.constructafrica.com, our users, or others.</p>

        <h2>OTHER WEBSITES.</h2>
        <p>www.constructafrica.com is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties, different rules regarding the collection and use of your personal information may apply. We strongly suggest you review such third party's privacy policies before providing any data to them. We are not responsible for the policies or practices of third parties. Please contact those vendors and others directly if you have any questions about their privacy policies.</p>

        <h2>SECURITY.</h2>
        <p>www.constructafrica.com takes appropriate steps to protect your privacy. Whenever you provide sensitive information (for example, a credit card number to make a purchase), www.constructafrica.com encrypts that information using secure socket layer technology (SSL). www.constructafrica.com follows generally accepted industry standards to protect the personal information submitted to us, both during transmission and once we receive it.</p>
        <p>However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

        <h2>CHILDREN.</h2>
        <p>www.constructafrica.com does not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information as quickly as possible. If you believe that we might have any information from or about a child under 13, please contact us at info@constructafrica.com.</p>

        <h2>CORRECTIONS AND UPDATES.</h2>
        <p>If you wish to modify or update any information we have received, please contact info@constructafrica.com.</p>

        <h2>MODIFICATIONS OF THE PRIVACY POLICY.</h2>
        <p>www.constructafrica.com reserves the right to modify this privacy statement at any time, so please review it frequently. If we make material changes to this policy, we will notify you here, by email, or by means of a notice on our homepage.</p>
        <p>The Website Policies and Terms & Conditions may be changed or updated occasionally to meet the requirements and standards. Therefore, the Customers' are encouraged to frequently visit these sections in order to be updated about the changes on the website. Modifications will be effective on the day they are posted.</p>
    `, []);

    const filteredContent = useMemo(() => {
        if (!searchQuery.trim()) return privacyContent;
        
        const query = searchQuery.toLowerCase();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = privacyContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        
        if (text.toLowerCase().includes(query)) {
            return privacyContent;
        }
        return '';
    }, [privacyContent, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        Privacy Policy
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Here is how we make use of your data at ConstructAfrica.
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

            {/* Privacy Content Section */}
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

export default PublicPrivacy;

