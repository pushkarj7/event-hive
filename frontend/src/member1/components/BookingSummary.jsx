import { Ticket, MapPin, CalendarDays, Star, ShieldCheck, Sparkles } from "lucide-react";

const BookingSummary = ({ event, qty = 1 }) => {
  if (!event) return null;
  const total = event.price * qty;
  const fee = Math.round(total * 0.03);
  const grand = total + fee;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-slate-900 shadow-sm">{event.category}</span>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base font-extrabold tracking-tight text-white drop-shadow">{event.title}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/90">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2 py-0.5 border border-white/20"><MapPin size={10} />{event.location}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2 py-0.5 border border-white/20"><CalendarDays size={10} />{event.date}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 font-bold text-white"><Star size={10} className="fill-white" />{event.rating}</span>
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white"><Ticket size={12} /></span> Order Summary
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live pricing</span>
        </div>

        <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Price × {qty}</span><span className="font-bold text-slate-900">₹{total.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Platform fee (3%)</span><span className="font-semibold text-slate-600">₹{fee.toLocaleString("en-IN")}</span></div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between"><span className="text-sm font-extrabold text-slate-900">Total payable</span><span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-extrabold text-transparent">₹{grand.toLocaleString("en-IN")}</span></div>
          <p className="text-[11px] text-slate-400">GST included where applicable • Cancel before event</p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
          <ShieldCheck size={12} className="text-emerald-500" /> Secure checkout
          <span>•</span>
          <Sparkles size={12} className="text-indigo-500" /> Instant e-ticket
        </div>
      </div>
    </div>
  );
};
export default BookingSummary;
