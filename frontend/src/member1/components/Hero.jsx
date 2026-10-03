import { useState } from "react";
import {
  CalendarDays,
  Heart,
  MapPin,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import BookingModal from "./BookingModal";

const featuredEvent = {
  id: 1,
  title: "EDM Night 2026",
  category: "Music",
  date: "25 October 2026",
  formattedDate: "25 Oct 2026",
  time: "8:00 PM – 11:00 PM",
  venue: "City Arena, Delhi",
  location: "City Arena, Delhi",
  rating: "4.8",
  reviewCount: "2.4K reviews",
  attendees: "12K+ going",
  price: 999,
  image:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  thumbnails: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",
  ],
};

function Hero() {
  const [activeImage, setActiveImage] = useState(featuredEvent.image);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="bg-background px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-2xl bg-surface p-5 shadow-xs border border-slate-200 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
          {/* Left Column: Event details */}
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {featuredEvent.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-text sm:text-4xl">
              {featuredEvent.title}
            </h1>

            <div className="mt-6 space-y-3 text-sm text-text-secondary">
              <p className="flex items-center gap-2">
                <CalendarDays
                  size={17}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>
                  {featuredEvent.date} · {featuredEvent.time}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <MapPin
                  size={17}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{featuredEvent.venue}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <div className="flex items-center gap-1.5">
                <Star
                  size={17}
                  className="fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                <span className="font-semibold text-text">
                  {featuredEvent.rating}
                </span>
                <span className="text-text-secondary">
                  ({featuredEvent.reviewCount})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-text-secondary">
                <Users
                  size={17}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>{featuredEvent.attendees}</span>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-6 text-text-secondary">
              Get ready for the biggest EDM night of the year! Featuring top DJs,
              immersive visual laser mapping, and an unforgettable crowd atmosphere.
            </p>

            <div className="mt-7 border-t border-border pt-5">
              <p className="text-xs font-medium text-text-secondary">
                Starting from
              </p>

              <p className="mt-1 text-3xl font-bold text-text">
                ₹{featuredEvent.price}
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                Taxes &amp; fees included upfront
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md"
              >
                <Ticket size={17} aria-hidden="true" />
                <span>Book Tickets Now</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                aria-label="Add to Wishlist"
              >
                <Heart
                  size={17}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : "text-slate-500"
                  }
                  aria-hidden="true"
                />
                <span className="sm:hidden">
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Gallery */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-xs border border-slate-200">
              <img
                src={activeImage}
                alt={`${featuredEvent.title} live concert`}
                className="aspect-16/10 w-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnails row */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {featuredEvent.thumbnails.map((thumbnail, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(thumbnail)}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === thumbnail
                      ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${index + 1}`}
                >
                  <img
                    src={thumbnail}
                    alt=""
                    className="aspect-4/3 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        event={featuredEvent}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}

export default Hero;
