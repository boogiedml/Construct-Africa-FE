import { ActionButton, ActivityList, ProjectCard, SectionHeader } from "../components";
import { favouriteItems, recentlyViewedItems, recentProjects, sidebarArticles, tenders } from "../data/home.data";

const Home = () => {
    const handleShowMore = () => {
        console.log("show")
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto py-5 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="">
                            <div className="relative h-[300px] md:h-[400px] lg:h-[565px] rounded-2xl overflow-hidden">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
                                    alt="Solar panels installation"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="mt-6">
                                <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                                    West Africa
                                </span>
                                <h1 className="text-lg md:text-xl lg:text-[30px] text-[#181D27] font-bitter !font-semibold mb-2 lg:leading-10 max-w-3xl">
                                    Construction Begins On First Moroccan-Made Solar Water Heater Plant
                                </h1>
                                <p className="text-[#535862] text-sm md:text-base font-normal">
                                    Green Innov Industry Investment (Gi3) launched the construction of a plant for the first Moroccan-designed and developed solar
                                    water heaters at the Ain Johra Industrial Parkin Tiflet on 16 January.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col justify-between lg:items-end">
                        <div className="flex flex-col gap-5 max-lg:mb-5">
                            {sidebarArticles.map((article, index) => (
                                <article key={article.id + index} className="">
                                    <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium mb-1 md:mb-2">
                                        {article.category}
                                    </span>

                                    <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>

                                    <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
                                        {article.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                        <ActionButton buttonText="Read more news" outline width="fit" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mt-8">
                <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
                    <section className="">
                        <SectionHeader title="Recently added projects" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    image={project.image}
                                    status={project.status}
                                    title={project.title}
                                    description={project.description}
                                    location={project.location}
                                    category={project.category}
                                    value={project.value}
                                    isFavorite={project.isFavorite}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Tenders" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tenders.map((tender) => (
                                <ProjectCard
                                    key={tender.id}
                                    image={tender.image}
                                    status={tender.status}
                                    title={tender.title}
                                    description={tender.description}
                                    location={tender.location}
                                    category={tender.category}
                                    deadline={tender.deadline}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <ActivityList
                        title="Recently viewed"
                        items={recentlyViewedItems}
                        showMore={true}
                        onShowMore={() => handleShowMore()}
                        // onItemClick={handleItemClick}
                        maxHeight="400px"
                    />

                    <ActivityList
                        title="Favourites"
                        items={favouriteItems}
                        showMore={true}
                        onShowMore={() => handleShowMore()}
                        // onItemClick={handleItemClick}
                        maxHeight="400px"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;