import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import {Laptop,Music,Briefcase,Palette,Drama,Trophy,ArrowRight} from "lucide-react"
function Home(){
    const categories=[
        {
            id:1,
            name:"Technology",
            icon:Laptop,
        },
        {
            id:2,
            name:"Concerts",
            icon:Music,
        },
        {
            id:3,
            name:"Business",
            icon:Briefcase,
        },
        {
            id:4,
            name:"Art",
            icon:Palette,
        },
        {
            id:5,
            name:"Theatre",
            icon:Drama,
        },
        {
            id:6,
            name:"Sports",
            icon:Trophy,
        },
    ];
    const events= [
        {
            id:1,
            title:"Tech",
            location:"New Delhi",
            price:499,
            category:"Tech",
            date:"2026-10-25",
            rating:4.5,
            image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        },
        {
            id:2,
            title:"Concert",
            location:"New York",
            price:999,
            category:"Concert",
            date:"2026-10-26",
            rating:4.9,
            image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        },
        {
            id:3,
            title:"Conference",
            location:"New York",
            price:1299,
            category:"Conference",
            date:"2026-10-27",
            rating:4.2,
            image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca",
        },
        {
            id:4,
            title:"Exibition",
            location:"New York",
            price:499,
            category:"Exibition",
            date:"2026-10-25",
            rating:3.4,
            image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
        },
        {
            id:5,
            title:"Theatre",
            location:"New York",
            price:999,
            category:"Theatre",
            date:"2026-10-26",
            rating:4.7,
            image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
             }, 
    ];
      return(
       <>
        <Hero />
        {/* featured events */}
        <section className="bg-background px-6 py-12">
           <div className="mx-auto max-w-7xl">
            {/* section header  */}
             <div className="mb-8 grid gap-4 md:grid-cols-3 md:items-end">
            {/* left content  */}
            <div>
             <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
              Don't miss out
             </p>
              <button className="mt-3 hidden items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark md:flex">
             View All
             <ArrowRight size={16}/>
              </button>
          </div> 
          {/* center content */}
           <div className="md:text-center">
             <h2 className="text-3xl font-bold text-text">
              Event Categories
             </h2>        
            </div>
            {/* right content */}
             <p className="text-sm leading-6 text-text-secondary md:text-right">
              Explore some of the most popular events happening around you.
             </p>
            </div>
         {/* categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) =>{
             const Icon =category.icon;
             return(
                <button
                key={category.id}
                className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF]
                     text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon size={24}/>
                 </div>
                 <span className="mt-4 text-sm font-semibold text-text">
                     {category.name}                 
                    </span>
                 </button>
                 );
              })}
          </div>
          </div>
          </section>
          {/* trending events */}
        <section className="bg-background px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className='mb-8 flex items-end justify-between'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-wide text-text-secondary'> 
                      Discover What's Happening
                    </p>
                    <h2 className='mt-2 text-3xl font-bold text-text'>
                     Trending Events
                    </h2>
                </div>
              <button className='hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark md:flex'>
              View All
              <ArrowRight size={16}/>
              </button>
            </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {events.map((event)=>(
            <EventCard 
            key={event.id}
             title={event.title}
             location={event.location}
             price={event.price}
             category={event.category}
             date={event.date}
             rating={event.rating}
             image={event.image}
            />
        ))}
        </div>
        </div>
        </section>
         {/* cta section */}
        <section className='px-3 py-16 sm:px-4 md:px-6'>
            <div className="w-full">
                <div className='overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center shadow-lg sm:px-10 md:py-16'>
                 <h2 className='mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl'>
                  Ready to Find Your Next Event?
                 </h2>
                 <p className="mx-auto mt-4 max-w-xl text-sm leading-e6 text-indigo-100 md:text-base">
                   Discover exciting events,connect with amazing experinences,and book your tickets with us.
                 </p>
                 <button className='mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
                    Explore Events
                    <ArrowRight size={16}/>
                 </button>
                </div>
            </div>
        </section>
       </>
    );
}
export default Home;