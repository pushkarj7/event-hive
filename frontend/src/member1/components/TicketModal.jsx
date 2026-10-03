import { Printer, ShieldCheck, Calendar, MapPin, Sparkles } from "lucide-react";
import EventHiveLogo from "./EventHiveLogo";

export default function TicketModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Printable Ticket Area */}
        <div id="printable-ticket" className="p-6 sm:p-8 bg-white text-slate-900">
          {/* Ticket Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-5">
            <div className="flex items-center gap-2.5">
              <EventHiveLogo size={32} showText={false} />
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Event <span className="text-indigo-600">Hive</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Official E-Ticket Pass
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Verified Entry</span>
            </div>
          </div>

          {/* Event Info Card */}
          <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex gap-4">
              <img
                src={booking.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
                alt={booking.event}
                className="h-20 w-20 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                  {booking.category || "Live Event"}
                </span>
                <h3 className="mt-1 text-base font-extrabold text-slate-900 truncate">
                  {booking.event || booking.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-indigo-600" />
                    <span>{booking.date || "Upcoming"}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-indigo-600" />
                    <span className="truncate">{booking.location || "Venue, India"}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attendee Details Grid */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-dashed border-slate-200 py-4 text-xs">
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Attendee</p>
              <p className="font-extrabold text-slate-900 truncate">{booking.user || "Ticket Holder"}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Booking ID</p>
              <p className="font-mono font-bold text-indigo-600">{booking.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Passes</p>
              <p className="font-extrabold text-slate-900">{booking.tickets || 1} Ticket(s)</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Amount Paid</p>
              <p className="font-extrabold text-emerald-600">{booking.amount || "Paid"}</p>
            </div>
          </div>

          {/* QR Code & Barcode Section */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4">
            {/* SVG QR Code */}
            <div className="flex items-center gap-3">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-xs border border-slate-200 dark-preserve-white">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <rect x="5" y="5" width="25" height="25" fill="#0F172A" />
                  <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
                  <rect x="13" y="13" width="9" height="9" fill="#0F172A" />

                  <rect x="70" y="5" width="25" height="25" fill="#0F172A" />
                  <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
                  <rect x="78" y="13" width="9" height="9" fill="#0F172A" />

                  <rect x="5" y="70" width="25" height="25" fill="#0F172A" />
                  <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
                  <rect x="13" y="78" width="9" height="9" fill="#0F172A" />

                  <rect x="38" y="10" width="8" height="8" fill="#0F172A" />
                  <rect x="52" y="10" width="8" height="8" fill="#0F172A" />
                  <rect x="38" y="24" width="8" height="8" fill="#0F172A" />
                  <rect x="52" y="24" width="8" height="8" fill="#0F172A" />

                  <rect x="38" y="42" width="24" height="24" fill="#0F172A" />
                  <rect x="42" y="46" width="16" height="16" fill="#FFFFFF" />
                  <rect x="46" y="50" width="8" height="8" fill="#0F172A" />

                  <rect x="10" y="40" width="8" height="8" fill="#0F172A" />
                  <rect x="22" y="52" width="8" height="8" fill="#0F172A" />
                  <rect x="72" y="40" width="8" height="8" fill="#0F172A" />
                  <rect x="84" y="52" width="8" height="8" fill="#0F172A" />

                  <rect x="38" y="72" width="8" height="8" fill="#0F172A" />
                  <rect x="50" y="72" width="8" height="8" fill="#0F172A" />
                  <rect x="72" y="72" width="8" height="8" fill="#0F172A" />
                  <rect x="84" y="84" width="8" height="8" fill="#0F172A" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">Scan at Entry Gate</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Present this digital QR code or printed pass at the venue turnstiles.
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-700">
                  <Sparkles size={11} /> 100% Genuine Ticket
                </span>
              </div>
            </div>

            {/* Barcode Strip */}
            <div className="flex flex-col items-center">
              <div className="flex items-end gap-0.5 h-8">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}px` }}
                    className="h-full bg-slate-900 rounded-xs"
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 mt-1">
                EH-{booking.id?.replace("#", "") || "001"}-PASS
              </span>
            </div>
          </div>

          {/* Instructions note */}
          <div className="mt-5 text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
            • Gate doors open 60 minutes prior to event schedule. • Please carry a valid Govt. photo ID. • Non-transferable ticket.
          </div>
        </div>

        {/* Modal Action Buttons (Hidden when printing) */}
        <div className="no-print flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
          >
            <Printer size={15} />
            <span>Print / Save E-Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
