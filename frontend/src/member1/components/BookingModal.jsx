import { useState, useEffect } from "react";
import { X, Star, MapPin, Calendar, ShieldCheck, CheckCircle, Ticket, Lock, ArrowRight } from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

export default function BookingModal({ event, isOpen, onClose }) {
  const { isAuthenticated, user, addBooking } = useAppStore();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  if (!isOpen || !event) return null;

  const ticketPrices = {
    general: event.price || 999,
    vip: Math.round((event.price || 999) * 2),
    group: Math.round((event.price || 999) * 3.5),
  };

  const handleQuantityChange = (type, delta) => {
    setQuantities((prev) => {
      const nextVal = Math.max(0, (prev[type] || 0) + delta);
      return {
        ...prev,
        [type]: nextVal,
      };
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
    if (!isAuthenticated) {
      onClose();
      navigate("/login");
      return;
    }
    if (totalAmount <= 0) {
      alert("Please select at least 1 ticket to proceed.");
      return;
    }
    const generatedId = "EH-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);

    if (addBooking) {
      addBooking({
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
      });
    }

    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity font-sans">
      <div className="relative my-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Ticket size={16} />
            </span>
            <h2 className="text-lg font-bold text-text">
              {!isAuthenticated
                ? "Login Required"
                : isSuccess
                ? "Booking Confirmation"
                : "Complete Your Booking"}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-text"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Login Gate if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary ring-8 ring-indigo-50/50">
              <Lock size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-text">
              Please Log In to Book
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
              You must be logged in to book passes for{" "}
              <span className="font-semibold text-text">{event.title}</span>. Your booked tickets will be securely stored under your account.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="flex-1 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition text-center"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/register");
                }}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-text hover:bg-slate-50 transition text-center"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : isSuccess ? (
          /* 2. Success Screen */
          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50">
              <CheckCircle size={36} />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-text">
              Booking Confirmed! 🎉
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Thank you, <span className="font-semibold text-text">{formData.fullName}</span>! Your e-tickets are confirmed and added to your bookings.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs text-text-secondary">Booking Reference</span>
                <span className="font-mono text-sm font-bold text-primary">
                  {bookingId}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                <span>Event</span>
                <span className="font-semibold text-text">{event.title}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
                <span>Venue &amp; City</span>
                <span className="text-text">{event.location || event.venue}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
                <span>Tickets Booked</span>
                <span className="font-semibold text-text">{totalTickets} Ticket(s)</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
                <span>Total Paid</span>
                <span className="text-sm font-bold text-emerald-600">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  navigate("/my-bookings");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark"
              >
                <span>View in My Bookings</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-text shadow-xs hover:bg-slate-50 transition-all"
              >
                Done / Explore More
              </button>
            </div>
          </div>
        ) : (
          /* 3. Booking Form */
          <form
            onSubmit={handleProceedToPay}
            className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12"
          >
            {/* Left Column: Event Summary & Ticket Counter */}
            <div className="space-y-6 lg:col-span-7">
              {/* Event Summary */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-20 w-24 rounded-lg object-cover sm:h-24 sm:w-28"
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
                      <h3 className="mt-1 text-base font-bold text-text">
                        {event.title}
                      </h3>
                    </div>

                    <div className="space-y-1 text-xs text-text-secondary">
                      <p className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-primary" />
                        <span>{event.formattedDate || event.date} • {event.time || "7:00 PM"}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-primary" />
                        <span>{event.location || event.venue}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-text">{event.rating || "4.8"}</span>
                      <span className="text-text-secondary">({event.reviews || "1.2k"})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Tickets */}
              <div>
                <h4 className="text-sm font-bold text-text">Select Tickets</h4>
                <div className="mt-3 space-y-3">
                  {/* General Ticket */}
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

                  {/* VIP Ticket */}
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

                  {/* Group Ticket */}
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

            {/* Right Column: Attendee Info & Payment */}
            <div className="space-y-6 lg:col-span-5">
              {/* Attendee Details */}
              <div>
                <h4 className="text-sm font-bold text-text">Your Details</h4>
                <div className="mt-3 space-y-3">
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
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
                      placeholder="rahul@example.com"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-sm font-bold text-text">Payment Method</h4>
                <div className="mt-3 space-y-2">
                  {[
                    { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "netbanking", label: "Net Banking" },
                    { id: "wallet", label: "Wallet (Paytm, Amazon Pay)" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-primary"
                      />
                      <span className="text-xs font-medium text-text">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <ShieldCheck size={16} className="text-primary" />
                <span>Your payment is secure and 256-bit encrypted</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={totalAmount <= 0}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Pay ₹{totalAmount.toLocaleString("en-IN")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
