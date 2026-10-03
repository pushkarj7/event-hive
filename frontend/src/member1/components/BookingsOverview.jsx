import { useAppStore } from "../../store/EventContext";

const BookingsOverview = () => {
  const { weekly } = useAppStore();
  const max = 80;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Bookings Overview</h3>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">Last 7 Days</span>
      </div>
      <div className="mt-8 flex h-44 items-end gap-3">
        {weekly.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-xl bg-indigo-500" style={{ height: `${(d.value / max) * 160}px`, minHeight: "8px" }} />
            <span className="text-xs text-slate-500">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-400"><span>0</span><span>80</span></div>
    </div>
  );
};
export default BookingsOverview;
