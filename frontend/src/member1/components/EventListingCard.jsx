import { Heart, MapPin, Calendar, Clock } from "lucide-react";

export default function EventListingCard({
  event,
  isFavorite = false,
  onToggleFavorite,
  onBookNow,
  viewMode = "list",
}) {
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Music":
        return "bg-indigo-500 text-white";
      case "Tech":
        return "bg-blue-500 text-white";
      case "Food":
        return "bg-rose-500 text-white";
      case "Sports":
        return "bg-emerald-500 text-white";
      case "Arts":
        return "bg-purple-500 text-white";
      default:
        return "bg-primary text-white";
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-xs ${getCategoryBadgeClass(
                event.category
              )}`}
            >
              {event.category}
            </span>
            {event.badge && (
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-xs">
                {event.badge}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite && onToggleFavorite(event.id)}
            aria-label="Wishlist"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text shadow-sm backdrop-blur transition-transform hover:scale-110"
          >
            <Heart
              size={16}
              className={
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-600 hover:text-red-500"
              }
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-base font-bold text-text group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="mt-2 space-y-1 text-xs text-text-secondary">
            <p className="flex items-center gap-1.5 line-clamp-1">
              <MapPin size={13} className="shrink-0 text-primary" />
              <span>{event.location}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar size={13} className="shrink-0 text-primary" />
              <span>{event.formattedDate} • {event.time}</span>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <span className="text-[10px] text-text-secondary">Starts from</span>
              <p className="text-base font-bold text-text">
                ₹{event.price.toLocaleString("en-IN")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBookNow && onBookNow(event)}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Default: Horizontal List Card matching the Reference UI */
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-surface p-3.5 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:gap-5 sm:p-4">
      {/* Event Image */}
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:aspect-4/3 sm:h-36 sm:w-48 md:w-56">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent sm:hidden" />

        {/* Category Badge on top-left of image */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-xs ${getCategoryBadgeClass(
              event.category
            )}`}
          >
            {event.category}
          </span>
          {event.badge && (
            <span className="hidden rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-xs sm:inline-block">
              {event.badge}
            </span>
          )}
        </div>
      </div>

      {/* Event Content Details */}
      <div className="mt-3 flex flex-1 flex-col justify-between sm:mt-0 sm:py-1">
        <div>
          {/* Title Row with Heart button */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary sm:text-lg">
              {event.title}
            </h3>
            <button
              type="button"
              onClick={() => onToggleFavorite && onToggleFavorite(event.id)}
              aria-label="Save to Wishlist"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500"
            >
              <Heart
                size={18}
                className={
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-slate-400 hover:text-red-500"
                }
              />
            </button>
          </div>

          {/* Location & Date */}
          <div className="mt-2 space-y-1.5 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="shrink-0 text-primary" />
              <span>
                {event.formattedDate} • {event.time}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Book Button Row */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 sm:mt-3">
          <div>
            <span className="text-[11px] text-text-secondary">Starts from</span>
            <p className="text-lg font-bold text-text">
              ₹{event.price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBookNow && onBookNow(event)}
            className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-primary-dark hover:shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
