import { CalendarDays, MapPin, Ticket, XCircle, ArrowUpRight, Sparkles, Printer } from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking, onPrintTicket }) => {
  const { cancelBooking } = useAppStore();
  const navigate = useNavigate();
  const isCancelled = booking.status === "Cancelled";
  const isConfirmed = booking.status === "Confirmed";
  const handleCancel = () => {
    cancelBooking(booking.id);
    navigate("/booking-cancelled", { state: { booking: { ...booking, status: "Cancelled" } } });
  };
  return (
    <div className={`group relative overflow-hidden rounded-[20px] border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] ${isCancelled ? "border-red-200 opacity-75" : isConfirmed ? "border-emerald-100 hover:border-emerald-200" : "border-amber-100"}`}>
      <div className={`absolute inset-x-0 top-0 h-0.75 ${isConfirmed ? "bg-linear-to-r from-emerald-500 to-teal-500" : isCancelled ? "bg-red-400" : "bg-amber-400"}`} />
      <div className="flex gap-4 p-5">
        <div className="relative shrink-0">
          <img src={booking.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} alt={booking.event} className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
          <span className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ring-2 ring-white text-[10px] font-bold ${isConfirmed ? "bg-emerald-500" : isCancelled ? "bg-red-500" : "bg-amber-500"}`}>{isConfirmed ? "✓" : "•"}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-extrabold text-slate-900">{booking.event} {isConfirmed && <Sparkles size={12} className="text-amber-500 shrink-0" />}</p>
          <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5"><CalendarDays size={10} /> {booking.date}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5"><MapPin size={10} /> {booking.location || "—"}</span>
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white"><Ticket size={10} /> {booking.tickets} ticket(s) <span className="opacity-60">•</span> {booking.amount}</p>
          <p className="mt-1 text-xs text-slate-400 truncate">{booking.user} • {booking.id}</p>
        </div>
        <span className={`h-fit shrink-0 rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ${isConfirmed ? "bg-emerald-500 text-white" : isCancelled ? "bg-red-500 text-white" : "bg-amber-500 text-white"}`}>{booking.status}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
        {!isCancelled ? (
          <>
            <div className="flex items-center gap-2">
              <button onClick={handleCancel} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition"><XCircle size={12} /> Cancel</button>
              <button onClick={() => navigate(`/event/${booking.eventId}`)} className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition">View event <ArrowUpRight size={12} /></button>
            </div>
            {isConfirmed && onPrintTicket && (
              <button
                type="button"
                onClick={() => onPrintTicket(booking)}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
              >
                <Printer size={13} />
                <span>Print Pass</span>
              </button>
            )}
          </>
        ) : (
          <span className="text-xs font-medium text-slate-400">This booking was cancelled</span>
        )}
      </div>
    </div>
  );
};
export default BookingCard;
