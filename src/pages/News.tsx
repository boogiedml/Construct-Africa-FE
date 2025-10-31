import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton, ProjectCard, Tabs, DataTable, CustomSelect, ChartsSidebar, FiltersSidebar, ProjectCardSkeleton } from "../components";
import { LuTable, LuChartPie } from "react-icons/lu";
import { CiGrid41 } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { PiFloppyDisk } from "react-icons/pi";
import type { TabItem } from "../components/Tabs";
import type { TableColumn } from "../components/DataTable";
import { useGetNewsQuery } from "../store/services/news";
import type { News as NewsType } from "../types/news.types";
import type { NewsQueryParams, AppFilters } from "../types/filter.types";
import { cleanHtmlContent } from "../utils";

const ITEMS_PER_PAGE = 25;

const News = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState('none');
  const [sortBy, setSortBy] = useState('recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});

  // Build query parameters based on state
  const queryParams = useMemo<NewsQueryParams>(() => {
    const params: NewsQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      meta: 'total_count,filter_count',
      'filter[status][_eq]': 'published', // Only show published news
    };

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

    // Add groupBy parameter based on grouping selection
    if (grouping !== 'none') {
      switch (grouping) {
        case 'category':
          params.groupBy = 'category_id.name';
          break;
        case 'author':
          params.groupBy = 'author_id.first_name';
          break;
        case 'date':
          params.groupBy = 'date_created';
          break;
      }
    }

    // Apply filters
    console.log('Applied Filters:', appliedFilters);

    // Category filters
    if (appliedFilters.category && Array.isArray(appliedFilters.category) && appliedFilters.category.length > 0) {
      // Assuming categories are stored by name, adjust if using IDs
      params['filter[category_id][name][_eq]'] = appliedFilters.category[0];
    }

    // Author filters
    if (appliedFilters.author && Array.isArray(appliedFilters.author) && appliedFilters.author.length > 0) {
      params['filter[author_id][first_name][_contains]'] = appliedFilters.author[0];
    }

    // Date filters
    if (appliedFilters.date && Array.isArray(appliedFilters.date) && appliedFilters.date.length > 0) {
      const dateFilter = appliedFilters.date[0];
      const now = new Date();
      
      switch (dateFilter) {
        case 'Last 7 days':
          const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last7Days.toISOString();
          break;
        case 'Last 30 days':
          const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last30Days.toISOString();
          break;
        case 'Last 90 days':
          const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last90Days.toISOString();
          break;
        case 'Last year':
          const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = lastYear.toISOString();
          break;
      }
    }

    // Sponsored filter (if you want to add this)
    if (appliedFilters.sponsored) {
      params['filter[is_sponsored][_eq]'] = true;
    }

    console.log('Query Params:', params);

    return params;
  }, [currentPage, sortBy, grouping, appliedFilters]);

  const { data: newsResponse, isLoading, isFetching } = useGetNewsQuery(queryParams);

  const groupingOptions = [
    { value: 'none', label: 'None' },
    { value: 'category', label: 'By category' },
    { value: 'author', label: 'By author' },
    { value: 'date', label: 'By date' }
  ];

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
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/news/${row.id}`);
          }}
          className="text-left w-full"
        >
          <div className="font-semibold text-[#181D27] hover:text-[#F89822] transition-colors mb-1 line-clamp-1">
            {row.title}
          </div>
          <div className="text-sm text-[#535862] line-clamp-2 leading-relaxed">
            {row.summary || cleanHtmlContent(row.content)?.substring(0, 150) + '...'}
          </div>
        </button>
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
    },
    {
      key: 'is_sponsored',
      label: 'Type',
      sortable: true,
      width: '10%',
      render: (value) => {
        return value ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FDF5E8] text-[#AE6A19]">
            Sponsored
          </span>
        ) : (
          <span className="text-[#535862]">Standard</span>
        );
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

  // Handle grouping change
  const handleGroupingChange = (newGrouping: string) => {
    setGrouping(newGrouping);
    setCurrentPage(1);
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    console.log('Applying filters:', filters);
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFiltersCount = Object.values(appliedFilters).filter(
    val => (Array.isArray(val) && val.length > 0) || (typeof val === 'object' && val !== null && Object.keys(val).length > 0)
  ).length;

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
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#414651]">Grouping:</span>
            <CustomSelect
              options={groupingOptions}
              value={grouping}
              onChange={handleGroupingChange}
              placeholder="None"
            />
          </div>

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <CgSortAz size={20} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowCharts(false);
                setShowFilters(!showFilters);
              }
            }}
          />

          <ActionButton
            buttonText={
              <div className="flex items-center gap-2">
                <LuChartPie />
                {showCharts ? 'Hide' : 'Show'} charts
              </div>
            }
            outline={true}
            width="fit"
            attributes={{
              onClick: () => {
                setShowFilters(false);
                setShowCharts(!showCharts);
              }
            }}
          />
        </div>
      </div>

      <section className={showCharts || showFilters ? 'flex gap-5' : ''}>
        <div className={showCharts || showFilters ? 'flex-1' : ''}>
          {/* Grid Content */}
          {activeView === 'grid' && (
            <div className="space-y-4">
              {isLoading || isFetching ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProjectCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
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
                        onClick={() => navigate(`/admin/news/${item.id}`)}
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
              onRowClick={(row: NewsType) => navigate(`/admin/news/${row.id}`)}
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

        {showCharts && (
          <ChartsSidebar isOpen={showCharts} />
        )}

        {showFilters && (
          <FiltersSidebar 
            isOpen={showFilters} 
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={appliedFilters}
            type="news"
          />
        )}
      </section>
    </div>
  );
};

export default News;