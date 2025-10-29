import { useState, useMemo } from "react";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetNewsQuery } from "../store/services/news";
import type { News as NewsType } from "../types/news.types";
import type { NewsQueryParams } from "../types/filter.types";
import { cleanHtmlContent } from "../utils";

const ITEMS_PER_PAGE = 25;

const News = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recently-added');
  const [searchTerm, setSearchTerm] = useState('');

  // Build query parameters based on state
  const queryParams = useMemo<NewsQueryParams>(() => {
    const params: NewsQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
      'filter[status][_eq]': 'published', // Only show published news
    };

    // Add search if exists
    if (searchTerm) {
      params.search = searchTerm;
    }

    // Add sorting
    switch (sortBy) {
      case 'recently-added':
        params.sort = '-date_created';
        break;
      case 'oldest':
        params.sort = 'date_created';
        break;
      case 'alphabetical':
        params.sort = 'title';
        break;
      case 'date-newest':
        params.sort = '-date_updated';
        break;
      case 'date-oldest':
        params.sort = 'date_updated';
        break;
    }

    return params;
  }, [currentPage, sortBy, searchTerm]);

  const { data: newsResponse, isLoading, isFetching } = useGetNewsQuery(queryParams);

  const sortOptions = [
    { value: 'recently-added', label: 'Recently added' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'date-newest', label: 'Date (Newest First)' },
    { value: 'date-oldest', label: 'Date (Oldest First)' }
  ];

  const tableColumns: TableColumn<typeof newsItems[0]>[] = [
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      width: '40%',
      render: (_, row) => (
        <div>
          <div className="font-semibold text-[#181D27] mb-1 line-clamp-1">
            {row.title}
          </div>
          <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
            {row.summary || cleanHtmlContent(row.content)?.substring(0, 150) + '...'}
          </div>
        </div>
      )
    },
    {
      key: 'date_created',
      label: 'Date',
      sortable: true,
      width: '15%',
      render: (value) => {
        const date = new Date(value as string);
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
      }
    },
    {
      key: 'category_id',
      label: 'Category',
      sortable: true,
      width: '20%',
      render: (value: unknown) => {
        if (typeof value === 'object' && value !== null && 'name' in value) {
          return (value as { name: string }).name;
        }
        return '---';
      }
    },
    {
      key: 'author_id',
      label: 'Author',
      sortable: true,
      width: '15%',
      render: (value: unknown) => {
        if (typeof value === 'object' && value !== null && 'first_name' in value && 'last_name' in value) {
          const author = value as { first_name: string; last_name: string };
          return `${author.first_name} ${author.last_name}`;
        }
        return '---';
      }
    }
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

  const newsItems = newsResponse?.data || [];
  const totalCount = newsResponse?.meta?.filter_count || newsResponse?.meta?.total_count || newsItems.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Get featured image URL
  const getImageUrl = (featuredImage: string | NewsType['featured_image']) => {
    if (!featuredImage) return "/images/null-image.svg";
    
    if (typeof featuredImage === 'string') {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage}`;
    }
    
    if (featuredImage && typeof featuredImage === 'object' && 'filename_disk' in featuredImage) {
      return `https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredImage.filename_disk}`;
    }
    
    return "/images/null-image.svg";
  };

  return (
    <div className="min-h-screen mx-auto py-5 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#181D27] mb-1">News</h1>
          <p className="text-[#535862]">
            Showing {newsItems.length} {totalCount > 0 && `of ${totalCount}`} news articles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <PiFloppyDisk />
                Save view as default
              </div>
            }
            outline={true}
            width="fit"
          />

          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Recently added"
          />
        </div>
      </div>

      {/* View Controls */}
      <div className="flex justify-between items-center mb-6">
        <Tabs
          tabs={viewTabs}
          activeTab={activeView}
          onTabChange={setActiveView}
          variant="pills"
        />

        <div className="flex items-center gap-3">
          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <CgSortAz size={20} />
                Filters
              </div>
            }
            outline={true}
            width="fit"
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuChartPie />
                Show charts
              </div>
            }
            outline={true}
            width="fit"
          />
        </div>
      </div>

      {/* Grid Content */}
      {activeView === 'grid' && (
        <div className="space-y-4">
          {isLoading || isFetching ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsItems.map((item: NewsType) => {
                const category = typeof item.category_id === 'object' && item.category_id !== null && 'name' in item.category_id
                  ? (item.category_id as { name: string }).name
                  : 'News';

                return (
                  <ProjectCard
                    key={item.id}
                    image={getImageUrl(item.featured_image)}
                    title={item.title}
                    description={item.summary || cleanHtmlContent(item.content)?.substring(0, 150) + '...' || ''}
                    location={new Date(item.date_created).toLocaleDateString()}
                    category={category}
                    value={item.is_sponsored ? 'Sponsored' : ''}
                    isFavorite={false}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <DataTable
          data={newsItems as []}
          columns={tableColumns}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onToggleFavorite={(row) => {
            console.log('Toggle favorite:', row);
          }}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          showCheckboxes={true}
          showFavorites={true}
          loading={isLoading || isFetching}
          pageSize={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default News;
