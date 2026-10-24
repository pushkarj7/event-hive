import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import { MapPin, Star, CalendarDays, ArrowLeft, Clock, Users, Tag } from "lucide-react";
import { getEventById } from "../../api/apiClient";
import BookingModal from "../components/BookingModal";

function EventDetails() {
  const { id } = useParams();
  const { events } = useAppStore();
  const navigate = useNavigate();

  const storeEvent = events.find((e) => String(e.id) === String(id));
  const [apiEvent, setApiEvent] = useState(null);
  const [loading, setLoading] = useState(!storeEvent);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const event = storeEvent || apiEvent;

  useEffect(() => {
    if (storeEvent) {
      return;
    }

    let isMounted = true;
    async function loadEvent() {
      try {
        setLoading(true);
        setError("");
        const res = await getEventById(id);
        if (isMounted) {
          if (res?.success && res.data) {
            const raw = res.data;
            const eventDate = new Date(raw.date);
            const hasValidDate = !Number.isNaN(eventDate.getTime());
            const hasValidImage =
              typeof raw.image === "string" &&
              (raw.image.startsWith("http") || raw.image.startsWith("/")) &&
              !raw.image.includes("PASTE_YOUR_IMAGEKIT");

            setApiEvent({
              ...raw,
              id: String(raw._id || raw.id),
              city: raw.city || (raw.location ? raw.location.split(",").pop().trim() : "India"),
              price: Number(raw.price) || 0,
              image: hasValidImage
                ? raw.image
                : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
              formattedDate: hasValidDate
                ? eventDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Date TBA",
              time: hasValidDate
                ? eventDate.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
            });
          } else {
            setError("Event not found");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load event details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvent();
    return () => {
      isMounted = false;
    };
  }, [id, storeEvent]);


  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-slate-500 font-medium">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <CalendarDays size={28} />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">Event Not Found</h2>
        <p className="mt-1 text-sm text-slate-500">{error || "The event you are looking for does not exist or has been removed."}</p>
        <button
          onClick={() => navigate("/events")}
          className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-surface px-4 py-2 text-sm font-medium text-text shadow-xs hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* Left Column: Image */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-surface shadow-sm">
            <img
              src={event.image}
              alt={event.title}
              className="h-80 w-full object-cover sm:h-96 lg:h-120"
            />
          </div>

          {/* Right Column: Information */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Tag size={12} /> {event.category}
                </span>
                {event.status && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 capitalize">
                    {event.status}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {event.title}
              </h1>

              {event.artist && (
                <p className="mt-2 text-sm font-medium text-text-secondary">
                  Featuring: <span className="text-text font-semibold">{event.artist}</span>
                </p>
              )}

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 bg-surface p-4 shadow-xs">
                <div className="flex items-center gap-3 text-sm text-text">
                  <CalendarDays size={18} className="text-primary shrink-0" />
                  <span>{event.formattedDate || event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-3 text-sm text-text">
                    <Clock size={18} className="text-primary shrink-0" />
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-text">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <span>{event.location}</span>
                </div>
                {event.availableSeats !== undefined && (
                  <div className="flex items-center gap-3 text-sm text-text">
                    <Users size={18} className="text-primary shrink-0" />
                    <span>{event.availableSeats} tickets available</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-text">
                  <Star size={18} className="fill-amber-400 text-amber-400 shrink-0" />
                  <span>{event.rating || "4.8"} / 5 rating</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-xs text-text-secondary">Ticket Price</span>
                <p className="text-3xl font-extrabold text-primary">
                  ₹{Number(event.price).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-text uppercase tracking-wider">About This Event</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {event.description ||
                    "Experience an unforgettable evening filled with amazing performances, great people, and memorable moments. Reserve your spot before tickets sell out."}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg active:scale-[0.99]"
              >
                Book Now — ₹{Number(event.price).toLocaleString("en-IN")}
              </button>
              <button
                onClick={() => navigate("/events")}
                className="rounded-xl border border-slate-200 bg-surface px-6 py-3.5 text-sm font-semibold text-text shadow-xs hover:bg-slate-50 transition"
              >
                Explore More Events
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        event={event}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default EventDetails;
