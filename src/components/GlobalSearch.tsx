// import React, { useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiCheck } from 'react-icons/fi';

// interface SearchResult {
//     id: string;
//     type: 'project' | 'company' | 'news' | 'tender' | 'event' | 'expert';
//     title: string;
//     location: string;
//     date: string;
// }

// interface GlobalSearchProps {
//     isOpen: boolean;
//     onClose: () => void;
//     searchQuery: string;
// }

// const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, searchQuery }) => {
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'companies' | 'news' | 'tenders' | 'events' | 'expert-opinions'>('all');

//     const dummyResults: SearchResult[] = useMemo(() => [
//         // Projects
//         { id: '1', type: 'project', title: 'Kakuma Refugee Camp Solar Initiative', location: 'Kenya', date: '02/15/2025' },
//         { id: '2', type: 'project', title: 'Rural Electrification Project', location: 'Nigeria', date: '03/10/2025' },
//         { id: '3', type: 'project', title: 'Wind and Solar Hybrid System', location: 'Tunisia', date: '04/20/2025' },
//         { id: '4', type: 'project', title: 'Lagos-Calabar Coastal Railway', location: 'Nigeria', date: '01/05/2025' },
//         { id: '5', type: 'project', title: 'Greater Cairo Air Pollution Management', location: 'Egypt', date: '05/12/2025' },

//         // Companies
//         { id: '6', type: 'company', title: 'Energy Efficient Cookstoves Initiative', location: 'Ethiopia', date: '07/15/2025' },
//         { id: '7', type: 'company', title: 'Sustainable Energy for Schools', location: 'Uganda', date: '05/05/2025' },
//         { id: '8', type: 'company', title: 'Community Solar Gardens', location: 'Ghana', date: '06/30/2025' },
//         { id: '9', type: 'company', title: 'Green Infrastructure Solutions', location: 'South Africa', date: '08/20/2025' },

//         // News
//         { id: '10', type: 'news', title: 'African Construction Market Reaches Record', location: 'Africa', date: '01/20/2025' },
//         { id: '11', type: 'news', title: 'Sustainable Infrastructure Development', location: 'West Africa', date: '02/28/2025' },
//         { id: '12', type: 'news', title: 'Digital Transformation in Construction', location: 'East Africa', date: '03/15/2025' },

//         // Tenders
//         { id: '13', type: 'tender', title: 'Road Infrastructure Development Tender', location: 'Kenya', date: '04/01/2025' },
//         { id: '14', type: 'tender', title: 'Water Supply System Tender', location: 'Tanzania', date: '05/18/2025' },

//         // Events
//         { id: '15', type: 'event', title: 'Africa Infrastructure Summit 2025', location: 'Cape Town, South Africa', date: '06/10/2025' },
//         { id: '16', type: 'event', title: 'Sustainable Construction Conference', location: 'Lagos, Nigeria', date: '07/25/2025' },

//         // Expert Opinions
//         { id: '17', type: 'expert', title: 'The Future of Infrastructure Investment', location: 'Africa', date: '01/10/2025' },
//         { id: '18', type: 'expert', title: 'Tokenization in Infrastructure Finance', location: 'Global', date: '02/05/2025' },
//     ], []);

//     // Filter results based on search query and active tab
//     const filteredResults = useMemo(() => {
//         let results = dummyResults;

//         if (activeTab !== 'all') {
//             const typeMap: Record<string, string> = {
//                 'projects': 'project',
//                 'companies': 'company',
//                 'news': 'news',
//                 'tenders': 'tender',
//                 'events': 'event',
//                 'expert-opinions': 'expert'
//             };
//             results = results.filter(result => result.type === typeMap[activeTab]);
//         }

//         if (searchQuery.trim()) {
//             const query = searchQuery.toLowerCase();
//             results = results.filter(result =>
//                 result.title.toLowerCase().includes(query) ||
//                 result.location.toLowerCase().includes(query)
//             );
//         }

//         return results;
//     }, [searchQuery, activeTab, dummyResults]);

//     const groupedResults = useMemo(() => {
//         const groups: Record<string, SearchResult[]> = {
//             projects: [],
//             companies: [],
//             news: [],
//             tenders: [],
//             events: [],
//             'expert-opinions': []
//         };

//         filteredResults.forEach(result => {
//             const groupKey = result.type === 'project' ? 'projects' :
//                 result.type === 'company' ? 'companies' :
//                     result.type === 'news' ? 'news' :
//                         result.type === 'tender' ? 'tenders' :
//                             result.type === 'event' ? 'events' : 'expert-opinions';
//             groups[groupKey].push(result);
//         });

//         return groups;
//     }, [filteredResults]);

//     const tabs = [
//         { id: 'all' as const, label: 'All' },
//         { id: 'projects' as const, label: 'Projects' },
//         { id: 'companies' as const, label: 'Companies' },
//         { id: 'news' as const, label: 'News' },
//         { id: 'tenders' as const, label: 'Tenders' },
//         { id: 'events' as const, label: 'Events' },
//         { id: 'expert-opinions' as const, label: 'Expert opinions' }
//     ];

//     const handleResultClick = (result: SearchResult) => {
//         let path = '';
//         switch (result.type) {
//             case 'project':
//                 path = `/admin/projects/${result.id}`;
//                 break;
//             case 'company':
//                 path = `/admin/companies/${result.id}`;
//                 break;
//             case 'news':
//                 path = `/admin/news/${result.id}`;
//                 break;
//             case 'tender':
//                 path = `/admin/tenders/${result.id}`;
//                 break;
//             case 'event':
//                 path = `/admin/events/${result.id}`;
//                 break;
//             case 'expert':
//                 path = `/admin/expert-opinions/${result.id}`;
//                 break;
//         }
//         navigate(path);
//         onClose();
//     };

//     const getSectionTitle = (key: string) => {
//         const titles: Record<string, string> = {
//             projects: 'Projects',
//             companies: 'Companies',
//             news: 'News',
//             tenders: 'Tenders',
//             events: 'Events',
//             'expert-opinions': 'Expert Opinions'
//         };
//         return titles[key] || key;
//     };

//     if (!isOpen) return null;

//     return (
//         <>
//             <div className="fixed inset-0 z-40" onClick={onClose}></div>
//             <div className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-[calc(100vw-1rem)] sm:w-[500px] md:w-[550px] lg:w-[600px] bg-white rounded-lg shadow-xl border border-[#E9EAEB] max-h-[calc(100vh-120px)] md:max-h-[600px] flex flex-col z-50" data-global-search>
//                 {/* Tabs */}
//                 <div className="flex items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-b border-[#E9EAEB] overflow-x-auto hide-scrollbar">
//                     {tabs.map((tab) => (
//                         <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
//                                 ? 'bg-[#F89822] text-white'
//                                 : 'bg-[#F5F5F6] text-[#181D27] hover:bg-gray-200'
//                                 }`}
//                         >
//                             {activeTab === tab.id && <FiCheck size={14} className="sm:w-4 sm:h-4" />}
//                             <span className="text-[10px] sm:text-xs">{tab.label}</span>
//                         </button>
//                     ))}
//                 </div>

//                 {/* Results */}
//                 <div className="flex-1 overflow-y-auto hide-scrollbar p-4 sm:p-6">
//                     {activeTab === 'all' ? (
//                         // Show grouped results
//                         <div className="space-y-4 sm:space-y-5">
//                             {Object.entries(groupedResults).map(([key, results]) => {
//                                 if (results.length === 0) return null;
//                                 return (
//                                     <div key={key}>
//                                         <h3 className="text-sm sm:text-base font-semibold text-[#181D27] mb-3 sm:mb-4">
//                                             {getSectionTitle(key)}
//                                         </h3>
//                                         <div className="space-y-0">
//                                             {results.map((result) => (
//                                                 <button
//                                                     key={result.id}
//                                                     onClick={() => handleResultClick(result)}
//                                                     className="w-full flex items-center justify-between py-2.5 sm:py-3 px-2 hover:bg-gray-50 rounded transition-colors border-b border-[#E9EAEB] last:border-b-0"
//                                                 >
//                                                     <div className="flex-1 text-left min-w-0 pr-2">
//                                                         <p className="text-xs sm:text-sm text-[#181D27] font-normal truncate">
//                                                             {result.title}, {result.location}
//                                                         </p>
//                                                     </div>
//                                                     <div className="text-xs sm:text-sm text-[#535862] ml-2 flex-shrink-0">
//                                                         {result.date}
//                                                     </div>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         // Show filtered results for specific tab
//                         <div className="space-y-0">
//                             {filteredResults.length > 0 ? (
//                                 filteredResults.map((result) => (
//                                     <button
//                                         key={result.id}
//                                         onClick={() => handleResultClick(result)}
//                                         className="w-full flex items-center justify-between py-2.5 sm:py-3 px-2 hover:bg-gray-50 rounded transition-colors border-b border-[#E9EAEB] last:border-b-0"
//                                     >
//                                         <div className="flex-1 text-left min-w-0 pr-2">
//                                             <p className="text-xs sm:text-sm text-[#181D27] font-medium truncate">
//                                                 {result.title}, {result.location}
//                                             </p>
//                                         </div>
//                                         <div className="text-xs sm:text-sm text-[#535862] ml-2 flex-shrink-0">
//                                             {result.date}
//                                         </div>
//                                     </button>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-12">
//                                     <p className="text-xs sm:text-sm text-[#535862]">No results found</p>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default GlobalSearch;


import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useLazyGeneralSearchQuery } from '../store/services/reference';

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, searchQuery }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'companies' | 'news' | 'tenders' | 'events' | 'expert-opinions'>('all');
    const [triggerSearch, { data: searchResponse, isLoading, isFetching }] = useLazyGeneralSearchQuery();

    // Trigger search when query changes
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const debounceTimer = setTimeout(() => {
                triggerSearch(searchQuery);
            }, 300);

            return () => clearTimeout(debounceTimer);
        }
    }, [searchQuery, triggerSearch]);

    // Transform API results to match component interface
    const transformedResults = useMemo(() => {
        if (!searchResponse?.data || !Array.isArray(searchResponse.data)) return [];

        return searchResponse.data.map((result, index) => {
            // Map collection to type
            const getResultType = (collection: string): 'project' | 'company' | 'news' | 'tender' | 'event' | 'expert' => {
                const lowerCollection = collection.toLowerCase();
                if (lowerCollection.includes('project')) return 'project';
                if (lowerCollection.includes('compan')) return 'company';
                if (lowerCollection.includes('news') || lowerCollection.includes('blog')) return 'news';
                if (lowerCollection.includes('tender')) return 'tender';
                if (lowerCollection.includes('event')) return 'event';
                if (lowerCollection.includes('expert') || lowerCollection.includes('opinions')) return 'expert';
                return 'project'; // default
            };

            return {
                id: `${result.collection}-${index}`,
                type: getResultType(result.collection),
                title: result.title || 'Untitled',
                summary: result.summary || '',
                collection: result.collection,
                collectionWeight: result.collection_weight
            };
        });
    }, [searchResponse]);

    // Filter results based on active tab
    const filteredResults = useMemo(() => {
        let results = transformedResults;

        if (activeTab !== 'all') {
            const typeMap: Record<string, string> = {
                'projects': 'project',
                'companies': 'company',
                'news': 'news',
                'tenders': 'tender',
                'events': 'event',
                'expert-opinions': 'opinions'
            };
            results = results.filter(result => result.type === typeMap[activeTab]);
        }

        return results;
    }, [transformedResults, activeTab]);

    const groupedResults = useMemo(() => {
        const groups: Record<string, typeof transformedResults> = {
            projects: [],
            companies: [],
            news: [],
            tenders: [],
            events: [],
            'expert-opinions': []
        };

        filteredResults.forEach(result => {
            const groupKey = result.type === 'project' ? 'projects' :
                result.type === 'company' ? 'companies' :
                    result.type === 'news' ? 'news' :
                        result.type === 'tender' ? 'tenders' :
                            result.type === 'event' ? 'events' : 'expert-opinions';
            groups[groupKey].push(result);
        });

        return groups;
    }, [filteredResults]);

    const tabs = [
        { id: 'all' as const, label: 'All' },
        { id: 'projects' as const, label: 'Projects' },
        { id: 'companies' as const, label: 'Companies' },
        { id: 'news' as const, label: 'News' },
        { id: 'tenders' as const, label: 'Tenders' },
        { id: 'events' as const, label: 'Events' },
        { id: 'expert-opinions' as const, label: 'Expert opinions' }
    ];

    const handleResultClick = (result: typeof transformedResults[0]) => {
        // Navigate based on collection type
        const collectionRoutes: Record<string, string> = {
            'projects': '/admin/projects',
            'companies': '/admin/companies',
            'news': '/admin/news',
            'blog': '/admin/news',
            'tenders': '/admin/tenders',
            'events': '/admin/events',
            'experts_analysts': '/admin/expert-opinions'
        };

        const route = collectionRoutes[result.collection] || '/admin';
        navigate(route);
        onClose();
    };

    const getSectionTitle = (key: string) => {
        const titles: Record<string, string> = {
            projects: 'Projects',
            companies: 'Companies',
            news: 'News',
            tenders: 'Tenders',
            events: 'Events',
            'expert-opinions': 'Expert Opinions'
        };
        return titles[key] || key;
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-[calc(100vw-1rem)] sm:w-[500px] md:w-[550px] lg:w-[600px] bg-white rounded-lg shadow-xl border border-[#E9EAEB] max-h-[calc(100vh-120px)] md:max-h-[600px] flex flex-col z-50" data-global-search>
                {/* Tabs */}
                <div className="flex items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-b border-[#E9EAEB] overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                                ? 'bg-[#F89822] text-white'
                                : 'bg-[#F5F5F6] text-[#181D27] hover:bg-gray-200'
                                }`}
                        >
                            {activeTab === tab.id && <FiCheck size={14} className="sm:w-4 sm:h-4" />}
                            <span className="text-[10px] sm:text-xs">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto hide-scrollbar p-4 sm:p-6">
                    {isLoading || isFetching ? (
                        <div className="text-center py-12">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-transparent"></div>
                            <p className="text-xs sm:text-sm text-[#535862] mt-2">Searching...</p>
                        </div>
                    ) : searchQuery.trim().length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xs sm:text-sm text-[#535862]">Type to search...</p>
                        </div>
                    ) : activeTab === 'all' ? (
                        // Show grouped results
                        <div className="space-y-4 sm:space-y-5">
                            {Object.entries(groupedResults).map(([key, results]) => {
                                if (results.length === 0) return null;
                                return (
                                    <div key={key}>
                                        <h3 className="text-sm sm:text-base font-semibold text-[#181D27] mb-3 sm:mb-4">
                                            {getSectionTitle(key)}
                                        </h3>
                                        <div className="space-y-0">
                                            {results.map((result) => (
                                                <button
                                                    key={result.id}
                                                    onClick={() => handleResultClick(result)}
                                                    className="w-full text-left py-3 px-2 hover:bg-gray-50 rounded transition-colors border-b border-[#E9EAEB] last:border-b-0"
                                                >
                                                    <p className="text-sm text-[#181D27] font-medium mb-1">
                                                        {result.title}
                                                    </p>
                                                    {result.summary && (
                                                        <p className="text-xs text-[#535862] line-clamp-2">
                                                            {result.summary}
                                                        </p>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredResults.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-xs sm:text-sm text-[#535862]">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Show filtered results for specific tab
                        <div className="space-y-0">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleResultClick(result)}
                                        className="w-full text-left py-3 px-2 hover:bg-gray-50 rounded transition-colors border-b border-[#E9EAEB] last:border-b-0"
                                    >
                                        <p className="text-sm text-[#181D27] font-medium mb-1">
                                            {result.title}
                                        </p>
                                        {result.summary && (
                                            <p className="text-xs text-[#535862] line-clamp-2">
                                                {result.summary}
                                            </p>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-xs sm:text-sm text-[#535862]">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GlobalSearch;