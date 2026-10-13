import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import ThemeToggle from "../../member1/components/ThemeToggle";
import { XCircle, CalendarDays, MapPin, Ticket, ArrowRight, Sparkles, ShieldCheck, RotateCcw, Search, Home, LayoutDashboard } from "lucide-react";

const BookingCancelled = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookings } = useAppStore();

  // try to resolve cancelled booking from state or last cancelled in list
  const stateBooking = location.state?.booking || null;
  const lastCancelled = [...bookings].find((b) => b.status === "Cancelled") || null;
  const booking = stateBooking || lastCancelled;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* blur orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-140 w-140 rounded-full bg-linear-to-br from-rose-200/25 via-orange-200/15 to-transparent blur-[80px]" />
        <div className="absolute -bottom-40 -right-32 h-120 w-120 rounded-full bg-linear-to-tl from-amber-100/30 via-rose-100/15 to-transparent blur-[70px]" />
      </div>

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl w-full mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Ticket size={14} /></span>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">Event Hive</span>
        </button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => navigate("/my-bookings")} className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Ticket size={14} /> My Bookings
          </button>
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-black">
            <Home size={14} /> Home
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {/* icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-rose-400 to-orange-400 blur-[18px] opacity-30" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-rose-500 to-orange-500 text-white shadow-[0_12px_32px_rgba(244,63,94,0.35)] ring-4 ring-white">
                <XCircle size={36} strokeWidth={2.2} />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-rose-600 shadow-md ring-2 ring-rose-100 text-xs font-black">!</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" /> Booking Cancelled
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              You canceled your booking
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your booking has been cancelled successfully. No charges applied — refund (if any) will reflect in 3–5 business days.
            </p>
          </div>

          {/* details card */}
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-200/60 to-transparent" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br from-rose-100 to-orange-100 blur-2xl opacity-60" />

            {booking ? (
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Cancelled booking</p>
                  <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-extrabold text-white shadow-sm">Cancelled</span>
                </div>

                <div className="mt-4 flex gap-4">
                  <img src={booking.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} alt={booking.event} className="h-20 w-20 rounded-2xl object-cover shadow-sm shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-base font-extrabold text-slate-900 truncate">{booking.event} <Sparkles size={12} className="text-amber-500 shrink-0" /></p>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5"><CalendarDays size={10} /> {booking.date}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5"><MapPin size={10} /> {booking.location || "—"}</span>
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                      <Ticket size={10} /> {booking.tickets} ticket(s) <span className="opacity-60">•</span> {booking.amount}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 truncate">{booking.user} • {booking.id}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 border border-slate-200 p-3">
                  <div className="text-center">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Status</p>
                    <p className="mt-1 text-sm font-extrabold text-rose-600">Cancelled</p>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Refund</p>
                    <p className="mt-1 text-sm font-extrabold text-emerald-600">Processing</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Support</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-700">24/7</p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
                  <ShieldCheck size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs leading-5 text-amber-800">
                    Need help? Contact support with <span className="font-bold">{booking.id}</span> — we usually respond within 2 hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-bold text-slate-700">No booking details found</p>
                <p className="mt-1 text-xs text-slate-500">If you cancelled just now, check My Bookings — it will show as Cancelled.</p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-5">
              <button onClick={() => navigate("/my-bookings")} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-slate-900 to-slate-800 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-black hover:to-slate-900 transition">
                <Ticket size={16} /> View My Bookings
              </button>
              <button onClick={() => navigate("/events")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                <Search size={14} /> Browse Events <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* quick actions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <RotateCcw size={14} /> Go Back
            </button>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <LayoutDashboard size={14} /> Dashboard
            </button>
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <Home size={14} /> Home
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Changed your mind? Re-book anytime — your event is still available ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCancelled;
