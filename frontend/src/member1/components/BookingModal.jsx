import { useState } from "react";
import { X, Star, MapPin, Calendar, ShieldCheck, CheckCircle, Ticket } from "lucide-react";
export default function BookingModal({ event, isOpen, onClose }) {
  const [quantities, setQuantities] = useState({
    general: 1,
    vip: 0,
    group: 0,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

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
      // Ensure at least one ticket is selected overall if general is 0
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
    if (totalAmount <= 0) {
      alert("Please select at least 1 ticket to proceed.");
      return;
    }
    const generatedId = "EH-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="relative my-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Ticket size={16} />
            </span>
            <h2 className="text-lg font-bold text-text">
              {isSuccess ? "Booking Confirmation" : "Complete Your Booking"}
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

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50">
              <CheckCircle size={36} />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-text">
              Booking Confirmed! 🎉
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Thank you, <span className="font-semibold text-text">{formData.fullName}</span>! Your e-tickets have been sent to{" "}
              <span className="font-medium text-text">{formData.email}</span>.
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
                <span>Venue & City</span>
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
                onClick={resetAndClose}
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
              >
                Done / Explore More
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form Matching the Reference Image */
          <form onSubmit={handleProceedToPay} className="grid gap-6 p-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Event Summary & Select Tickets */}
            <div className="space-y-6 lg:col-span-7">
              {/* Event Summary Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <h4 className="text-xs font-semibold tracking-wider text-text-secondary uppercase">
                  Event Summary
                </h4>
                <div className="mt-3 flex gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-20 w-24 rounded-lg object-cover shadow-sm sm:h-24 sm:w-28"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
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

                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-text">{event.rating || 4.8}</span>
                      <span className="text-text-secondary">({event.reviews || "2.4K"})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Tickets */}
              <div>
                <h4 className="text-sm font-bold text-text">Select Tickets</h4>
                <div className="mt-3 space-y-3">
                  {/* General Admission */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-surface p-3.5 shadow-xs transition-colors hover:border-slate-300">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        General Admission
                      </p>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.general.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-text-secondary">
                        Standard entry pass to all event zones
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("general", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-text">
                        {quantities.general}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("general", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* VIP Pass */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-surface p-3.5 shadow-xs transition-colors hover:border-slate-300">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text">VIP Pass</p>
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                          Priority
                        </span>
                      </div>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.vip.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-text-secondary">
                        Front row view + lounge access & welcome drink
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("vip", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-text">
                        {quantities.vip}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("vip", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Group Pass */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-surface p-3.5 shadow-xs transition-colors hover:border-slate-300">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        Group Pass (4 People)
                      </p>
                      <p className="text-xs font-bold text-primary">
                        ₹{ticketPrices.group.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-text-secondary">
                        Save 15% on group entry for 4 attendees
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("group", -1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-text">
                        {quantities.group}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("group", 1)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Calculation Row */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                  <span className="text-sm font-medium text-text">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: User Details & Payment Method */}
            <div className="space-y-6 lg:col-span-5">
              {/* User Details */}
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
                      placeholder="e.g. John Doe"
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
                      placeholder="john@example.com"
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
