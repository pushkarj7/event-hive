import { Search } from "lucide-react";
const EventFilter = ({ value, onChange, categories = [], active, onCategory }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search events..." className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button key={c} onClick={() => onCategory(c)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${active===c ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
};
export default EventFilter;
