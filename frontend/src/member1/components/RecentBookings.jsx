import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Ticket, ArrowUpRight } from "lucide-react";

const RecentBookings = () => {
  const { filteredBookings } = useAppStore();
  const navigate = useNavigate();
  const items = filteredBookings.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h3 className="text-base font-extrabold tracking-tight text-slate-900">Recent Bookings</h3>
          <p className="text-xs text-slate-500">Latest 5 bookings — live from your activity</p>
        </div>
        <button onClick={() => navigate("/my-bookings")} className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700">
          View All <ArrowUpRight size={14} />
        </button>
      </div>
      {items.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Ticket size={18} className="text-slate-500" /></div>
          <p className="mt-3 text-sm font-semibold text-slate-700">No bookings yet</p>
          <p className="text-xs text-slate-400">Your recent bookings will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-xs text-slate-500">
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Event</th>
                <th className="px-6 py-3 font-semibold">User</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Tickets</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{b.id}</td>
                  <td className="px-6 py-3.5 font-semibold text-slate-900">{b.event}</td>
                  <td className="px-6 py-3.5 text-slate-600">{b.user}</td>
                  <td className="px-6 py-3.5 text-slate-600 inline-flex items-center gap-1"><CalendarDays size={12} className="text-slate-400" />{b.date}</td>
                  <td className="px-6 py-3.5 text-slate-600">{b.tickets}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-900">{b.amount}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${b.status === "Confirmed" ? "bg-emerald-500 text-white" : b.status === "Cancelled" ? "bg-red-500 text-white" : "bg-amber-400 text-white"}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default RecentBookings;
