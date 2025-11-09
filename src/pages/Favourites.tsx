import { useState, useMemo } from "react";
import { ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
import { LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { toast } from "react-toastify";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import {
  useGetMyFavouritesQuery,
  useToggleFavouriteMutation
} from "../store/services/favourite";

type FavouriteCategory = 'projects' | 'companies' | 'main_news' | 'tenders';

const Favourites = () => {
  const [activeView, setActiveView] = useState('table');
  const [activeCategory, setActiveCategory] = useState<FavouriteCategory>('projects');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recently-added');

  const itemsPerPage = 20;

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'value-high', label: 'Value (High to Low)' },
    { value: 'value-low', label: 'Value (Low to High)' }
  ];

  const viewTabs: TabItem[] = [
    {
      id: 'table',
      label: 'Table',
      icon: <LuTable size={16} />
    },
    {
      id: 'grid',
      label: 'Grid',
      icon: <CiGrid41 size={16} />
    }
  ];

  const categoryTabs: TabItem[] = [
    {
      id: 'projects',
      label: 'Projects'
    },
    {
      id: 'companies',
      label: 'Companies'
    },
    {
      id: 'main_news',
      label: 'News'
    },
    {
      id: 'tenders',
      label: 'Tenders'
    }
  ];

  const queryParams = useMemo(() => ({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  }), [currentPage]);

  const { data: favouritesData, isLoading, isError, refetch } = useGetMyFavouritesQuery(queryParams);
  const [toggleFavourite] = useToggleFavouriteMutation();

  // Extract and flatten items - THE KEY FIX IS HERE
  const displayItems = useMemo(() => {
    if (!favouritesData?.favorites?.[activeCategory]) return [];
    
    const data = favouritesData.favorites[activeCategory].map((fav: any) => ({
      ...fav, // Extract the actual item data from "0" key
      favorite_id: fav.favorite_id,
      favorite_date: fav.favorite_date,
      isFavorite: true
    }));
    return data
  }, [favouritesData, activeCategory]);

  const itemCount = favouritesData?.counts?.[activeCategory] || 0;
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  const sortedItems = useMemo(() => {
    if (!displayItems.length) return [];
    const sorted = [...displayItems];

    switch (sortBy) {
      case 'recently-added':
        sorted.sort((a, b) => new Date(b.favorite_date).getTime() - new Date(a.favorite_date).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.favorite_date).getTime() - new Date(b.favorite_date).getTime());
        break;
      case 'alphabetical':
        sorted.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
        break;
      case 'value-high':
        sorted.sort((a, b) => (b.contract_value_usd || 0) - (a.contract_value_usd || 0));
        break;
      case 'value-low':
        sorted.sort((a, b) => (a.contract_value_usd || 0) - (b.contract_value_usd || 0));
        break;
    }

    return sorted;
  }, [displayItems, sortBy]);

  const handleToggleFavorite = async (row: any) => {
    try {
      await toggleFavourite({
        collection: activeCategory,
        item_id: row.id
      }).unwrap();
      
      toast.success('Added to favourites');
      refetch();
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
      toast.error('Failed to add to favourite');
    }
  };

  // Project columns
  const projectColumns: TableColumn<any>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '35%'
    },
    {
      key: 'current_stage',
      label: 'Phase',
      sortable: true,
      width: '20%'
    },
    {
      key: 'contract_value_usd',
      label: 'Value (USD)',
      sortable: true,
      width: '20%',
      render: (value) => value ? `$${value.toLocaleString()}` : '-'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '25%'
    }
  ];

  // Company columns
  const companyColumns: TableColumn<any>[] = [
    {
      key: 'name',
      label: 'Company Name',
      sortable: true,
      width: '30%'
    },
    {
      key: 'company_role',
      label: 'Role',
      sortable: true,
      width: '20%',
      render: (value: any) => {
        if (!value || !Array.isArray(value)) return '-';
        return value.join(', ');
      }
    },
    {
      key: 'employees',
      label: 'Employees',
      sortable: true,
      width: '15%'
    },
    {
      key: 'projects_completed',
      label: 'Projects',
      sortable: true,
      width: '15%'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '20%'
    }
  ];

  // News columns
  const newsColumns: TableColumn<any>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      width: '40%'
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      width: '20%'
    },
    {
      key: 'date_published',
      label: 'Published',
      sortable: true,
      width: '20%',
      render: (value) => value ? new Date(value as string).toLocaleDateString() : '-'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '20%'
    }
  ];

  // Tender columns
  const tenderColumns: TableColumn<any>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      width: '35%'
    },
    {
      key: 'tender_date',
      label: 'Tender Date',
      sortable: true,
      width: '20%',
      render: (value) => value ? new Date(value as string).toLocaleDateString() : '-'
    },
    {
      key: 'closing_date',
      label: 'Closing Date',
      sortable: true,
      width: '20%',
      render: (value) => value ? new Date(value as string).toLocaleDateString() : '-'
    },
    {
      key: 'is_free_tender',
      label: 'Type',
      sortable: true,
      width: '15%',
      render: (value) => value ? 'Free' : 'Premium'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '10%'
    }
  ];

  const getColumnsForCategory = () => {
    switch (activeCategory) {
      case 'projects':
        return projectColumns;
      case 'companies':
        return companyColumns;
      case 'main_news':
        return newsColumns;
      case 'tenders':
        return tenderColumns;
      default:
        return projectColumns;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
          <p className="mt-4 text-gray-500">Loading favourites...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading favourites</p>
        </div>
      );
    }

    if (sortedItems.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No favorite {activeCategory} found</p>
        </div>
      );
    }

    // Grid View
    if (activeView === 'grid') {
      // Projects Grid
      if (activeCategory === 'projects') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <ProjectCard
                key={item.favorite_id}
                image={item.featured_image || "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"}
                status={item.status || "Active"}
                title={item.title}
                description={item.summary}
                location="-"
                category={item.current_stage || '-'}
                value={item.contract_value_usd ? `$${item.contract_value_usd}` : '-'}
                isFavorite={true}
                // onToggleFavorite={() => handleToggleFavorite(item)}
              />
            ))}
          </div>
        );
      }

      // Companies Grid
      if (activeCategory === 'companies') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <div key={item.favorite_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  {item.logo && (
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="w-12 h-12 rounded object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.company_role?.join(', ') || '-'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.employees || 0} employees</span>
                      <span>{item.projects_completed || 0} projects</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }

      // News Grid
      if (activeCategory === 'main_news') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <article key={item.favorite_id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {item.featured_image && (
                  <img 
                    src={item.featured_image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-xs text-[#E0891E] font-medium">{item.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    {item.date_published && new Date(item.date_published).toLocaleDateString()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        );
      }

      // Tenders Grid
      if (activeCategory === 'tenders') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.favorite_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                <div className="space-y-1 text-sm">
                  {item.tender_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tender Date:</span>
                      <span className="text-gray-900">{new Date(item.tender_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {item.closing_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Closing Date:</span>
                      <span className="text-gray-900">{new Date(item.closing_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className={`${item.is_free_tender ? 'text-green-600' : 'text-blue-600'} font-medium`}>
                      {item.is_free_tender ? 'Free' : 'Premium'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }

    // Table View (All Categories)
    return (
      <DataTable
        data={sortedItems}
        columns={getColumnsForCategory()}
        onRowSelect={(rows) => console.log('Selected rows:', rows)}
        onToggleFavorite={handleToggleFavorite}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        showCheckboxes={true}
        showFavorites={true}
      />
    );
  };

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">Favourites</h1>
          <p className="text-[#535862]">Showing {itemCount} favourite {activeCategory}</p>
        </div>

        <div className="flex items-center gap-3">
          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Recently added"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs
          tabs={viewTabs}
          activeTab={activeView}
          onTabChange={setActiveView}
          variant="pills"
        />
        <Tabs
          tabs={categoryTabs}
          activeTab={activeCategory}
          onTabChange={(tab) => {
            setActiveCategory(tab as FavouriteCategory);
            setCurrentPage(1);
          }}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default Favourites;
