import { useNavigate } from "react-router-dom";
import { Plus, Search, Ticket, UserRound, Sparkles, ArrowUpRight, LayoutDashboard } from "lucide-react";

const actions = [
  { label: "Create Event", desc: "Launch a new experience", icon: Plus, grad: "from-indigo-600 to-violet-600", to: "/create-event", primary: true },
  { label: "Browse Events", desc: "Discover what's hot", icon: Search, grad: "from-emerald-500 to-teal-500", to: "/events" },
  { label: "My Bookings", desc: "Tickets & receipts", icon: Ticket, grad: "from-amber-500 to-orange-500", to: "/my-bookings" },
  { label: "My Profile", desc: "Edit your details", icon: UserRound, grad: "from-slate-700 to-slate-900", to: "/profile" },
];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md"><Sparkles size={14} /></span>
        <h3 className="text-base font-extrabold tracking-tight text-slate-900">Quick Actions</h3>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white"><LayoutDashboard size={10} /> shortcuts</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Jump to what you need — one tap</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.to)}
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${a.primary ? "border-indigo-200 bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg" : "border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300"}`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${a.primary ? "bg-white/15 text-white backdrop-blur border border-white/20" : `bg-linear-to-br ${a.grad} text-white`}`}>
              <a.icon size={16} />
            </div>
            <p className={`mt-3 text-sm font-extrabold ${a.primary ? "text-white" : "text-slate-900"}`}>{a.label}</p>
            <p className={`text-xs ${a.primary ? "text-indigo-100" : "text-slate-500"}`}>{a.desc}</p>
            <ArrowUpRight size={14} className={`absolute right-3 top-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${a.primary ? "text-white/70" : "text-slate-300"}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickActions;
