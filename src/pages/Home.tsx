// import { ActionButton, ActivityList, ExpertCard, ProjectCard, SectionHeader } from "../components";
// import { favouriteItems, featuredOpinions, recentlyViewedItems, recentProjects, sidebarArticles, tenders } from "../data/home.data";

// const Home = () => {
//     const handleShowMore = () => {
//         console.log("show")
//     };

//     return (
//         <div className="min-h-screen">
//             <div className="mx-auto py-5 md:py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2">
//                         <div className="">
//                             <div className="relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden">
//                                 <img
//                                     src="https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
//                                     alt="Solar panels installation"
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                             </div>

//                             <div className="mt-6">
//                                 <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
//                                     West Africa
//                                 </span>
//                                 <h1 className="text-lg md:text-xl lg:text-[30px] text-[#181D27] font-bitter !font-semibold mb-2 lg:leading-10 max-w-3xl">
//                                     Construction Begins On First Moroccan-Made Solar Water Heater Plant
//                                 </h1>
//                                 <p className="text-[#535862] text-sm md:text-base font-normal">
//                                     Green Innov Industry Investment (Gi3) launched the construction of a plant for the first Moroccan-designed and developed solar
//                                     water heaters at the Ain Johra Industrial Parkin Tiflet on 16 January.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1 flex flex-col justify-between lg:items-end">
//                         <div className="flex flex-col gap-5 max-lg:mb-5">
//                             {sidebarArticles.map((article, index) => (
//                                 <article key={article.id + index} className="">
//                                     <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
//                                         {article.category}
//                                     </span>

//                                     <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight">
//                                         {article.title}
//                                     </h3>

//                                     <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
//                                         {article.description}
//                                     </p>
//                                 </article>
//                             ))}
//                         </div>
//                         <ActionButton buttonText="Read more news" outline width="fit" />
//                     </div>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-5 mt-8">
//                 <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
//                     <section className="">
//                         <SectionHeader title="Recently added projects" />
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {recentProjects.map((project) => (
//                                 <ProjectCard
//                                     key={project.id}
//                                     image={project.image}
//                                     status={project.status}
//                                     title={project.title}
//                                     description={project.description}
//                                     location={project.location}
//                                     category={project.category}
//                                     value={project.value}
//                                     isFavorite={project.isFavorite}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                     <section>
//                         <SectionHeader title="Tenders" />
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {tenders.map((tender) => (
//                                 <ProjectCard
//                                     key={tender.id}
//                                     image={tender.image}
//                                     status={tender.status}
//                                     title={tender.title}
//                                     description={tender.description}
//                                     location={tender.location}
//                                     category={tender.category}
//                                     deadline={tender.deadline}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                     <section>
//                         <SectionHeader title="Expert opinion" />
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
//                             {featuredOpinions.slice(0, 2).map((expert, index) => (
//                                 <ExpertCard
//                                     key={expert.id || index}
//                                     expertImage={expert.image}
//                                     expertName={expert.name}
//                                     title={expert.title}
//                                     opinion={expert.opinion}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//                 <div className="lg:col-span-2 flex flex-col gap-5">
//                     <ActivityList
//                         title="Recently viewed"
//                         items={recentlyViewedItems}
//                         showMore={true}
//                         onShowMore={() => handleShowMore()}
//                         maxHeight="400px"
//                     />

//                     <ActivityList
//                         title="Favourites"
//                         items={favouriteItems}
//                         showMore={true}
//                         onShowMore={() => handleShowMore()}
//                         maxHeight="400px"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;



// src/pages/Home.tsx

import { ActionButton, ActivityList, ExpertCard, ProjectCard, SectionHeader } from "../components";
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
import { featuredOpinions, recentlyViewedItems } from "../data/home.data";

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
    limit: 3,
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
    fields: '*,image.*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: 2,
  });

  // Fetch user favourites (top 5)
  const { data: favouritesData, isLoading: favouritesLoading, refetch: refetchFavourites } = useGetMyFavouritesQuery({
    limit: 5,
    sort: '-date_created',
  });

  const [toggleFavourite] = useToggleFavouriteMutation();

  // Extract data
  const featuredNews = featuredNewsData?.data?.[0];
  const sidebarArticles = sidebarArticlesData?.data || [];
  const recentProjects = recentProjectsData?.data || [];
  const recentTenders = recentTendersData?.data || [];
  const experts = expertsData?.data || [];
  const favourites = favouritesData?.data || [];

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

  // Format favourites for ActivityList
  const favouriteItems = useMemo(() => {
    return favourites.data?.map((fav: any) => ({
      id: fav.id,
      title: fav.item?.title || 'Untitled',
      subtitle: fav.collection.charAt(0).toUpperCase() + fav.collection.slice(1),
      date: fav.date_created
    }));
  }, [favourites]);

  const handleShowMore = (type: 'viewed' | 'favourites') => {
    if (type === 'viewed') {
      navigate('/recently-viewed');
    } else {
      navigate('/favourites');
    }
  };

  // Loading state for hero section
  if (featuredLoading || sidebarLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366F1]"></div>
      </div>
    );
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
                    onClick={() => navigate(`/news/${featuredNews.slug}`)}>
                    <img
                      src={featuredNews.featured_image || "https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="mt-6">
                    <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                      {featuredNews.category || 'News'}
                    </span>
                    <h1 className="text-lg md:text-xl lg:text-[30px] text-[#181D27] font-bitter !font-semibold mb-2 lg:leading-10 max-w-3xl cursor-pointer hover:text-[#6366F1]"
                      onClick={() => navigate(`/news/${featuredNews.slug}`)}>
                      {featuredNews.title}
                    </h1>
                    <p className="text-[#535862] text-sm md:text-base font-normal">
                      {featuredNews.summary || featuredNews.description}
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
                <article key={article.id} className="cursor-pointer" onClick={() => navigate(`/news/${article.slug || article.id}`)}>
                  <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                    {article.category || 'News'}
                  </span>

                  <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight hover:text-[#6366F1]">
                    {article.title}
                  </h3>

                  <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
                    {article.summary || article.description}
                  </p>
                </article>
              ))}
            </div>
            <ActionButton
              buttonText="Read more news"
              outline
              width="fit"
              link={() => navigate('/news')}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-5 mt-8">
        <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
          <section className="">
            <SectionHeader title="Recently added projects" />
            {projectsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={project.featured_image || "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"}
                    status={project.status || "Active"}
                    title={project.title}
                    description={project.summary || project.description}
                    location={project.countries?.[0]?.countries_id?.name || '-'}
                    category={project.sectors?.[0]?.sectors_id?.name || '-'}
                    value={project.value ? `$ ${project.value} (USD million)` : '-'}
                    isFavorite={false}
                    onToggleFavorite={() => handleToggleFavourite('projects', project.id)}
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
            <SectionHeader title="Tenders" />
            {tendersLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
              </div>
            ) : recentTenders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentTenders.map((tender) => (
                  <ProjectCard
                    key={tender.id}
                    image="https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80"
                    status={tender.status || "Active"}
                    title={tender.title}
                    description={tender.summary || tender.description}
                    location="-"
                    category="-"
                    deadline={tender.closing_date}
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
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
              </div>
            ) : experts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
                {experts.map((expert) => (
                  <ExpertCard
                    key={expert.id}
                    expertImage={expert.image || ""}
                    expertName={expert.name}
                    title={expert.title}
                    opinion={expert.opinion}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mt-5 lg:mt-10">
                {featuredOpinions.slice(0, 2).map((expert, index) => (
                  <ExpertCard
                    key={expert.id || index}
                    expertImage={expert.image}
                    expertName={expert.name}
                    title={expert.title}
                    opinion={expert.opinion}
                  />
                ))}
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
