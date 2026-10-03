import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Heart, ArrowRight, CheckCircle2, Ticket, Calendar } from "lucide-react";
import { DETAILED_ARTISTS } from "../data/artistsData";

const CATEGORY_TABS = ["All", "Music", "Comedy", "Theatre"];

export default function TrendingArtists() {
  const [activeTab, setActiveTab] = useState("All");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredArtists =
    activeTab === "All"
      ? DETAILED_ARTISTS
      : DETAILED_ARTISTS.filter((artist) => artist.category === activeTab);

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              What's happening around you
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text sm:text-3xl">
              Trending Artists
            </h2>
          </div>

          {/* Filter Tabs & View All */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-200/60 p-1">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <Link
              to="/artists"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark sm:text-sm"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArtists.map((artist) => {
            const isFav = !!favorites[artist.id];

            return (
              <div
                key={artist.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    // Anchored to the top so performer faces stay visible instead of
                    // being centre-cropped out of tall portrait images.
                    className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {artist.category}
                    </span>
                    {artist.badge && (
                      <span className="rounded-full bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm">
                        {artist.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(artist.id)}
                    aria-label="Save to Wishlist"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white"
                  >
                    <Heart
                      size={16}
                      className={
                        isFav
                          ? "fill-red-500 text-red-500"
                          : "text-slate-700 hover:text-red-500"
                      }
                    />
                  </button>

                  {/* Date badge on image bottom-left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <Calendar size={13} className="text-primary" />
                    <span>{artist.date}</span>
                  </div>

                  {/* Followers tag bottom-right */}
                  <span className="absolute bottom-3 right-3 text-[11px] font-medium text-slate-200">
                    {artist.followers}
                  </span>
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Artist Name & Verification */}
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                      {artist.name}
                    </h3>
                    <CheckCircle2
                      size={15}
                      className="fill-primary text-white shrink-0"
                    />
                  </div>

                  {/* Tour/Show Title */}
                  <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-700">
                    {artist.showTitle}
                  </p>

                  {/* Location & Rating */}
                  <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                    <span className="flex items-center gap-1 line-clamp-1">
                      <MapPin size={13} className="shrink-0 text-primary" />
                      {artist.location}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 font-semibold text-text">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {artist.rating}
                    </span>
                  </div>

                  {/* Price & Book Button */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <div>
                      <span className="text-[11px] text-text-secondary">
                        Starts from
                      </span>
                      <p className="text-base font-bold text-text">
                        ₹{artist.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Link
                      to={`/booking/${artist.eventId || artist.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
                    >
                      <Ticket size={13} />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
