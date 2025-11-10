import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { useInfiniteScroll } from "../store/hooks/useInfiniteScrolling";
import {
  getPresets,
  getPresetById,
  saveDefaultView,
  getDefaultView,
  type FilterPreset
} from "../utils/presets";
import { useToggleFavouriteMutation } from "../store/services/favourite";

const ITEMS_PER_PAGE = 25;

const News = () => {
  const navigate = useNavigate();

  // Load default view on component mount
  const defaultView = getDefaultView('news');

  const [activeView, setActiveView] = useState(defaultView?.activeView || 'table');
  const [currentPage, setCurrentPage] = useState(1);
  const [grouping, setGrouping] = useState(defaultView?.grouping || 'none');
  const [sortBy, setSortBy] = useState(defaultView?.sortBy || 'recently-added');
  const [showCharts, setShowCharts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppFilters>({});
  const [activePresetId, setActivePresetId] = useState<string | undefined>(defaultView?.presetId);

  // Infinite scroll state for grid view
  const [accumulatedNews, setAccumulatedNews] = useState<NewsType[]>([]);
  const [gridPage, setGridPage] = useState(1);

  // Load presets
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  useEffect(() => {
    // Load presets from localStorage
    const loadedPresets = getPresets('news');
    setPresets(loadedPresets);

    // If there's a default preset, load its filters
    if (defaultView?.presetId) {
      const defaultPreset = getPresetById(defaultView.presetId, 'news');
      if (defaultPreset) {
        setAppliedFilters(defaultPreset.filters);
        setActivePresetId(defaultPreset.id);
      }
    }
  }, []);

  const [toggleFavourite] = useToggleFavouriteMutation();

  const handleToggleFavorite = async (row: any) => {
    try {
      await toggleFavourite({
        collection: "companies",
        item_id: row.id
      }).unwrap();

      toast.success('Added to favourites');
      refetch();
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
      toast.error('Failed to add favourite');
    }
  };

  // Build query parameters based on state
  const queryParams = useMemo<NewsQueryParams>(() => {
    // Use gridPage for grid view, currentPage for table view
    const pageToUse = activeView === 'grid' ? gridPage : currentPage;

    const params: NewsQueryParams = {
      limit: ITEMS_PER_PAGE,
      offset: (pageToUse - 1) * ITEMS_PER_PAGE,
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
      default:
        // Check if sortBy is a preset ID
        if (sortBy.startsWith('preset_')) {
          params.sort = '-date_created'; // Default sort for presets
        }
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

    // Category filters
    if (appliedFilters.category && Array.isArray(appliedFilters.category) && appliedFilters.category.length > 0) {
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
        case 'Last 7 days': {
          const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last7Days.toISOString();
          break;
        }
        case 'Last 30 days': {
          const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last30Days.toISOString();
          break;
        }
        case 'Last 90 days': {
          const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = last90Days.toISOString();
          break;
        }
        case 'Last year': {
          const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          params['filter[date_created][_gte]'] = lastYear.toISOString();
          break;
        }
      }
    }

    // Sponsored filter
    if (appliedFilters.sponsored) {
      params['filter[is_sponsored][_eq]'] = true;
    }

    return params;
  }, [activeView, gridPage, currentPage, sortBy, grouping, appliedFilters]);

  const { data: newsResponse, isLoading, isFetching, refetch } = useGetNewsQuery(queryParams);

  // Reset accumulated news when filters, sorting, or view changes
  useEffect(() => {
    if (activeView === 'grid') {
      setAccumulatedNews([]);
      setGridPage(1);
    }
  }, [sortBy, grouping, appliedFilters, activeView]);

  // Accumulate news for grid view infinite scroll
  useEffect(() => {
    if (activeView === 'grid' && newsResponse?.data) {
      if (gridPage === 1) {
        // First page - replace accumulated news
        setAccumulatedNews(newsResponse.data);
      } else {
        // Subsequent pages - append to accumulated news
        setAccumulatedNews(prev => [...prev, ...newsResponse.data]);
      }
    }
  }, [newsResponse, gridPage, activeView]);

  const groupingOptions = [
    { value: 'none', label: 'None' },
    { value: 'category', label: 'By category' },
    { value: 'author', label: 'By author' },
    { value: 'date', label: 'By date' }
  ];

  // Build sort options including presets
  const sortOptions = useMemo(() => {
    const baseOptions = [
      { value: 'recently-added', label: 'Recently added' },
      { value: 'oldest', label: 'Oldest first' },
      { value: 'alphabetical', label: 'Alphabetical' },
      { value: 'date-newest', label: 'Date (Newest First)' },
      { value: 'date-oldest', label: 'Date (Oldest First)' }
    ];

    // Add presets as sort options
    const presetOptions = presets.map(preset => ({
      value: preset.id,
      label: `${preset.name}`
    }));

    return [...baseOptions, ...presetOptions];
  }, [presets]);

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

  // Use accumulated news for grid view, regular data for table view
  const newsItems = activeView === 'grid' ? accumulatedNews : (newsResponse?.data || []);
  const totalCount = newsResponse?.meta?.filter_count || newsResponse?.meta?.total_count || newsItems.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Check if there are more items to load for infinite scroll
  const hasMore = activeView === 'grid' && accumulatedNews.length < totalCount;

  // Handle load more for infinite scroll
  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setGridPage(prev => prev + 1);
    }
  };

  // Infinite scroll hook
  const observerTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading: isFetching,
    rootMargin: '100px'
  });

  // Handle page change (for table view)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedNews([]);

    // If it's a preset, load its filters
    if (newSortBy.startsWith('preset_')) {
      const preset = getPresetById(newSortBy, 'news');
      if (preset) {
        setAppliedFilters(preset.filters);
        setActivePresetId(preset.id);
      }
    } else {
      // If switching away from a preset, clear preset-specific state
      if (activePresetId) {
        setActivePresetId(undefined);
      }
    }
  };

  // Handle grouping change
  const handleGroupingChange = (newGrouping: string) => {
    setGrouping(newGrouping);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedNews([]);
  };

  // Handle apply filters
  const handleApplyFilters = (filters: AppFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setGridPage(1);
    setAccumulatedNews([]);

    // Clear active preset since filters were manually changed
    setActivePresetId(undefined);

    // If sortBy was a preset, reset to default
    if (sortBy.startsWith('preset_')) {
      setSortBy('recently-added');
    }
  };

  // Handle save view as default
  const handleSaveViewAsDefault = () => {
    saveDefaultView(
      {
        sortBy,
        grouping,
        activeView,
        presetId: activePresetId
      },
      'news'
    );

    toast.success('View saved as default successfully!');
  };

  // Handle view change
  const handleViewChange = (newView: string) => {
    setActiveView(newView);

    // Reset pagination when switching views
    if (newView === 'grid') {
      setGridPage(1);
      setAccumulatedNews([]);
    } else {
      setCurrentPage(1);
    }
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
            Showing {activeView === 'grid' ? accumulatedNews.length : newsItems.length} {totalCount > 0 && `of ${totalCount}`} news articles
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
            borderless
            width="fit"
            attributes={{
              onClick: handleSaveViewAsDefault
            }}
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
          onTabChange={handleViewChange}
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
          {/* Grid Content with Infinite Scroll */}
          {activeView === 'grid' && (
            <div
              className="overflow-y-auto space-y-4"
              style={{ height: 'calc(100vh - 280px)' }}
            >
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

              {/* Loading skeleton for infinite scroll */}
              {isFetching && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6 mt-6`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProjectCardSkeleton key={`loading-skeleton-${index}`} />
                  ))}
                </div>
              )}

              {/* Intersection observer target */}
              {hasMore && !isFetching && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                  <span className="text-sm text-[#535862]">Loading more...</span>
                </div>
              )}

              {/* End of results message */}
              {!hasMore && accumulatedNews.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[#535862]">
                    You've reached the end of the list
                  </p>
                </div>
              )}

              {/* Initial loading state */}
              {isLoading && accumulatedNews.length === 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${!showCharts && !showFilters ? 'xl:grid-cols-4' : ''} gap-6`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProjectCardSkeleton key={`initial-skeleton-${index}`} />
                  ))}
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
              onToggleFavorite={handleToggleFavorite}
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
