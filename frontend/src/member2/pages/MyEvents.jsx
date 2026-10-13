import { useNavigate } from "react-router-dom";
import {
  CalendarDays, MapPin, IndianRupee, LayoutDashboard, PlusCircle,
  Sparkles, Ticket, Users, Home, ImageOff,
} from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import Sidebar from "../../member1/components/Sidebar";

/**
 * Organizer view of ONLY the events this user created via Create Event.
 * The public /events catalogue is intentionally not shown here.
 */
export default function MyEvents() {
  const navigate = useNavigate();
  const { myEvents } = useAppStore();

  const totalRevenue = myEvents.reduce((sum, e) => sum + (Number(e.price) || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="transition-[margin] duration-300 ease-out ml-0 lg:ml-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Organizer Dashboard
              </p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                  <CalendarDays size={18} />
                </span>
                My Events
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Events you created. Only these show up here.
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <button
                onClick={() => navigate("/create-event")}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-indigo-700 hover:to-violet-700 sm:flex-none"
              >
                <PlusCircle size={16} /> Create Event
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:flex-none"
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Events Created", value: myEvents.length, Icon: Ticket, tone: "text-indigo-600 bg-indigo-50" },
              { label: "Listed Value", value: `₹${totalRevenue.toLocaleString("en-IN")}`, Icon: IndianRupee, tone: "text-emerald-600 bg-emerald-50" },
              { label: "Categories", value: new Set(myEvents.map((e) => e.category)).size, Icon: Sparkles, tone: "text-amber-600 bg-amber-50" },
            ].map(({ label, value, Icon, tone }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
                    <Icon size={14} />
                  </span>
                  {label}
                </div>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {myEvents.length === 0 ? (
            <div className="mt-8 rounded-[28px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200">
                <ImageOff size={24} className="text-slate-400" />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">No events created yet</h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Events you create will show up here — and nowhere else. The public
                Events page stays separate.
              </p>
              <button
                onClick={() => navigate("/create-event")}
                className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:from-indigo-700 hover:to-violet-700"
              >
                <PlusCircle size={16} className="mr-1.5 inline" />
                Create your first event
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {myEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {event.category || "General"}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <CalendarDays size={13} className="text-primary" />
                      {event.formattedDate || event.date || "Upcoming"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-primary">
                      {event.title}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} className="shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {event.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3.5">
                      <div>
                        <span className="text-[11px] text-slate-500">Ticket price</span>
                        <p className="text-base font-extrabold text-slate-900">
                          ₹{Number(event.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/booking/${event.id}`)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark"
                      >
                        <Users size={13} /> View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <Home size={14} /> Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}