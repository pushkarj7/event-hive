import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EventCard({ id, title, location, price, category, date, image, rating }) {
  const navigate = useNavigate();
  const eventsDate = new Date(date);
  const month = eventsDate.toLocaleString("en-US", { month: "short" });
  const day = eventsDate.getDate();
  return (
    <div className="group w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => navigate(`/event/${id}`)}>
        <img src={image} alt={title} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute bottom-3 left-3 rounded-lg bg-white px-2.5 py-1.5 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500">{month}</p>
          <p className="text-lg font-bold leading-none text-slate-900">{day}</p>
        </div>
        <button onClick={(e) => e.stopPropagation()} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-[#EEF2FF]">
          <Heart size={18} className="text-slate-700" />
        </button>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => navigate(`/event/${id}`)}>
        <span className="inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-indigo-600">{category}</span>
        <h2 className="mt-3 line-clamp-1 text-lg font-bold text-slate-900">{title}</h2>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={14} /><span>{location}</span></div>
        <div className="mt-3 flex items-center gap-1.5">
          <Star size={15} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-slate-900">{rating}</span><span className="text-sm text-slate-500">/5</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-slate-200 px-4 py-3">
        <p className="text-lg font-bold text-slate-900">₹{price}</p>
        <button onClick={() => navigate(`/booking/${id}`)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">Book Now</button>
      </div>
    </div>
  );
}
export default EventCard;
