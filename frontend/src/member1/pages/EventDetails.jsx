import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import { MapPin, Star, CalendarDays, ArrowLeft } from "lucide-react";

function EventDetails(){
  const { id } = useParams();
  const { events } = useAppStore();
  const navigate = useNavigate();
  const event = events.find(e => String(e.id) === String(id));
  if (!event) return (
    <div className="mx-auto max-w-7xl px-6 py-16 text-center">
      <p className="text-slate-500">Event not found</p>
      <button onClick={() => navigate("/events")} className="mt-4 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white">Back to Events</button>
    </div>
  );
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600"><ArrowLeft size={16} /> Back</button>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <img src={event.image} alt={event.title} className="h-96 w-full rounded-2xl object-cover" />
        </div>
        <div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">{event.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">{event.title}</h1>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
            <span className="flex items-center gap-2"><CalendarDays size={16} /> {event.date}</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {event.location}</span>
            <span className="flex items-center gap-2"><Star size={16} className="fill-yellow-400 text-yellow-400" /> {event.rating} / 5</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-indigo-600">₹{event.price}</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">{event.description || "Experience an unforgettable evening filled with amazing performances and great moments."}</p>
          <button onClick={() => navigate(`/booking/${event.id}`)} className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700 sm:w-auto sm:px-10">Book Now — ₹{event.price}</button>
          <button onClick={() => navigate("/events")} className="mt-3 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:ml-3 sm:w-auto sm:px-8">Explore More</button>
        </div>
      </div>
    </div>
  );
}
export default EventDetails;
