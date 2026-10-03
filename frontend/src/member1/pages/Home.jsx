import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { Laptop, Music, Briefcase, Palette, Drama, Trophy, ArrowRight } from "lucide-react"
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home(){
    const { filteredEvents } = useAppStore();
    const navigate = useNavigate();
    const [activeCat, setActiveCat] = useState("All");
    const categories=[
        { id: 1, name: "Technology", icon: Laptop },
        { id: 2, name: "Concerts", icon: Music },
        { id: 3, name: "Business", icon: Briefcase },
        { id: 4, name: "Art", icon: Palette },
        { id: 5, name: "Theatre", icon: Drama },
        { id: 6, name: "Sports", icon: Trophy },
    ];
    const display = activeCat === "All" ? filteredEvents : filteredEvents.filter(e => e.category === activeCat);
    return(
       <>
        <Hero />
        <section className="bg-background px-6 py-12">
           <div className="mx-auto max-w-7xl">
            <div className="mb-8 grid gap-4 md:grid-cols-3 md:items-end">
            <div>
             <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Don't miss out</p>
              <button onClick={() => navigate("/events")} className="mt-3 hidden items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark md:flex">
             View All <ArrowRight size={16}/></button>
          </div>
           <div className="md:text-center"><h2 className="text-3xl font-bold text-text">Event Categories</h2></div>
            <p className="text-sm leading-6 text-text-secondary md:text-right">Explore some of the most popular events happening around you.</p>
            </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <button onClick={() => setActiveCat("All")} className={`group flex flex-col items-center justify-center rounded-xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 ${activeCat==="All" ? "border-primary bg-primary text-white" : "border-slate-200 bg-white hover:border-primary hover:shadow-md"}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${activeCat==="All" ? "bg-white text-primary" : "bg-[#EEF2FF] text-primary group-hover:bg-primary group-hover:text-white"}`}><Trophy size={20} /></div>
                <span className={`mt-4 text-sm font-semibold ${activeCat==="All" ? "text-white" : "text-text"}`}>All</span>
            </button>
            {categories.map((category) =>{
             const Icon =category.icon;
             return(
                <button
                key={category.id}
                onClick={() => setActiveCat(category.name)}
                className={`group flex flex-col items-center justify-center rounded-xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${activeCat===category.name ? "border-primary bg-primary text-white" : "border-slate-200 bg-white hover:border-primary"}`}
                >
                 <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${activeCat===category.name ? "bg-white text-primary" : "bg-[#EEF2FF] text-primary group-hover:bg-primary group-hover:text-white"}`}>
                        <Icon size={24}/>
                 </div>
                 <span className={`mt-4 text-sm font-semibold ${activeCat===category.name ? "text-white" : "text-text"}`}>{category.name}</span>
                 </button>
                 );
              })}
          </div>
          </div>
          </section>
        <section className="bg-background px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className='mb-8 flex items-end justify-between'>
                <div><p className='text-sm font-semibold uppercase tracking-wide text-text-secondary'>Discover What's Happening</p>
                    <h2 className='mt-2 text-3xl font-bold text-text'>Trending Events</h2></div>
              <button onClick={() => navigate("/events")} className='hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark md:flex'>View All<ArrowRight size={16}/></button>
            </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {display.slice(0,6).map((event)=>(
            <EventCard key={event.id} id={event.id} title={event.title} location={event.location} price={event.price} category={event.category} date={event.date} rating={event.rating} image={event.image} />
        ))}
        </div>
        {display.length===0 && <p className="mt-8 text-center text-slate-500">No events found. Try another search or category.</p>}
        </div>
        </section>
        <section className='px-3 py-16 sm:px-4 md:px-6'>
            <div className="w-full">
                <div className='overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center shadow-lg sm:px-10 md:py-16'>
                 <h2 className='mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl'>Ready to Find Your Next Event?</h2>
                 <p className="mx-auto mt-4 max-w-xl text-sm leading-e6 text-indigo-100 md:text-base">Discover exciting events,connect with amazing experinences,and book your tickets with us.</p>
                 <button onClick={() => navigate("/events")} className='mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>Explore Events<ArrowRight size={16}/></button>
                </div>
            </div>
        </section>
       </>
    );
}
export default Home;
