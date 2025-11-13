import { newsArticles, sidebarArticles } from '../data/home.data'
import { ActionButton, Select } from '../components'
import ProjectCard2 from '../components/ProjectCard2'
import { CgSortAz } from 'react-icons/cg'

const PublicNews = () => {
    // const [selectedRegion, setSelectedRegion] = useState("All");
    // const [selectedCountry, setSelectedCountry] = useState("All");
    // const [selectedSector, setSelectedSector] = useState("All");

    // Filter options
    const regions = ["All", "West Africa", "East Africa", "South Africa", "Central Africa", "North Africa"];
    const countries = ["All", "Nigeria", "Kenya", "South Africa", "Egypt", "Ghana"];
    const sectors = ["All", "Infrastructure", "Energy", "Transportation", "Housing", "Technology"];

    // const clearAllFilters = () => {
    //     setSelectedRegion("All");
    //     setSelectedCountry("All");
    //     setSelectedSector("All");
    // };

  return (
      <div className="min-h-screen">
          <section className="mx-auto py-5 md:py-8 px-5 sm:px-10 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                      <div className='text-lg font-semibold text-[#181D27] border-b-4 mb-5 border-[#F89822] py-1 px-2 w-fit'>Top News</div>
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
                              <div className='flex items-center gap-2 mb-1 md:mb-2'>
                                  {/* <span className='w-[32px] h-[32px] flex justify-center items-center border border-[#E9EAEB] rounded-full'>
                                      <FiLock color='#E0891E' size={12} />
                                  </span> */}
                                  <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">
                                      West Africa
                                  </span>
                              </div>
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

                  <div className="lg:col-span-1 flex flex-col">
                      <div className='text-lg font-semibold text-[#181D27] border-b-4 mb-5 border-[#F89822] py-1 px-2 w-fit'>Latest News</div>
                      <div className='lg:items-end flex flex-col'>
                          <div className="flex flex-col gap-5 max-lg:mb-5">
                              {sidebarArticles.map((article, index) => (
                                  <article key={article.id + index} className="">
                                      <div className='flex items-center gap-2 mb-1 md:mb-2'>
                                          {/* <span className='w-[32px] h-[32px] flex justify-center items-center border border-[#E9EAEB] rounded-full'>
                                              <FiLock color='#E0891E' size={12} />
                                          </span> */}
                                          <span className="inline-block text-[#E0891E] text-xs md:text-sm font-medium">
                                              {article.category}
                                          </span>
                                      </div>

                                      <h3 className="text-base md:text-[20px] !font-semibold text-[#181D27] mb-1 md:mb-2 line-clamp-2 leading-tight">
                                          {article.title}
                                      </h3>

                                      <p className="text-[#535862] text-sm md:text-base line-clamp-2 leading-relaxed">
                                          {article.description}
                                      </p>
                                  </article>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section className='px-5 sm:px-10 lg:px-20 py-10'>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
                  <div className='text-lg font-semibold text-[#181D27] border-b-4 border-[#F89822] py-1 pr-4 w-fit'>All News</div>
                  <ActionButton
                      buttonText={
                          <div className="flex items-center gap-2">
                              <CgSortAz size={22} />
                              Filters
                          </div>
                      }
                      outline
                      width="fit"
                      link='/filters'
                      paddingX='px-4'
                  />
              </div>

              <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                          <div className='w-[300px]'>
                              <Select
                                  label="Region"
                                  labelFor="region"
                                  labelColor="text-[#181D27]"
                                  placeholder="Select Region"
                                  options={regions.map((region) => ({ value: region, label: region }))}
                              />
                          </div>

                          <div className='w-[300px]'>
                              <Select
                                  label="Country"
                                  labelFor="country"
                                  labelColor="text-[#181D27]"
                                  placeholder="Select Country"
                                  options={countries.map((country) => ({ value: country, label: country }))}
                              />
                          </div>

                          <div className='w-[300px]'>
                              <Select
                                  label="Sector"
                                  labelFor="sector"
                                  labelColor="text-[#181D27]"
                                  placeholder="Select Sector"
                                  options={sectors.map((sector) => ({ value: sector, label: sector }))}
                              />
                          </div>
                      </div>

                      <div className="flex items-end">
                          <ActionButton
                              buttonText="Clear All"
                              outline
                              width="fit"
                          // attributes={{ type: "button", onClick: clearAllFilters }}
                          />
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {newsArticles.map((article) => (
                      <ProjectCard2
                          key={article.id}
                          id={article.id}
                          image={article.image}
                          region={article.region}
                          title={article.title}
                          description={article.description}
                          author={article.author}
                          date={article.date}
                          isPaid={article.isPaid}
                          linkPath={`/insights/${article.id}`}
                      />
                  ))}
              </div>
          </section>
      </div>
  )
}

export default PublicNews