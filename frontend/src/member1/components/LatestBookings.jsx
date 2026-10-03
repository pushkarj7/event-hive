import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

const LatestBookings = () => {
  const { filteredBookings } = useAppStore();
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Recent Bookings</h3>
        <button onClick={() => navigate("/my-bookings")} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-slate-100 text-xs text-slate-500">
            <th className="pb-3 font-medium">#</th><th className="pb-3 font-medium">Event</th><th className="pb-3 font-medium">User</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Tickets</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr><td colSpan={7} className="py-6 text-center text-slate-500">No bookings found</td></tr>
            ) : filteredBookings.slice(0, 5).map((b) => (
              <tr key={b.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 text-slate-500">{b.id}</td>
                <td className="py-3 font-medium text-slate-900">{b.event}</td>
                <td className="py-3 text-slate-600">{b.user}</td>
                <td className="py-3 text-slate-600">{b.date}</td>
                <td className="py-3 text-slate-600">{b.tickets}</td>
                <td className="py-3 font-medium text-slate-900">{b.amount}</td>
                <td className="py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${b.status === "Confirmed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LatestBookings;
