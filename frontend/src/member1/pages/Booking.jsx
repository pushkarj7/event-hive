import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Lock,
  Printer,
} from "lucide-react";
import { ALL_EVENTS } from "../data/eventsData";
import { DETAILED_ARTISTS } from "../data/artistsData";
import { useAppStore } from "../../store/EventContext";
import TicketModal from "../components/TicketModal";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking, isAuthenticated, user } = useAppStore();

  // Find event by ID, or match artist event, or fallback to first event
  const event = (() => {
    // 1. Direct match by event id
    const foundById = ALL_EVENTS.find((e) => String(e.id) === String(id));
    if (foundById) return foundById;

    // 2. Check if id matches an artist name or tour
    const decodedId = decodeURIComponent(String(id || "")).toLowerCase();
    const foundByArtist = ALL_EVENTS.find(
      (e) => (e.artist && e.artist.toLowerCase().includes(decodedId)) ||
             (e.title && e.title.toLowerCase().includes(decodedId))
    );
    if (foundByArtist) return foundByArtist;

    // 3. Check DETAILED_ARTISTS
    const artist = DETAILED_ARTISTS.find(
      (a) => String(a.id) === String(id) || a.name.toLowerCase() === decodedId
    );
    if (artist) {
      if (artist.eventId) {
        const linkedEvent = ALL_EVENTS.find((e) => e.id === artist.eventId);
        if (linkedEvent) return linkedEvent;
      }
      const artistEvent = ALL_EVENTS.find((e) => e.artist?.toLowerCase().includes(artist.name.toLowerCase()));
      if (artistEvent) return artistEvent;

      return {
        id: artist.id,
        title: `${artist.name} - ${artist.showTitle}`,
        category: artist.category,
        formattedDate: artist.date,
        date: artist.date,
        time: "7:00 PM – 10:30 PM",
        venue: artist.location?.split(",")[0]?.trim() || "Main Arena",
        city: artist.location?.split(",")[1]?.trim() || "Mumbai",
        location: artist.location || "Main Arena, Mumbai",
        price: artist.price || 999,
        originalPrice: Math.round((artist.price || 999) * 1.4),
        rating: artist.rating || "4.8",
        reviews: artist.reviews || "1.2k",
        image: artist.image,
        artist: artist.name,
        badge: artist.badge,
      };
    }

    return ALL_EVENTS[0];
  })();

  const [quantities, setQuantities] = useState({
    general: 1,
    vip: 0,
    group: 0,
  });

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [bookedData, setBookedData] = useState(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16 font-sans">
        <div className="max-w-md w-full rounded-3xl border border-slate-200 bg-surface p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary ring-8 ring-indigo-50/50">
            <Lock size={32} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-text">Please Log In to Book</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            You must be logged in to book passes for <span className="font-semibold text-text">{event.title}</span>. This ensures your tickets are saved to your account.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition text-center"
            >
              Sign In to Continue
            </Link>
            <Link
              to="/register"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-text hover:bg-slate-50 transition text-center"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ticketPrices = {
    general: event?.price || 999,
    vip: Math.round((event?.price || 999) * 2),
    group: Math.round((event?.price || 999) * 3.5),
  };

  const handleQuantityChange = (type, delta) => {
    setQuantities((prev) => {
      const nextVal = Math.max(0, (prev[type] || 0) + delta);
      return { ...prev, [type]: nextVal };
    });
  };

  const totalAmount =
    quantities.general * ticketPrices.general +
    quantities.vip * ticketPrices.vip +
    quantities.group * ticketPrices.group;

  const totalTickets =
    quantities.general + quantities.vip + quantities.group * 4;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      alert("Please select at least 1 ticket to proceed.");
      return;
    }
    const generatedId = "EH-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    const newBookingObj = {
      id: generatedId,
      eventId: event.id,
      event: event.title,
      title: event.title,
      category: event.category,
      location: event.location || event.venue,
      venue: event.venue || event.location,
      date: event.formattedDate || event.date || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      amount: totalAmount,
      price: ticketPrices.general,
      tickets: totalTickets,
      user: formData.fullName || user?.name || "Attendee",
      fullName: formData.fullName || user?.name || "Attendee",
      email: formData.email || user?.email || "",
      phone: formData.phone || user?.phone || "",
      paymentMethod,
      image: event.image,
      status: "Confirmed",
    };
    setBookedData(newBookingObj);
    if (addBooking) {
      addBooking(newBookingObj);
    }
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Checkout & Confirmation
          </span>
        </div>

        {isSuccess ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface p-8 text-center shadow-lg sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <CheckCircle size={36} />
            </div>
            <h2 className="mt-4 text-2xl font-black text-text sm:text-3xl">
              Booking Confirmed! 🎉
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Thank you, <span className="font-semibold text-text">{formData.fullName}</span>! Your tickets are confirmed.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-text-secondary">Booking Reference:</span>
                <span className="font-mono font-bold text-primary">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Event:</span>
                <span className="font-semibold text-text">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Venue:</span>
                <span className="text-text">{event.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Passes:</span>
                <span className="font-semibold text-text">{totalTickets}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-sm font-bold text-text">Total Paid:</span>
                <span className="text-sm font-black text-emerald-600">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-black transition text-center"
              >
                <Printer size={14} /> Print / Save E-Ticket
              </button>
              <Link
                to="/my-bookings"
                className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary-dark transition text-center"
              >
                View in My Bookings →
              </Link>
              <Link
                to="/events"
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-text shadow-xs hover:bg-slate-50 transition text-center"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        ) : (
          /* Booking Page Layout matching the Reference UI */
          <form onSubmit={handleProceedToPay} className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Event Summary & Ticket Counter */}
            <div className="space-y-6 lg:col-span-7">
              {/* Event Summary */}
              <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
                <h3 className="text-xs font-bold tracking-wider text-text-secondary uppercase">
                  Event Summary
                </h3>
                <div className="mt-4 flex gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-20 w-24 rounded-xl object-cover shadow-xs sm:h-24 sm:w-28"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {event.category}
                        </span>
                        <span className="text-sm font-bold text-text">
                          ₹{ticketPrices.general}
                        </span>
                      </div>
                      <h2 className="mt-1 text-base font-bold text-text">
                        {event.title}
                      </h2>
                    </div>

                    <div className="space-y-1 text-xs text-text-secondary">
                      <p className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-primary" />
                        <span>{event.formattedDate} • {event.time}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-primary" />
                        <span>{event.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-text">{event.rating}</span>
                      <span className="text-text-secondary">({event.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Tickets */}
              <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
                <h3 className="text-sm font-bold text-text">Select Tickets</h3>
                <div className="mt-4 space-y-3">
                  {/* General */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:border-slate-300">
                    <div>
                      <p className="text-sm font-semibold text-text">General Admission</p>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.general.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("general", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {quantities.general}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("general", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* VIP */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:border-slate-300">
                    <div>
                      <p className="text-sm font-semibold text-text">VIP Pass</p>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.vip.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("vip", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {quantities.vip}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("vip", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Group */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:border-slate-300">
                    <div>
                      <p className="text-sm font-semibold text-text">Group Pass (4 People)</p>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.group.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("group", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {quantities.group}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("group", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                  <span className="text-sm font-medium text-text">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Your Details & Payment Method */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-text">Your Details</h3>
                <div>
                  <label className="block text-xs font-medium text-text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="e.g. John Doe"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-text">Payment Method</h3>
                {[
                  { id: "upi", label: "UPI (Google Pay, PhonePe, etc.)" },
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "netbanking", label: "Net Banking" },
                  { id: "wallet", label: "Wallet" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-xs font-medium transition-colors ${
                      paymentMethod === m.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-slate-200 hover:bg-slate-50 text-text"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-primary"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}

                <div className="flex items-center gap-2 pt-2 text-[11px] text-text-secondary">
                  <ShieldCheck size={15} className="text-primary" />
                  <span>Your payment is secure and encrypted</span>
                </div>

                <button
                  type="submit"
                  disabled={totalAmount <= 0}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark disabled:opacity-50"
                >
                  Proceed to Pay →
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {showTicketModal && bookedData && (
        <TicketModal
          booking={bookedData}
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
        />
      )}
    </div>
  );
}
