import { Check, Ticket, CalendarDays, MapPin, ArrowRight, Sparkles, Mail, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = ({ booking, event }) => {
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Ticket size={18} className="text-slate-500" /></div>
        <p className="mt-3 text-sm font-bold text-slate-900">No booking yet</p>
        <p className="text-xs text-slate-500">Complete a booking to see confirmation here</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 p-px shadow-[0_16px_40px_rgba(16,185,129,0.25)]">
      <div className="rounded-[27px] bg-white p-7 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-50 blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-teal-50 blur-xl" />

        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-50">
            <Check size={26} strokeWidth={3} />
          </div>
          <div className="mx-auto mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Booking Confirmed
          </div>

          <h3 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900">You&apos;re all set! <Sparkles size={16} className="inline text-amber-500" /></h3>
          <p className="mt-1 text-sm text-slate-500">{booking.id} • {booking.event}</p>
          <p className="text-sm font-extrabold text-emerald-700">{booking.tickets} ticket(s) • {booking.amount}</p>

          {event && (
            <div className="mt-5 flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left">
              <img src={event.image} alt={event.title} className="h-16 w-16 rounded-xl object-cover shadow-sm shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-slate-900">{event.title}</p>
                <p className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={10} />{event.location} <span>•</span><CalendarDays size={10} />{event.date}</p>
                <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white"><Ticket size={10} />{booking.tickets} ticket(s)</p>
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-3 py-3">
              <p className="flex items-center justify-center gap-1 text-xs font-bold text-indigo-700"><Mail size={12} /> E-ticket</p>
              <p className="mt-1 text-[11px] text-slate-600">Sent to {booking.attendeeEmail || booking.user || "your email"}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
              <p className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700"><Download size={12} /> Receipt</p>
              <p className="mt-1 text-[11px] text-slate-500">{booking.id} • {booking.amount}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button onClick={() => navigate("/my-bookings")} className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-sm font-extrabold text-white shadow-md hover:bg-black transition">
              View My Bookings <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate("/events")} className="rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition">Browse more events</button>
          </div>

          <p className="mt-3 text-[11px] text-slate-400">Need help? Contact support with {booking.id}</p>
        </div>
      </div>
    </div>
  );
};
export default BookingConfirmation;
