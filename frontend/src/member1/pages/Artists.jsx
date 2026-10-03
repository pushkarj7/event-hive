import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Star,
  Heart,
  CheckCircle2,
  Ticket,
  Calendar,
  Sparkles,
  X,
  Music2,
  Flame,
  Users,
} from "lucide-react";
import { DETAILED_ARTISTS } from "../data/artistsData";
import BookingModal from "../components/BookingModal";

export default function Artists() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [favorites, setFavorites] = useState({});
  const [selectedArtistForTour, setSelectedArtistForTour] = useState(null);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  const categories = ["All", "Music", "Comedy", "Theatre"];
  const cities = ["All Cities", "Mumbai", "Delhi", "Bengaluru", "Goa", "Kolkata", "Jaipur", "Pune"];

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredArtists = useMemo(() => {
    return DETAILED_ARTISTS.filter((artist) => {
      // Category filter
      if (activeTab !== "All" && artist.category !== activeTab) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesGenre = artist.genre.toLowerCase().includes(q);
        const matchesShow = artist.showTitle.toLowerCase().includes(q);
        if (!matchesName && !matchesGenre && !matchesShow) return false;
      }
      // City filter
      if (selectedCity !== "All Cities") {
        const hasCity =
          artist.location.toLowerCase().includes(selectedCity.toLowerCase()) ||
          (artist.tourStops &&
            artist.tourStops.some((s) =>
              s.city.toLowerCase().includes(selectedCity.toLowerCase())
            ));
        if (!hasCity) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedCity]);

  // Spotlight headliner (first artist)
  const spotlightArtist = DETAILED_ARTISTS[0];

  const handleBookTourStop = (artist, stop) => {
    setSelectedArtistForTour(null);
    setSelectedEventForBooking({
      id: artist.id,
      title: `${artist.name} - ${artist.showTitle}`,
      category: artist.category,
      formattedDate: stop.date,
      date: stop.date,
      time: "7:00 PM – 10:30 PM",
      venue: stop.venue,
      city: stop.city,
      location: `${stop.venue}, ${stop.city}`,
      price: stop.price || artist.price,
      rating: artist.rating,
      reviews: artist.reviews,
      image: artist.image,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 1. Sleek Hero Header matching Event Hive Theme */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-80" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles size={13} />
              <span>Spotlight Performers & Creators</span>
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Artists & Performers
            </h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Discover top musicians, standup comedians, electronic DJs, and theatrical masters touring across cities.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md shadow-2xl"
          >
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
              {/* Search input */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <Search size={16} className="text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search artist name, genre, or tour..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-text-secondary"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-text-secondary hover:text-text">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* City selector */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <MapPin size={16} className="text-primary shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-text"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <Music2 size={16} className="text-primary shrink-0" />
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-text"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? "All Categories" : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear filters CTA */}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("All");
                  setSelectedCity("All Cities");
                }}
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Spotlight Headliner Banner */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-surface shadow-md">
          <div className="grid lg:grid-cols-12">
            {/* Visual cover */}
            <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-6 overflow-hidden">
              <img
                src={spotlightArtist.image}
                alt={spotlightArtist.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm">
                  <Flame size={13} className="fill-slate-900 text-slate-900" />
                  <span>Headliner Tour of the Year</span>
                </span>
              </div>
            </div>

            {/* Spotlight Details */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {spotlightArtist.genre}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {spotlightArtist.monthlyListeners}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <h2 className="text-2xl font-black text-text sm:text-3xl">
                    {spotlightArtist.name}
                  </h2>
                  <CheckCircle2 size={22} className="fill-primary text-white" />
                </div>

                <p className="mt-1 text-base font-semibold text-primary">
                  {spotlightArtist.showTitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {spotlightArtist.bio}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="text-[11px] text-text-secondary">Next Stop</span>
                    <p className="font-bold text-text text-sm">{spotlightArtist.location}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="text-[11px] text-text-secondary">Date</span>
                    <p className="font-bold text-text text-sm">{spotlightArtist.date}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="text-[11px] text-text-secondary">Tickets From</span>
                    <p className="font-bold text-primary text-sm">₹{spotlightArtist.price}</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedEventForBooking({
                      id: spotlightArtist.id,
                      title: `${spotlightArtist.name} - ${spotlightArtist.showTitle}`,
                      category: spotlightArtist.category,
                      formattedDate: spotlightArtist.date,
                      date: spotlightArtist.date,
                      time: "7:00 PM – 10:30 PM",
                      venue: spotlightArtist.location,
                      city: "Mumbai",
                      location: spotlightArtist.location,
                      price: spotlightArtist.price,
                      rating: spotlightArtist.rating,
                      reviews: spotlightArtist.reviews,
                      image: spotlightArtist.image,
                    })
                  }
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
                >
                  <Ticket size={16} />
                  <span>Book Headliner Pass</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedArtistForTour(spotlightArtist)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-5 py-2.5 text-sm font-semibold text-text shadow-xs transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  <Calendar size={15} />
                  <span>View All Tour Stops</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
          <div>
            <h2 className="text-xl font-bold text-text sm:text-2xl">
              All Performing Artists
            </h2>
            <p className="text-xs text-text-secondary">
              Showing {filteredArtists.length} verified artists touring across India
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-xs"
                    : "border border-slate-200 bg-surface text-text-secondary hover:text-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Artists Grid */}
        {filteredArtists.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
            <Users size={32} className="mx-auto text-slate-400" />
            <h3 className="mt-3 text-base font-bold text-text">No artists found</h3>
            <p className="text-xs text-text-secondary mt-1">
              Try adjusting your search query or selecting a different city.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
                setSelectedCity("All Cities");
              }}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtists.map((artist) => {
              const isFav = !!favorites[artist.id];

              return (
                <div
                  key={artist.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg"
                >
                  {/* Photo & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top tags */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5">
                      <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                        {artist.category}
                      </span>
                      {artist.badge && (
                        <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-xs">
                          {artist.badge}
                        </span>
                      )}
                    </div>

                    {/* Heart button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(artist.id)}
                      aria-label="Wishlist"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text shadow-sm backdrop-blur transition-transform hover:scale-110"
                    >
                      <Heart
                        size={15}
                        className={
                          isFav
                            ? "fill-red-500 text-red-500"
                            : "text-slate-600 hover:text-red-500"
                        }
                      />
                    </button>

                    {/* Bottom tag on image */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-white">
                      <Calendar size={12} className="text-primary" />
                      <span className="font-medium text-[11px]">{artist.date}</span>
                    </div>
                    <span className="absolute bottom-2.5 right-3 text-[10px] font-medium text-slate-200">
                      {artist.followers}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                        {artist.name}
                      </h3>
                      <CheckCircle2 size={15} className="fill-primary text-white shrink-0" />
                    </div>

                    <p className="mt-1 line-clamp-1 text-xs font-medium text-primary">
                      {artist.showTitle}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-xs text-text-secondary">
                      <span className="flex items-center gap-1 line-clamp-1">
                        <MapPin size={12} className="shrink-0 text-primary" />
                        {artist.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-text">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {artist.rating}
                      </span>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-[10px] text-text-secondary">From</span>
                        <p className="text-sm font-bold text-text">
                          ₹{artist.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedArtistForTour(artist)}
                          className="rounded-lg border border-slate-200 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-text hover:border-primary hover:text-primary transition-colors"
                        >
                          Tour Dates
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedEventForBooking({
                              id: artist.id,
                              title: `${artist.name} Live`,
                              category: artist.category,
                              formattedDate: artist.date,
                              date: artist.date,
                              time: "7:00 PM – 10:30 PM",
                              venue: artist.location,
                              city: "Selected City",
                              location: artist.location,
                              price: artist.price,
                              rating: artist.rating,
                              reviews: artist.reviews,
                              image: artist.image,
                            })
                          }
                          className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Join As An Artist Section */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 p-8 sm:p-12 text-center">
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            For Creators & Performers
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">
            Are You a Performing Artist, DJ, or Band?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-secondary">
            Get verified on Event Hive. Publish your tour dates, sell verified passes without scalping, and connect with over 2 Million passionate fans.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/for-organisers"
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
            >
              Get Verified & List Shows
            </a>
          </div>
        </div>
      </section>

      {/* 6. Artist Tour Stops Modal */}
      {selectedArtistForTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArtistForTour.image}
                  alt={selectedArtistForTour.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h3 className="text-base font-bold text-text">
                    {selectedArtistForTour.name} - Tour Schedule
                  </h3>
                  <p className="text-xs text-primary font-medium">
                    {selectedArtistForTour.showTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedArtistForTour(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tour Stops List */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3">
              {selectedArtistForTour.tourStops && selectedArtistForTour.tourStops.length > 0 ? (
                selectedArtistForTour.tourStops.map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-primary/40 hover:bg-white"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text">{stop.city}</span>
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {stop.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">{stop.venue}</p>
                      <p className="text-xs font-medium text-text mt-1">📅 {stop.date}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <span className="text-sm font-bold text-text">
                        ₹{stop.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBookTourStop(selectedArtistForTour, stop)}
                        className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
                      >
                        Book This Stop
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-secondary text-center py-6">
                  No additional tour dates announced at this moment.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Booking Modal */}
      <BookingModal
        event={selectedEventForBooking}
        isOpen={!!selectedEventForBooking}
        onClose={() => setSelectedEventForBooking(null)}
      />
    </div>
  );
}
