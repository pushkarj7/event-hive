import { useState } from "react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";
import BookingCard from "../../member1/components/BookingCard";
import TicketModal from "../../member1/components/TicketModal";
import { Ticket, Search, Sparkles, TrendingUp, CalendarDays, UserRound, LayoutDashboard, ArrowLeft } from "lucide-react";

const MyBookings = () => {
  const { filteredBookings, searchQuery, setSearchQuery, stats } = useAppStore();
  const navigate = useNavigate();
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState(null);
  const confirmed = filteredBookings.filter(b => b.status === "Confirmed").length;
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-130 w-130 rounded-full bg-linear-to-br from-indigo-200/25 via-violet-200/15 to-transparent blur-[80px]" />
        <div className="absolute top-[30%] right-0 h-100 w-100 rounded-full bg-linear-to-bl from-violet-100/20 to-transparent blur-[70px]" />
      </div>

      {/* Header with nav */}
      <div className="relative border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"><ArrowLeft size={14} /> Back</button>
            <button onClick={() => navigate("/profile")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><UserRound size={14} /> Profile</button>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-black"><LayoutDashboard size={14} /> Dashboard</button>
            <button onClick={() => navigate("/events")} className="ml-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Browse Events</button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Ticket size={16} /></span>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">My Bookings</h1>
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">{filteredBookings.length}</span>
            </div>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> {confirmed} confirmed</span>
              <span className="hidden sm:inline">• Search filters instantly</span>
            </p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><TrendingUp size={12} className="text-emerald-600" /> Bookings</div>
              <p className="text-lg font-extrabold text-slate-900">{stats.totalBookings}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><CalendarDays size={12} className="text-indigo-600" /> Events</div>
              <p className="text-lg font-extrabold text-slate-900">{stats.totalEvents}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Sparkles size={12} className="text-amber-500" /> Attendees</div>
              <p className="text-lg font-extrabold text-slate-900">{stats.totalAttendees.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by event or name..." className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-sm transition" />
        </div>

        {filteredBookings.length === 0 ? (
          <div className="mt-10 rounded-[28px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200"><Ticket size={22} className="text-slate-500" /></div>
            <p className="mt-4 text-base font-extrabold text-slate-900">No bookings yet</p>
            <p className="mt-1 text-sm text-slate-500">Book an event to see your tickets here — instant confirmation</p>
            <button onClick={() => navigate("/events")} className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700">Explore Events</button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {filteredBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onPrintTicket={(booking) => setSelectedTicketForPrint(booking)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {selectedTicketForPrint && (
        <TicketModal
          booking={selectedTicketForPrint}
          isOpen={!!selectedTicketForPrint}
          onClose={() => setSelectedTicketForPrint(null)}
        />
      )}
    </div>
  );
};
export default MyBookings;
