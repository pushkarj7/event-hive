import { useState, useMemo } from "react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatCard from "../../member1/components/StatCard";
import BookingsOverview from "../../member1/components/BookingsOverview";
import UpcomingEvents from "../../member1/components/UpcomingEvents";
import LatestBookings from "../../member1/components/LatestBookings";
import BookingModal from "../../member1/components/BookingModal";
import { ALL_EVENTS } from "../../member1/data/eventsData";
import {
  CalendarDays,
  Ticket,
  Users,
  IndianRupee,
  LayoutDashboard,
  Save,
  LogOut,
  Trash2,
  UserRound,
  Mail,
  Phone,
  Sparkles,
  Crown,
  ArrowUpRight,
  Zap,
  Heart,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

const Profile = () => {
  const { user, stats, bookings, wishlist, removeFromWishlist, events, updateProfile, logout } = useAppStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(() => searchParams.get("tab") || "profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email || "", phone: user.phone || "" });
  const [saved, setSaved] = useState(false);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  // Combine ALL_EVENTS with any organizer custom events
  const allAvailableEvents = useMemo(() => {
    const list = [...ALL_EVENTS];
    if (Array.isArray(events)) {
      events.forEach((ce) => {
        if (!list.some((e) => String(e.id) === String(ce.id))) {
          list.push({
            id: ce.id || Date.now(),
            title: ce.title,
            category: ce.category || "General",
            date: ce.date || "2026-12-01",
            formattedDate: ce.formattedDate || ce.date || "Upcoming",
            location: ce.location || "Venue, India",
            price: Number(ce.price) || 999,
            rating: ce.rating || 4.8,
            image: ce.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
            description: ce.description || "Live event on Event Hive",
          });
        }
      });
    }
    return list;
  }, [events]);

  // Find all wishlisted events
  const wishlistedEvents = useMemo(() => {
    return allAvailableEvents.filter((ev) =>
      wishlist.some((id) => String(id) === String(ev.id))
    );
  }, [allAvailableEvents, wishlist]);

  const handleSave = () => {
    if (!form.name.trim()) return;
    updateProfile({ name: form.name, email: form.email, phone: form.phone });
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200/40 via-violet-200/30 to-transparent blur-[80px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-violet-200/30 via-indigo-100/20 to-transparent blur-[70px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-[40%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-50/50 to-transparent blur-[90px]" />
      </div>

      {/* Top bar */}
      <div className="relative border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 py-4 sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Crown size={16} /></div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">My Account</h1>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active</span>
          </div>
          <button onClick={() => navigate("/")} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow">← Home</button>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        {/* Hero Header Card */}
        <div className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-7 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:shadow-[0_12px_50px_rgba(79,70,229,0.12)]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 blur-2xl opacity-60 transition group-hover:opacity-80" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 opacity-30 blur-md" />
                <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-2xl font-extrabold text-white shadow-[0_8px_24px_rgba(79,70,229,0.35)] ring-4 ring-white">
                  {user.initial}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-white text-[10px]">✓</span>
              </div>
              <div>
                <p className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
                  {user.name}
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"><Crown size={10} /> PRO</span>
                </p>
                <p className="text-sm text-slate-500">{user.email || user.phone || user.role}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  {saved ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm animate-bounce">Saved ✓</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Organizer • Event Hive</span>
                  )}
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400"><Zap size={12} className="text-amber-500" /> {bookings.length} bookings • {wishlistedEvents.length} wishlisted</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTab("wishlist")} className="group/btn relative overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-rose-200 hover:bg-rose-50">
                <span className="relative flex items-center gap-1.5">
                  <Heart size={14} className="fill-rose-500 text-rose-500" /> Wishlist
                  <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-bold text-white">{wishlistedEvents.length}</span>
                </span>
              </button>
              <button onClick={() => navigate("/my-bookings")} className="group/btn relative overflow-hidden rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50">
                <span className="relative flex items-center gap-1.5">My Bookings <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-bold text-white">{bookings.length}</span></span>
              </button>
              <button onClick={() => navigate("/create-event")} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)] transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-[0_10px_28px_rgba(79,70,229,0.45)] hover:-translate-y-0.5 active:translate-y-0">
                + Create Event
              </button>
            </div>
          </div>

          {/* Tabs — pill with indicator */}
          <div className="mt-7 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            {[
              { id: "profile", label: "Profile", icon: UserRound },
              { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistedEvents.length },
              { id: "bookings", label: "Bookings", icon: Ticket, count: bookings.length },
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-all ${
                  tab === t.id
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]"
                    : "bg-slate-100 text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 border border-transparent hover:border-slate-200"
                }`}
              >
                {t.icon && <t.icon size={14} className={t.id === "wishlist" && tab !== t.id ? "text-rose-500" : ""} />}
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      tab === t.id
                        ? "bg-white/20 text-white"
                        : t.id === "wishlist"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
                {tab === t.id && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Profile Tab */}
        {tab === "profile" && (
          <>
            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Total Events", value: stats.totalEvents, sub: "Active", grad: "from-indigo-500 to-violet-500", bg: "bg-indigo-50", icon: CalendarDays },
                { label: "My Bookings", value: stats.totalBookings, sub: "+3 this week", grad: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", icon: Ticket },
                { label: "Wishlisted", value: wishlistedEvents.length, sub: "Saved events", grad: "from-rose-500 to-pink-500", bg: "bg-rose-50", icon: Heart },
                { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, sub: "Lifetime", grad: "from-violet-500 to-purple-500", bg: "bg-violet-50", icon: IndianRupee },
              ].map((s) => (
                <div key={s.label} className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-slate-300">
                  <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${s.grad} opacity-80`} />
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg} transition group-hover:scale-110`}>
                    <s.icon size={16} className="text-slate-700" />
                  </div>
                  <p className="mt-3 text-xl font-extrabold tracking-tight text-slate-900">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                  <p className="mt-1 text-[11px] font-medium text-emerald-600">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              {/* Personal Info */}
              <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] lg:col-span-3">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 blur-xl opacity-60" />
                <div className="relative flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-slate-900"><Sparkles size={16} className="text-indigo-600" /> Personal Information</h3>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800">Edit</button>
                  ) : (
                    <button onClick={() => setEditing(false)} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
                  )}
                </div>

                {!editing ? (
                  <div className="relative mt-5 space-y-3">
                    {[
                      { icon: UserRound, label: "Full Name", value: user.name, accent: "bg-slate-900 text-white" },
                      { icon: Mail, label: "Email", value: user.email || "—", accent: "bg-indigo-600 text-white" },
                      { icon: Phone, label: "Phone", value: user.phone || "—", accent: "bg-violet-600 text-white" },
                    ].map((row) => (
                      <div key={row.label} className="group/row flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 backdrop-blur transition hover:bg-white hover:border-slate-200 hover:shadow-sm">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${row.accent} shadow-sm transition group-hover/row:scale-105`}><row.icon size={14} /></span>
                        <div className="min-w-0 flex-1"><p className="text-xs font-medium text-slate-500">{row.label}</p><p className="truncate text-sm font-bold text-slate-900">{row.value}</p></div>
                        <ArrowUpRight size={14} className="text-slate-300 group-hover/row:text-slate-500 transition" />
                      </div>
                    ))}
                    <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Crown size={14} /></span>
                      <div><p className="text-xs font-semibold text-indigo-700">Role</p><p className="text-sm font-extrabold text-indigo-900">{user.role}</p></div>
                      <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-xs font-bold text-indigo-700 shadow-sm border border-indigo-100">Verified</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative mt-5 space-y-3">
                    <div><label className="text-xs font-bold text-slate-700">Full Name *</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" placeholder="Your name" /></div>
                    <div><label className="text-xs font-bold text-slate-700">Email</label><input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" placeholder="you@example.com" /></div>
                    <div><label className="text-xs font-bold text-slate-700">Phone</label><input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" placeholder="10 digits" /></div>
                    <button onClick={handleSave} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-black"><Save size={16} /> Save Changes</button>
                  </div>
                )}
              </div>

              <div className="space-y-4 lg:col-span-2">
                {/* Your Dashboard */}
                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-[1px] shadow-[0_12px_32px_rgba(15,23,42,0.2)]">
                  <div className="rounded-[23px] bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-indigo-500/20 blur-xl" />
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10"><LayoutDashboard size={18} /></div>
                      <h3 className="mt-3 text-lg font-extrabold tracking-tight">Your Dashboard</h3>
                      <p className="mt-1 text-sm leading-5 text-indigo-100/80">Your analytics and overview — all in one place.</p>
                      <div className="mt-5 flex flex-col gap-2.5">
                        <button onClick={() => setTab("dashboard")} className="group flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-extrabold text-slate-900 shadow-lg transition hover:bg-slate-50">
                          Open Dashboard here <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                        <button onClick={() => navigate("/dashboard")} className="rounded-full border border-white/20 bg-white/10 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">
                          Open full Dashboard page →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900">Account Actions</h3>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <button onClick={() => { logout(); navigate("/"); }} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50 hover:border-red-300"><LogOut size={16} /> Logout</button>
                    <button onClick={() => { localStorage.clear(); logout(); navigate("/"); }} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-bold text-slate-700 transition hover:bg-white hover:shadow-sm"><Trash2 size={16} /> Clear data & Reset</button>
                  </div>
                  <p className="mt-3 text-xs leading-4 text-slate-400">Clear data se saare events/bookings sample pe reset ho jayenge.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 2. Wishlist Tab */}
        {tab === "wishlist" && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
                  <Heart size={20} className="fill-rose-500 text-rose-500" />
                  <span>Wishlisted Events ({wishlistedEvents.length})</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Saved events you plan to attend or book passes for
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/wishlist")}
                  className="hidden sm:inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Full Wishlist Page →
                </button>
                <button
                  onClick={() => navigate("/events")}
                  className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-black transition"
                >
                  Explore Events
                </button>
              </div>
            </div>

            {wishlistedEvents.length === 0 ? (
              <div className="mt-6 rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                  <Heart size={24} />
                </div>
                <h3 className="mt-3 text-base font-extrabold text-slate-900">No wishlisted events</h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our upcoming concerts, standup comedy, and conferences and click the heart icon to save them here!
                </p>
                <button
                  onClick={() => navigate("/events")}
                  className="mt-5 rounded-full bg-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-600 transition"
                >
                  Browse Live Events
                </button>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-2.5 py-0.5 text-[10px] font-bold text-white">
                        {event.category || "Live Event"}
                      </span>
                      <button
                        onClick={() => removeFromWishlist(event.id)}
                        title="Remove from Wishlist"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm transition hover:scale-110"
                      >
                        <Heart size={15} className="fill-rose-500 text-rose-500" />
                      </button>

                      <div className="absolute bottom-2.5 left-3 flex items-center gap-2 text-[11px] text-white font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-primary" />
                          <span>{event.formattedDate || event.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-primary" />
                          <span>{event.city || event.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition line-clamp-1">
                          {event.title}
                        </h4>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-slate-700 shrink-0">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          {event.rating || 4.8}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400">Pass</span>
                          <p className="text-sm font-extrabold text-slate-900">
                            ₹{event.price?.toLocaleString("en-IN") || "999"}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(event.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedEventForBooking(event)}
                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition"
                          >
                            <Ticket size={12} />
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Bookings Tab */}
        {tab === "bookings" && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">My Bookings</h2>
              <button onClick={() => navigate("/events")} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-black transition">Browse Events</button>
            </div>
            {bookings.length === 0 ? (
              <div className="mt-6 rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100"><Ticket size={22} className="text-slate-500" /></div>
                <p className="mt-3 text-sm font-semibold text-slate-700">No bookings yet</p>
                <p className="text-xs text-slate-400">Book an event to see it here</p>
                <button onClick={() => navigate("/events")} className="mt-4 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700">Explore Events</button>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {bookings.slice(0, 8).map((b) => (
                  <div key={b.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition group-hover:opacity-100" />
                    <div className="flex gap-3">
                      <img src={b.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} alt={b.event} className="h-14 w-14 rounded-xl object-cover shadow-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-slate-900">{b.event}</p>
                        <p className="text-xs text-slate-500">{b.date} • {b.tickets} ticket(s) • {b.amount}</p>
                        <p className="text-xs text-slate-400">{b.id}</p>
                      </div>
                      <span className={`h-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm ${b.status==="Confirmed" ? "bg-emerald-500 text-white" : b.status==="Cancelled" ? "bg-red-500 text-white" : "bg-amber-400 text-white"}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {bookings.length > 0 && (
              <button onClick={() => navigate("/my-bookings")} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700">View all bookings <ArrowUpRight size={14} /></button>
            )}
          </div>
        )}

        {/* 4. Dashboard Tab */}
        {tab === "dashboard" && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white"><LayoutDashboard size={14} /></span> Dashboard — inside Profile</h2>
              <button onClick={() => navigate("/dashboard")} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">Open full page →</button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={CalendarDays} title="Total Events" value={String(stats.totalEvents)} growth="↑ 2" growthText="this month" />
              <StatCard icon={Ticket} title="Total Bookings" value={String(stats.totalBookings)} growth="↑ 18%" growthText="from last month" />
              <StatCard icon={Users} title="Total Attendees" value={String(stats.totalAttendees).replace(/\B(?=(\d{3})+(?!\d))/g, "," )} growth="↑ 25%" growthText="from last month" />
              <StatCard icon={IndianRupee} title="Total Revenue" value={`₹${String(stats.totalRevenue).replace(/\B(?=(\d{3})+(?!\d))/g, "," )}`} growth="↑ 28%" growthText="from last month" />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2"><BookingsOverview /></div>
              <div><UpcomingEvents /></div>
            </div>
            <div className="mt-6"><LatestBookings /></div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      {selectedEventForBooking && (
        <BookingModal
          event={selectedEventForBooking}
          isOpen={!!selectedEventForBooking}
          onClose={() => setSelectedEventForBooking(null)}
        />
      )}
    </div>
  );
};

export default Profile;
