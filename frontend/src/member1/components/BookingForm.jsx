import { useState } from "react";
import { Minus, Plus, Ticket, ShieldCheck, ArrowRight, Sparkles, Lock } from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ event }) => {
  const { addBooking, user } = useAppStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [success, setSuccess] = useState(null);

  const total = event.price * qty;
  const fee = Math.round(total * 0.03);
  const grand = total + fee;

  const handleBook = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const b = addBooking(event.id, { tickets: qty, attendeeName: name, attendeeEmail: email });
    setSuccess(b);
    setTimeout(() => navigate("/my-bookings"), 1400);
  };

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-[24px] bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 p-px shadow-[0_16px_40px_rgba(16,185,129,0.3)]">
        <div className="rounded-[23px] bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 animate-bounce">✓</div>
          <h3 className="mt-4 text-xl font-extrabold text-slate-900">Booking Confirmed!</h3>
          <p className="mt-1 text-sm font-medium text-slate-600">{success.id} — {success.event}</p>
          <p className="text-sm font-bold text-emerald-700">{success.tickets} ticket(s) • {success.amount}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Redirecting to My Bookings...
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleBook} className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600" />
      {/* Header */}
      <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-indigo-500/20 blur-xl" />
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20"><Ticket size={16} /></div>
          <h3 className="mt-3 text-lg font-extrabold tracking-tight">Book your tickets</h3>
          <p className="text-sm text-indigo-100/80">{event.title} • {event.location}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Qty + Price */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-extrabold text-slate-900"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm"><Ticket size={12} className="text-indigo-600" /></span> Quantity</span>
            <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200 p-1 shadow-sm">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-black transition disabled:opacity-40"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-extrabold text-slate-900">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-black transition"><Plus size={14} /></button>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Price × {qty}</span><span className="font-bold text-slate-900">₹{total.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Platform fee (3%)</span><span className="font-bold text-slate-700">₹{fee.toLocaleString("en-IN")}</span></div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-between"><span className="font-extrabold text-slate-900">Total payable</span><span className="text-xl font-extrabold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">₹{grand.toLocaleString("en-IN")}</span></div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Max 10 tickets per booking • You can cancel anytime before event</p>
        </div>

        {/* Attendee */}
        <div className="mt-5 space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700">Full Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Email *</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" required />
            <p className="mt-1 text-[11px] text-slate-400">E-ticket will be sent here</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10 digit number" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" />
          </div>
        </div>

        <button type="submit" className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(79,70,229,0.35)] transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-[0_12px_32px_rgba(79,70,229,0.45)] hover:-translate-y-0.5 active:translate-y-0">
          <Lock size={14} /> Confirm & Pay ₹{grand.toLocaleString("en-IN")} <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </button>
        <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> Secure</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Sparkles size={12} className="text-indigo-500" /> Instant</span>
          <span>•</span>
          <span>Encrypted</span>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">By continuing you agree to our Terms & Cancellation Policy</p>
      </div>
    </form>
  );
};
export default BookingForm;
