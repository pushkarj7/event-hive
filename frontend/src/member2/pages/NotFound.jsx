import { useNavigate } from "react-router-dom";
import { Compass, Home, Search, ArrowRight, Sparkles, MapPin, Ticket, CalendarDays, Ghost } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* blur orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-140 w-140 rounded-full bg-linear-to-br from-indigo-200/30 via-violet-200/20 to-transparent blur-[80px]" />
        <div className="absolute -bottom-40 -right-32 h-120 w-120 rounded-full bg-linear-to-tl from-violet-200/25 via-indigo-100/15 to-transparent blur-[70px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 h-75 w-175 rounded-full bg-linear-to-r from-indigo-50/40 to-violet-50/40 blur-[60px]" />
      </div>

      {/* minimal top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl w-full mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Ticket size={14} /></span>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">Event Hive</span>
        </button>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
          <Home size={14} /> Home
        </button>
      </div>

      {/* center */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {/* 404 hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white"><Ghost size={12} /></span>
              Lost in the hive?
              <span className="h-1 w-1 rounded-full bg-indigo-400" />
              404
            </div>

            <div className="relative mt-6">
              <h1 className="select-none text-[84px] sm:text-[120px] font-black leading-none tracking-[-0.06em] bg-linear-to-br from-slate-900 via-indigo-900 to-violet-700 bg-clip-text text-transparent">
                404
              </h1>
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-32 w-64 sm:h-40 sm:w-80 rounded-full bg-linear-to-r from-indigo-200/30 to-violet-200/30 blur-2xl" />
              </div>
            </div>

            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Page not found</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              The page you are looking for doesn't exist or has been moved. Let's get you back to discovering amazing events.
            </p>
          </div>

          {/* glass card */}
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-300/50 to-transparent" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 blur-2xl opacity-60" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Sparkles size={12} className="text-indigo-600" /> Try these instead
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <button onClick={() => navigate("/events")} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition"><Search size={16} /></span>
                  <span className="flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">Browse Events</span>
                    <span className="text-xs text-slate-500">Find trending events</span>
                  </span>
                </button>
                <button onClick={() => navigate("/")} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition"><Compass size={16} /></span>
                  <span className="flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">Go Home</span>
                    <span className="text-xs text-slate-500">Back to homepage</span>
                  </span>
                </button>
                <button onClick={() => navigate("/dashboard")} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition"><CalendarDays size={16} /></span>
                  <span className="flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">Dashboard</span>
                    <span className="text-xs text-slate-500">View your bookings</span>
                  </span>
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(79,70,229,0.3)] transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-[0_12px_32px_rgba(79,70,229,0.4)] hover:-translate-y-0.5">
                  <Home size={16} /> Back to Home <ArrowRight size={14} />
                </button>
                <button onClick={() => navigate("/events")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                  <MapPin size={14} /> Explore Events
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-slate-400">
                Error code: 404 • If you think this is a mistake, contact support — we're here to help
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-medium text-slate-400">
            Tip: use search on Events page — you might find what you were looking for ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
