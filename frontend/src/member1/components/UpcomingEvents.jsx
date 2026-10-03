import { CalendarDays, MapPin } from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const { filteredEvents } = useAppStore();
  const navigate = useNavigate();
  const upcoming = filteredEvents.slice(0, 3);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Upcoming Events</h3>
        <button onClick={() => navigate("/events")} className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All</button>
      </div>
      <div className="mt-5 space-y-3">
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500">No upcoming events</p>
        ) : upcoming.map((e) => (
          <button key={e.id} onClick={() => navigate(`/event/${e.id}`)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50">
            <img src={e.image} alt={e.title} className="h-10 w-10 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{e.title}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={12} /> {e.date} <span className="mx-1">•</span> <MapPin size={12} /> {e.location}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">{e.status}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default UpcomingEvents;
