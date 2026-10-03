import { useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../components/EventCard";
import { useAppStore } from "../../store/EventContext";

const Events = () => {
  const { filteredEvents, searchQuery, setSearchQuery } = useAppStore();
  const [activeCat, setActiveCat] = useState("All");
  const cats = ["All","Technology","Concerts","Business","Art","Theatre","Sports"];
  const list = activeCat==="All" ? filteredEvents : filteredEvents.filter(e=>e.category===activeCat);
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">All Events</h1>
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search events..." className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${activeCat===c ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map(e=> <EventCard key={e.id} id={e.id} title={e.title} location={e.location} price={e.price} category={e.category} date={e.date} rating={e.rating} image={e.image} />)}
      </div>
      {list.length===0 && <p className="mt-12 text-center text-slate-500">No events found.</p>}
    </div>
  );
};
export default Events;
