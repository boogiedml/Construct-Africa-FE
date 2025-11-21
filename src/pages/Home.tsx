import { ActionButton, ActivityList, ExpertCard, ProjectCard, SectionHeader, HomeSkeleton, ProjectCardSkeleton, ExpertCardSkeleton } from "../components";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../store/services/projects";
import { useGetNewsQuery } from "../store/services/news";
import { useGetTendersQuery } from "../store/services/tenders";
import { useGetExpertsQuery } from "../store/services/expert";
import {
  useGetMyFavouritesQuery,
  useToggleFavouriteMutation
} from "../store/services/favourite";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { featuredOpinions } from "../data/home.data";
import { useGetRecentViewsQuery } from "../store/services/recentlyViews";
import { cleanHtmlContent } from "../utils";

const Home = () => {
  const navigate = useNavigate();

  // Fetch featured news
  const { data: featuredNewsData, isLoading: featuredLoading } = useGetNewsQuery({
    fields: '*,featured_image.*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 1,
  });

  // Fetch sidebar articles
  const { data: sidebarArticlesData, isLoading: sidebarLoading } = useGetNewsQuery({
    fields: 'id,title,summary,category_id.*,date_created',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 4,
    offset: 1,
  });

  // Fetch recent projects
  const { data: recentProjectsData, isLoading: projectsLoading } = useGetProjectsQuery({
    fields: '*,featured_image.*,countries.countries_id.*,sectors.sectors_id.*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 6,
  });

  // Fetch recent tenders
  const { data: recentTendersData, isLoading: tendersLoading } = useGetTendersQuery({
    fields: '*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 6,
  });

  // Fetch expert opinions
  const { data: expertsData, isLoading: expertsLoading } = useGetExpertsQuery({
    fields: '*,photo.*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 2,
  });

  // Fetch user favourites (top 5)
  const { data: favouritesData, isLoading: favouritesLoading, refetch: refetchFavourites } = useGetMyFavouritesQuery({
    limit: 5,
    sort: '-date_created',
  });

  const { data: recentlyViewedData, isLoading: recentlyViewLoading } = useGetRecentViewsQuery({
    'filter[status][_eq]': 'published',
    limit: 7,
    sort: '-date_created'
  })

  const [toggleFavourite] = useToggleFavouriteMutation();

  // Extract data
  const featuredNews = featuredNewsData?.data?.[0];
  const sidebarArticles = sidebarArticlesData?.data || [];
  const recentProjects = recentProjectsData?.data || [];
  const recentTenders = recentTendersData?.data || [];
  const experts = expertsData?.data || [];
  const favourites = [
    ...(Array.isArray(favouritesData?.group?.projects)
      ? favouritesData!.group!.projects.map((p: any) => ({ ...p, collection: "project" }))
      : []),
    ...(Array.isArray(favouritesData?.group?.companies)
      ? favouritesData!.group!.companies.map((c: any) => ({ ...c, collection: "company" }))
      : []),
    ...(Array.isArray(favouritesData?.group?.news)
      ? favouritesData!.group!.news.map((n: any) => ({ ...n, collection: "news" }))
      : []),
    ...(Array.isArray(favouritesData?.group?.tenders)
      ? favouritesData!.group!.tenders.map((t: any) => ({ ...t, collection: "tender" }))
      : []),
  ];
  const recentlyViewed = [
    ...(Array.isArray(recentlyViewedData?.recent_views?.projects)
      ? recentlyViewedData!.recent_views!.projects.map((p: any) => ({ ...p, type: "Project" }))
      : []),
    ...(Array.isArray(recentlyViewedData?.recent_views?.companies)
      ? recentlyViewedData!.recent_views!.companies.map((c: any) => ({ ...c, type: "Company" }))
      : []),
    ...(Array.isArray(recentlyViewedData?.recent_views?.news)
      ? recentlyViewedData!.recent_views!.news.map((n: any) => ({ ...n, type: "News" }))
      : []),
    ...(Array.isArray(recentlyViewedData?.recent_views?.tenders)
      ? recentlyViewedData!.recent_views!.tenders.map((t: any) => ({ ...t, type: "Tender" }))
      : []),
  ]

  // Handle favourite toggle
  const handleToggleFavourite = async (collection: string, itemId: string) => {
    try {
      await toggleFavourite({
        collection: collection as any,
        item_id: itemId
      }).unwrap();

      toast.success('Favourite updated');
      refetchFavourites();
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
      toast.error('Failed to update favourite');
    }
  };

  const favouriteItems = useMemo(() => {
    const list = favourites ?? [];
    return list.map((fav: any) => ({
      id: fav.id,
      title: fav?.title || fav?.name || 'Untitled',
      type: fav.collection ? fav.collection.charAt(0).toUpperCase() + fav.collection.slice(1) : '',
      date: new Date(fav.favorite_date).toLocaleDateString(),
    }));
  }, [favourites]);

  const recentlyViewedItems = useMemo(() => {
    const list = recentlyViewed ?? [];
    return list.map((view: any) => ({
      id: view.id,
      title: view?.title || view?.name || 'Untitled',
      type: view.type ? view.type : '',
      date: new Date(view.view_date).toLocaleDateString(),
    }));
  }, [recentlyViewed]);

  const handleShowMore = (type: 'viewed' | 'favourites') => {
    if (type === 'viewed') {
      navigate('/admin/recently-viewed');
    } else {
      navigate('/admin/favourites');
    }
  };

  if (featuredLoading || sidebarLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-5 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="">
              {featuredNews ? (
                <>
                  <div className="relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/admin/news/${featuredNews.slug}`)}>
                    <img
                      src={`https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${featuredNews?.featured_image?.filename_disk}` || "https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="mt-6">
                    <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                      {'News'}
                    </span>
                    <h1 className="text-lg md:text-xl lg:text-[30px] text-[#181D27] font-bitter !font-semibold mb-2 lg:leading-10 max-w-3xl cursor-pointer hover:text-[#E0891E]"
                      onClick={() => navigate(`/admin/news/${featuredNews.slug}`)}>
                      {featuredNews.title}
                    </h1>
                    <p className="text-[#535862] text-sm md:text-base font-normal">
                      {featuredNews.summary}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No featured news available</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col justify-between lg:items-end">
            <div className="flex flex-col gap-5 max-lg:mb-5">
              {sidebarArticles.map((article) => (
                <article key={article.id} className="cursor-pointer" onClick={() => navigate(`/admin/news/${article.slug || article.id}`)}>
                  <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                    {'News'}
                  </span>

                  <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight hover:text-[#E0891E]">
                    {article.title}
                  </h3>

                  <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </article>
              ))}
            </div>
            <ActionButton
              buttonText="Read more news"
              outline
              width="fit"
              link={'/admin/news'}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-5 mt-8">
        <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
          <section className="">
            <SectionHeader title="Recently added projects" link="/admin/projects" />
            {projectsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={`project-skeleton-${index}`} />
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={`https://pub-88a719977b914c0dad108c74bdee01ff.r2.dev/${project?.featured_image?.filename_disk}` || "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"}
                    status={project.status || "Active"}
                    title={project.title}
                    description={project.summary || project.description || ''}
                    location={project.countries?.[0]?.name || '-'}
                    category={project.sectors?.[0]?.name || '-'}
                    value={project.contract_value_usd ? `$ ${project.contract_value_usd} (USD million)` : '-'}
                    isFavorite={false}
                    toggleFavorite={() => handleToggleFavourite('projects', project.id)}
                    onClick={() => navigate(`/admin/projects/${project.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No recent projects available</p>
              </div>
            )}
          </section>

          <section>
            <SectionHeader title="Tenders" link="/admin/tenders" />
            {tendersLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={`tender-skeleton-${index}`} />
                ))}
              </div>
            ) : recentTenders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentTenders.map((tender) => (
                  <ProjectCard
                    key={tender.id}
                    image="https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"
                    status={tender.status || "Active"}
                    title={tender.title}
                    description={tender.summary || ''}
                    location="-"
                    category="-"
                    onClick={() => navigate(`/admin/tenders/${tender.id}`)}
                    toggleFavorite={() => handleToggleFavourite('tenders', tender.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No tenders available</p>
              </div>
            )}
          </section>

          <section>
            <SectionHeader title="Expert opinion" />
            {expertsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
                {Array.from({ length: 2 }).map((_, index) => (
                  <ExpertCardSkeleton key={`expert-skeleton-${index}`} />
                ))}
              </div>
            ) : experts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
                {experts.map((expert) => (
                  <ExpertCard
                    key={expert.id}
                    expertImage={expert.photo ? `${import.meta.env.VITE_API_BASE_URL}/assets/${expert.photo}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"}
                    expertName={expert.name}
                    title={expert.title}
                    opinion={cleanHtmlContent(expert.opinion || expert.bio || '')}
                    expertId={expert.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No expert opinions available</p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-5">
          <ActivityList
            title="Recently viewed"
            items={recentlyViewedItems}
            showMore={true}
            onShowMore={() => handleShowMore('viewed')}
            maxHeight="400px"
            isLoading={recentlyViewLoading}
          />

          <ActivityList
            title="Favourites"
            items={favouriteItems}
            showMore={true}
            onShowMore={() => handleShowMore('favourites')}
            maxHeight="400px"
            isLoading={favouritesLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
