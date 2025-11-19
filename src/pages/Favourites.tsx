import { useState, useMemo, useEffect } from "react";
import { ProjectCard, Tabs, DataTable, CustomSelect, ProjectCardSkeleton } from "../components";
import { LuTable } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { toast } from "react-toastify";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import {
  useGetMyFavouritesQuery,
  useToggleFavouriteMutation
} from "../store/services/favourite";
import { cleanHtmlContent } from "../utils";
import { useNavigate } from "react-router-dom";

type FavouriteCategory = 'projects' | 'companies' | 'main_news' | 'tenders';

const Favourites = () => {
  const navigate = useNavigate();
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

  const getItemImageUrl = (featuredImage: string | any['featured_image']) => {
    if (!featuredImage) return "/images/null-image.svg";

    if (typeof featuredImage === 'string') {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage}`;
    }

    if (featuredImage && typeof featuredImage === 'object' && 'filename_disk' in featuredImage) {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage.filename_disk}`;
    }

    return "/images/null-image.svg";
  };

  const queryParams = useMemo(() => ({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  }), [currentPage]);

  const { data: favouritesData, isLoading, isError, refetch } = useGetMyFavouritesQuery(queryParams);
  const [toggleFavourite] = useToggleFavouriteMutation();

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Map internal category to API response key for group (group uses 'news', not 'main_news')
  const getGroupApiKey = (category: FavouriteCategory): 'projects' | 'companies' | 'news' | 'tenders' => {
    // API group returns 'news' but we use 'main_news' internally
    return category === 'main_news' ? 'news' : category;
  };

  // Extract and flatten items - Filter by active category only
  const displayItems = useMemo(() => {
    console.log(favouritesData?.group);
    // Map the category to the API key for group
    const apiCategoryKey = getGroupApiKey(activeCategory);

    // Ensure we have data and the active category exists
    if (!favouritesData?.group || !favouritesData.group[apiCategoryKey]) {
      return [];
    }

    // Only process items for the current active category
    const categoryData = favouritesData.group[apiCategoryKey];
    if (!Array.isArray(categoryData) || categoryData.length === 0) {
      return [];
    }

    // Explicitly filter to ensure we only get items for the active category
    const data = categoryData
      .filter((fav) => fav !== null && fav !== undefined)
      .map((fav) => ({
        ...fav, // Extract the actual item data
        favorite_id: fav.favorite_id,
        favorite_date: fav.favorite_date,
        isFavorite: true
      })) as typeof categoryData;

    return data;
  }, [favouritesData, activeCategory]);


  // Counts uses 'main_news' key, so we can use activeCategory directly
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
      label: 'Value ($mn)',
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

  const renderContent = () => {
    if (isLoading) {
      // Grid View Skeleton Loading
      if (activeView === 'grid') {
        if (activeCategory === 'projects') {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
              ))}
            </div>
          );
        }

        if (activeCategory === 'companies') {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
              ))}
            </div>
          );
        }

        if (activeCategory === 'main_news') {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
              ))}
            </div>
          );
        }

        if (activeCategory === 'tenders') {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
              ))}
            </div>
          );
        }
      }

      // Table View Skeleton Loading - Separate for each category
      if (activeCategory === 'projects') {
        return (
          <DataTable
            data={[]}
            columns={projectColumns}
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            showCheckboxes={true}
            showFavorites={true}
            loading={true}
          />
        );
      }

      if (activeCategory === 'companies') {
        return (
          <DataTable
            data={[]}
            columns={companyColumns}
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            showCheckboxes={true}
            showFavorites={true}
            loading={true}
          />
        );
      }

      if (activeCategory === 'main_news') {
        return (
          <DataTable
            data={[]}
            columns={newsColumns}
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            showCheckboxes={true}
            showFavorites={true}
            loading={true}
          />
        );
      }

      if (activeCategory === 'tenders') {
        return (
          <DataTable
            data={[]}
            columns={tenderColumns}
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
            onToggleFavorite={handleToggleFavorite}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            showCheckboxes={true}
            showFavorites={true}
            loading={true}
          />
        );
      }
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
              <ProjectCard
                key={item.id}
                isLogo={true}
                image={item.logo?.filename_disk ? `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${item.logo.filename_disk}` : "/images/null-image.svg"}
                status={item.company_role || "Company"}
                title={item.name}
                description={cleanHtmlContent(item.description) || "No description available"}
                location={
                  item.countries && Array.isArray(item.countries) && item.countries.length > 0
                    ? item.countries.map((c: any) => c?.countries_id?.name).filter(Boolean).join(', ')
                    : '---'
                }
                category={
                  item.sectors && Array.isArray(item.sectors) && item.sectors.length > 0
                    ? item.sectors.map((s: any) => s?.sectors_id?.name).filter(Boolean).join(', ')
                    : 'Company'
                }
                value={`${Array.isArray(item.projects) ? item.projects.length : 0} projects`}
                isFavorite={true}
                onClick={() => navigate(`/admin/companies/${item.id}`)}
              />
            ))}
          </div>
        );
      }

      // News Grid
      if (activeCategory === 'main_news') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <ProjectCard
                key={item.id}
                image={getItemImageUrl(item.featured_image)}
                title={item.title}
                description={item.summary || cleanHtmlContent(item.content)?.substring(0, 150) + '...' || ''}
                location={new Date(item.date_created).toLocaleDateString()}
                category={typeof item.category_id === 'object' && item.category_id !== null && 'name' in item.category_id
                  ? (item.category_id as { name: string }).name
                  : 'News'}
                value={item.is_sponsored ? 'Sponsored' : ''}
                isFavorite={true}
                onClick={() => navigate(`/admin/news/${item.id}`)}
              />
            ))}
          </div>
        );
      }

      // Tenders Grid
      if (activeCategory === 'tenders') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <ProjectCard
                key={item.id}
                image={getItemImageUrl(item.featured_image)}
                status={item.is_free_tender ? 'Free' : 'Premium'}
                title={item.title}
                description={item.summary || cleanHtmlContent(item.content)?.substring(0, 150) + '...' || ''}
                location={new Date(item.date_created).toLocaleDateString()}
                category="Tender"
                value={item.promote ? 'Featured' : ''}
                isFavorite={true}
                onClick={() => navigate(`/admin/tenders/${item.id}`)}
              />
            ))}
          </div>
        );
      }
    }

    // Table View - Separate tables for each category with key to force re-render
    if (activeCategory === 'projects') {
      return (
        <DataTable
          key={`projects-table-${activeCategory}`}
          data={sortedItems}
          columns={projectColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={handleToggleFavorite}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={false}
        />
      );
    }

    if (activeCategory === 'companies') {
      return (
        <DataTable
          key={`companies-table-${activeCategory}`}
          data={sortedItems}
          columns={companyColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={handleToggleFavorite}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={false}
        />
      );
    }

    if (activeCategory === 'main_news') {
      return (
        <DataTable
          key={`news-table-${activeCategory}`}
          data={sortedItems}
          columns={newsColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={handleToggleFavorite}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={false}
        />
      );
    }

    if (activeCategory === 'tenders') {
      return (
        <DataTable
          key={`tenders-table-${activeCategory}`}
          data={sortedItems}
          columns={tenderColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={handleToggleFavorite}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={false}
        />
      );
    }

    return null;
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
