import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ActionButton from '../components/ActionButton';

const PublicTerms = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const termsContent = useMemo(() => `
        <p>The following are the terms of use ("Terms of Use") that govern use of the www.constructafrica.com Website ("Site"). By using the Site you expressly agree to be bound by these Terms of Use and the www.constructafrica.com privacy policy and to follow these Terms of Use and all applicable laws and regulations governing use of the Site. ConstructAfrica reserves the right to change these Terms of Use at any time, effective immediately upon posting on the Site. Please check this page of the Site periodically. We will note when there are updates to the Terms of Use at the bottom of the Terms of Use. If you violate these Terms of Use, ConstructAfrica may terminate your use of the Site, bar you from future use of the Site, and/or take appropriate legal action against you.</p>

        <h2>LIMITED LICENSE.</h2>
        <p>You are granted a limited, non-exclusive, revocable and non-transferable license to utilize and access the Site pursuant to the terms and conditions of this Agreement. ConstructAfrica may within its sole discretion, terminate or suspend any and all Content and your access to the Site at any time, with or without cause, with or without prior notice, for any reason or no reason. ConstructAfrica reserves the right to alter, suspend or discontinue any aspect of the Site at any time, including, but not limited to the Content, hours of availability and equipment needed for access or use. ConstructAfrica may also impose limits on certain features and services or restrict your access to parts or all of the Site without notice or liability.</p>

        <h2>PERMITTED USE.</h2>
        <p>You agree that you are only authorized to visit, view and to retain a copy of pages of this Site for your own personal use, and that you shall not duplicate, download, publish, modify or otherwise distribute the material on this Site for any purpose other than for personal use, unless otherwise specifically authorized by ConstructAfrica to do so. You also agree not to deep-link to the site for any purpose, unless specifically authorized by ConstructAfrica to do so. The content and software on this Site is the property of ConstructAfrica and/or its suppliers and is protected by international copyright laws.</p>

        <h2>REPRESENTATIONS BY YOU.</h2>
        <p>By visiting the Site, you represent, warrant and covenant that (a) you are at least 18 years old; (b) that all materials of any kind submitted by you to ConstructAfrica through the Site or for inclusion on the Site will not plagiarize, violate or infringe upon the rights of any third-party including trade secret, copyright, trademark, trade dress, privacy, patent, or other personal or proprietary rights of any person or entity; (c) that you have the full right and power to enter into this Agreement and perform the obligations set forth herein, without the need for any approvals, consents or agreements of any third parties that have not been obtained; and (d) that you will comply with all applicable laws, rules and regulations in your use of the Site.</p>

        <h2>NO COMMERCIAL USE.</h2>
        <p>This Site may not be used by you for any commercial purposes such as to conduct sales of merchandise or services of any kind. You must obtain ConstructAfrica's prior written consent to make commercial offers of any kind on the Site, whether by advertising, solicitations, links, or any other form of communication. ConstructAfrica will investigate and take appropriate legal action against anyone who violates this provision, including without limitation, removing the offending communication from the Site and barring such violators from use of the Site.</p>

        <h2>LINKS AND SEARCH RESULTS.</h2>
        <p>The Site may automatically produce search results that reference and/or link to third party sites throughout the World Wide Web. ConstructAfrica has no control over these sites or the content within them. ConstructAfrica cannot guarantee, represent or warrant that the content contained in the sites is accurate, legal and/or inoffensive. ConstructAfrica does not endorse the content of any third party site, nor do we warrant that they will not contain viruses or otherwise impact your computer. By using the Site to search for or link to another site, you agree and understand that you may not make any claim against ConstructAfrica for any damages or losses, whatsoever, resulting from your use of the Site to obtain search results or to link to another site.</p>

        <h2>COPYRIGHT POLICY.</h2>
        <p>ConstructAfrica will terminate the account of any user who repeatedly infringes the copyright rights of others upon receipt of proper notification to ConstructAfrica by the copyright owner or the copyright owner's legal agent. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide ConstructAfrica's Copyright Agent the following information required by the Online Copyright Infringement Liability Limitation Act of the Digital Millennium Copyright Act, 17 U.S.C. 512 ("DMCA"): A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed; Identification of the copyright work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site; Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit ConstructAfrica to locate the material; Information reasonably sufficient to permit ConstructAfrica to contact the complaining party; A statement that the complaining party has a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</p>

        <h2>DISCLAIMER OF WARRANTY, LIMITATION OF DAMAGES.</h2>
        <p>ConstructAfrica MAKES NO WARRANTY OR REPRESENTATION OF ANY KIND, EITHER EXPRESS OR IMPLIED, REGARDING ANY MATTER, INCLUDING, WITHOUT LIMITATION, THE ADVERTISING, OTHER CONTENT, PRODUCTS OR SERVICES PROVIDED THROUGH OR IN CONNECTION WITH THE SITE. ConstructAfrica SHALL NOT BE LIABLE TO YOU OR ANY OTHER PARTY FOR ANY LOSS OR INJURY CAUSED IN WHOLE OR PART BY ITS NEGLIGENCE OR CONTINGENCIES BEYOND ITS CONTROL IN PROCURING, COMPILING, INTERPRETING, REPORTING OR DELIVERING INFORMATION THROUGH THE SITE. IN NO EVENT WILL ConstructAfrica BE LIABLE TO YOU OR ANY OTHER PARTY FOR ANY DECISION MADE OR ACTION TAKEN BY YOU IN RELIANCE ON SUCH INFORMATION OR FOR ANY CONSEQUENTIAL, SPECIAL OR SIMILAR DAMAGES, EVEN IF ConstructAfrica HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

        <h2>VIOLATION OF TERMS OF USE.</h2>
        <p>You understand and agree that in ConstructAfrica's sole discretion, and without prior notice, ConstructAfrica may terminate your access to the Site, or exercise any other remedy available and remove any unauthorized user information, if ConstructAfrica believes that the information you provide has violated or is inconsistent with these Terms of Use, or violates the rights of ConstructAfrica, or any third party, or violates the law. You agree that monetary damages may not provide a sufficient remedy to ConstructAfrica for violations of these terms and conditions and you consent to injunctive or other equitable relief for such violations. ConstructAfrica may release user information about you if required by law or subpoena.</p>

        <h2>OFFICE FOREIGN ASSETS CONTROL (OFAC) SANCTIONED COUNTRIES.</h2>
        <p>ConstructAfrica will not trade with or provide any services to individuals and companies owned or controlled by, or acting for or on behalf of, OFAC targeted countries AND individuals, groups, and entities, such as terrorists and narcotics traffickers designated under the OFAC programs that are not country specific.</p>

        <h2>APPLICABLE LAW.</h2>
        <p>You agree that the laws of the jurisdiction in which ConstructAfrica operates, without regard to conflicts of laws provisions will apply these Terms of Use. You agree that the jurisdiction and venue for any legal proceedings relating to or arising out of these Terms of Use or the Site shall be in appropriate courts located in the jurisdiction in which ConstructAfrica operates.</p>

        <h2>INDEMNITY.</h2>
        <p>You agree to indemnify and hold ConstructAfrica, its subsidiaries, affiliates, officers, agents and other partners and employees, harmless from any loss, liability, claim or demand, including reasonable attorney's fees, made by any third party due to or arising out of your use of the Site, including also your use of the Site to provide a link to another site or to upload content or other information to the Site.</p>

        <h2>LICENCE GRANTED TO YOU.</h2>
        <p>By providing materials to ConstructAfrica, including by submitting or uploading content or materials for use on the Site you represent and warrant that you or the owner of all rights to such content or materials has expressly granted ConstructAfrica an irrevocable world-wide right in all languages and in perpetuity to use and exploit all or any part of the content and materials provided by you. ConstructAfrica may publish and distribute any such submitted content or materials at ConstructAfrica's sole discretion by any method now existing or later developed. You agree that you shall waive all claims and have no recourse against ConstructAfrica for any alleged or actual infringement or misappropriation of any proprietary rights in any communication, content or material submitted to ConstructAfrica. Any communication or materials you send to ConstructAfrica will be treated as non-confidential and non-proprietary.</p>

        <h2>ADVERTISING.</h2>
        <p>The Site may contain advertising and sponsorships. Advertisers and sponsors are responsible for ensuring that material submitted for inclusion on the Site is accurate and complies with applicable laws. ConstructAfrica will not be responsible for the illegality of or any error or inaccuracy in advertisers' or sponsors' materials or for the acts or omissions of advertisers and sponsors.</p>

        <h2>SITE OPERATION.</h2>
        <p>ConstructAfrica reserves the right to withdraw, suspend or discontinue any functionality or feature of the Site, with or without notice. ConstructAfrica shall not be liable to you or any third party should ConstructAfrica exercise its right to modify or discontinue the Site.</p>

        <h2>PURCHASES.</h2>
        <p>If applicable, you agree to pay all fees and charges associated with your purchases on the Site. You are responsible for providing ConstructAfrica with a valid means of payment for purchases. ConstructAfrica reserves the right to change prices and availability of products and services at any time.</p>

        <h2>SEVERABILITY.</h2>
        <p>If any part of these Terms of Use is held invalid or unenforceable, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions shall remain in full force and effect.</p>

        <h2>INTERPRETATION.</h2>
        <p>These Terms of Use constitute the entire agreement between you and ConstructAfrica and govern your use of the Site, superseding any prior agreements between you and ConstructAfrica. The failure of ConstructAfrica to exercise or enforce any right or provision of these Terms of Use shall not constitute a waiver of such right or provision.</p>
    `, []);

    const filteredContent = useMemo(() => {
        if (!searchQuery.trim()) return termsContent;
        
        const query = searchQuery.toLowerCase();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = termsContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        
        if (text.toLowerCase().includes(query)) {
            return termsContent;
        }
        return '';
    }, [termsContent, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <section className="py-10 max-md:pt-20 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[#AE6A19] font-semibold mb-2 uppercase tracking-wide">
                        T&C
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bitter font-semibold text-[#181D27] mb-3 leading-tight">
                        Terms and conditions
                    </h1>
                    <p className="text-base sm:text-lg text-[#535862] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Here are the terms and conditions that guide the use of ConstructAfrica.
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

            {/* Terms Content Section */}
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

export default PublicTerms;

