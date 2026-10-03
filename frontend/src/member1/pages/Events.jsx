import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Grid,
  List,
  Filter,
  X,
  Sparkles,
} from "lucide-react";
import { ALL_EVENTS, CATEGORIES, CITIES } from "../data/eventsData";
import EventListingCard from "../components/EventListingCard";
import EventFilter from "../components/EventFilter";
import BookingModal from "../components/BookingModal";
import { useAppStore } from "../../store/EventContext";

export default function Events() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "all");
  const [prevParams, setPrevParams] = useState({
    q: searchParams.get("q"),
    category: searchParams.get("category"),
  });

  if (
    prevParams.q !== searchParams.get("q") ||
    prevParams.category !== searchParams.get("category")
  ) {
    setPrevParams({
      q: searchParams.get("q"),
      category: searchParams.get("category"),
    });
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState("all");
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { wishlist, toggleWishlist } = useAppStore();
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCity("All Locations");
    setSelectedDate("all");
    setPriceRange(5000);
    setSortBy("popular");
  };

  const filteredEvents = useMemo(() => {
    return ALL_EVENTS.filter((event) => {
      // 1. Search Query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesLocation = event.location.toLowerCase().includes(query);
        const matchesCategory = event.category.toLowerCase().includes(query);
        const matchesArtist = (event.artist || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCategory && !matchesArtist) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "all") {
        if (event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. City filter
      if (selectedCity !== "All Locations") {
        if (event.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // 4. Price range filter
      if (event.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return String(b.id).localeCompare(String(a.id), undefined, { numeric: true });
    });
  }, [searchQuery, selectedCategory, selectedCity, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-16">
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-accent/20 to-transparent opacity-80" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent pointer-events-none"
        />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles size={13} />
              <span>Discover What's Happening</span>
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              All Events
            </h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Explore a wide range of concerts, sports, conferences, and festivals happening near you.
            </p>
          </div>

          {/* Quick Search & Filter Bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md shadow-2xl"
          >
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              {/* Search Input */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <Search size={16} className="text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-text-secondary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-text-secondary hover:text-text"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-text"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id === "all" ? "all" : cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <MapPin size={16} className="text-primary shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-text"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter Dropdown */}
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-text shadow-xs">
                <Calendar size={16} className="text-primary shrink-0" />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-text"
                >
                  <option value="all">Any Date</option>
                  <option value="today">Today</option>
                  <option value="weekend">This Weekend</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Main Listing Section with Left Sidebar & Right Content */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-4 py-2 text-xs font-semibold text-text shadow-xs"
          >
            <Filter size={15} className="text-primary" />
            <span>Filters ({selectedCategory !== "all" ? "1 active" : "None"})</span>
          </button>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-surface px-3 py-2 text-xs font-medium text-text outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Column: Filter Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <EventFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onResetFilters={handleResetFilters}
                totalResults={filteredEvents.length}
              />
            </div>
          </div>

          {/* Right Column: Listing Header & Event Cards */}
          <div>
            {/* Top Bar for Results, Active Tags & View Switcher */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text">
                  Showing {filteredEvents.length} events
                </span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCity !== "All Locations" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-text">
                    {selectedCity}
                    <button
                      type="button"
                      onClick={() => setSelectedCity("All Locations")}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              {/* View Switcher and Sorting Controls */}
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 lg:flex">
                  <span className="text-xs text-text-secondary">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer rounded-lg border border-slate-200 bg-surface px-2.5 py-1.5 text-xs font-medium text-text outline-none transition-colors hover:border-slate-300"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center rounded-lg border border-slate-200 bg-surface p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`rounded p-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:text-text"
                    }`}
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`rounded p-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:text-text"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Event List / Grid */}
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search size={24} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-text">
                  No events found
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  We couldn't find any events matching your selected criteria. Try adjusting your filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredEvents.map((event) => (
                  <EventListingCard
                    key={event.id}
                    event={event}
                    viewMode="grid"
                    isFavorite={wishlist.some((id) => String(id) === String(event.id))}
                    onToggleFavorite={() => toggleWishlist(event.id)}
                    onBookNow={(evt) => setSelectedEventForBooking(evt)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventListingCard
                    key={event.id}
                    event={event}
                    viewMode="list"
                    isFavorite={wishlist.some((id) => String(id) === String(event.id))}
                    onToggleFavorite={() => toggleWishlist(event.id)}
                    onBookNow={(evt) => setSelectedEventForBooking(evt)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Mobile Filter Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/50 backdrop-blur-xs lg:hidden">
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-surface p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-text">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-4">
              <EventFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setMobileFilterOpen(false);
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onResetFilters={handleResetFilters}
                totalResults={filteredEvents.length}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Booking Modal */}
      <BookingModal
        event={selectedEventForBooking}
        isOpen={!!selectedEventForBooking}
        onClose={() => setSelectedEventForBooking(null)}
      />
    </div>
  );
}
