import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import { ALL_EVENTS } from "../../member1/data/eventsData";
import BookingModal from "../../member1/components/BookingModal";
import ThemeToggle from "../../member1/components/ThemeToggle";
import {
  Heart,
  Calendar,
  MapPin,
  Star,
  Ticket,
  Trash2,
  ArrowLeft,
  Filter,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, events } = useAppStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  // Combine ALL_EVENTS with any organizer custom events
  const allAvailableEvents = useMemo(() => {
    const list = [...ALL_EVENTS];
    if (Array.isArray(events)) {
      events.forEach((ce, idx) => {
        if (!list.some((e) => String(e.id) === String(ce.id))) {
          list.push({
            id: ce.id || `custom-${idx}-${ce.title || 'event'}`,
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

  // Wishlisted events list
  const wishlistedEvents = useMemo(() => {
    return allAvailableEvents.filter((ev) =>
      wishlist.some((id) => String(id) === String(ev.id))
    );
  }, [allAvailableEvents, wishlist]);

  // Filtered by category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === "all") return wishlistedEvents;
    return wishlistedEvents.filter(
      (e) => (e.category || "").toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [wishlistedEvents, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(wishlistedEvents.map((e) => e.category).filter(Boolean));
    return ["all", ...Array.from(cats)];
  }, [wishlistedEvents]);

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shadow-xs">
                <Heart size={16} className="fill-rose-500 text-rose-500" />
              </span>
              <h1 className="text-lg font-extrabold text-slate-900">Wishlisted Events</h1>
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                {wishlistedEvents.length} Saved
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/profile"
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              My Profile
            </Link>
            <Link
              to="/events"
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-black transition"
            >
              Explore More Events
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-[24px] bg-linear-to-r from-rose-900 via-indigo-950 to-slate-900 p-8 text-white shadow-lg">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-rose-300 backdrop-blur-md">
              <Sparkles size={13} />
              <span>Your Saved Favorites</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              All Wishlisted Events in One Place
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Keep track of events you love, plan your weekend with friends, and book passes whenever you're ready with one click.
            </p>
          </div>
        </div>

        {/* Category Pills if there are wishlisted events */}
        {wishlistedEvents.length > 0 && categories.length > 2 && (
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter size={13} /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold capitalize transition ${
                  selectedCategory === cat
                    ? "bg-rose-500 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Wishlist Content */}
        {wishlistedEvents.length === 0 ? (
          <div className="mt-8 rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-xs">
              <Heart size={28} />
            </div>
            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Your wishlist is empty
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto">
              Explore our live concerts, tech conclaves, comedy specials, and stadium events. Click the heart icon on any card to save it here!
            </p>
            <div className="mt-6">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition"
              >
                <ShoppingBag size={14} />
                <span>Discover Events</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                {/* Image & Category */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {event.category || "Live Event"}
                  </span>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(event.id)}
                    title="Remove from Wishlist"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-md backdrop-blur transition-transform hover:scale-110"
                  >
                    <Heart size={16} className="fill-rose-500 text-rose-500" />
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

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition line-clamp-1">
                      {event.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-800 shrink-0">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {event.rating || 4.8}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {event.description || "Exciting live event on Event Hive."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium">Starting at</span>
                      <p className="text-base font-extrabold text-slate-900">
                        ₹{event.price?.toLocaleString("en-IN") || "999"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(event.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedEventForBooking(event)}
                        className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition"
                      >
                        <Ticket size={13} />
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
}
