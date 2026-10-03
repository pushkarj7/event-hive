import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import BookingForm from "../components/BookingForm";
import { ArrowLeft, Star, MapPin, CalendarDays, ShieldCheck, Sparkles, LayoutDashboard, UserRound, Home } from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const { events, isAuthenticated } = useAppStore();
  const navigate = useNavigate();
  const event = events.find((e) => String(e.id) === String(id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center px-6 py-16">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200/30 to-violet-200/20 blur-[80px]" />
        <div className="relative rounded-[24px] border border-slate-200 bg-white p-10 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] max-w-md w-full">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg"><ShieldCheck size={22} /></div>
          <h2 className="mt-4 text-xl font-extrabold text-slate-900">Please login to book</h2>
          <p className="mt-2 text-sm text-slate-500">Login required to complete your booking securely.</p>
          <button onClick={() => navigate("/login")} className="mt-6 w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-black transition">Go to Login</button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-16">
        <div className="text-center">
          <p className="text-slate-500">Event not found</p>
          <button onClick={() => navigate("/events")} className="mt-4 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white">Browse Events</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-200/30 via-violet-200/20 to-transparent blur-[80px] animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute top-[30%] right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-bl from-violet-200/20 via-indigo-100/15 to-transparent blur-[70px]" />
      </div>

      {/* Top bar — now with Profile + Dashboard navigation */}
      <div className="relative border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 py-4 sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Home size={14} /> Home</button>
            <button onClick={() => navigate("/profile")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"><UserRound size={14} /> Profile</button>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-black transition"><LayoutDashboard size={14} /> Dashboard</button>
            <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Secure</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 mb-8">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">1</span>
          <span className="text-xs font-bold text-slate-900">Details</span>
          <span className="h-px w-8 bg-slate-300" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md">2</span>
          <span className="text-xs font-bold text-indigo-600">Booking</span>
          <span className="h-px w-8 bg-slate-300" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">3</span>
          <span className="text-xs font-medium text-slate-400">Confirmed</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3 lg:sticky lg:top-[88px] space-y-4">
            <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition hover:shadow-[0_16px_50px_rgba(79,70,229,0.12)]">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-80" />
              <div className="relative h-64 overflow-hidden lg:h-72">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-slate-900 shadow-sm border border-white/50">{event.category}</span>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-md"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Available</span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg lg:text-3xl">{event.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-white/90">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 border border-white/20"><MapPin size={12} /> {event.location}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 border border-white/20"><CalendarDays size={12} /> {event.date}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 border border-white/20"><Star size={12} className="fill-yellow-300 text-yellow-300" /> {event.rating}/5</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">₹{event.price.toLocaleString("en-IN")}</span>
                  <span className="text-sm text-slate-500">per ticket</span>
                  <span className="ml-auto rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-700">Limited seats</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{event.description || "Secure your spot — limited seats available. Instant confirmation & e-ticket delivered to your email."}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"><ShieldCheck size={12} className="text-emerald-600" /> Secure payment</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"><Sparkles size={12} className="text-indigo-600" /> Instant e-ticket</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"><CalendarDays size={12} className="text-violet-600" /> Free cancellation</span>
                </div>
              </div>
            </div>

            {/* Quick nav — Profile / Dashboard / Browse */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => navigate("/events")} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">← Browse Events</button>
              <button onClick={() => navigate("/profile")} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">My Profile</button>
              <button onClick={() => navigate("/dashboard")} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-black">Go to Dashboard</button>
              <button onClick={() => navigate("/my-bookings")} className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100">My Bookings</button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <BookingForm event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Booking;
