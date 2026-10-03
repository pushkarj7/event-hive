import { Home, CalendarDays, PlusCircle, Ticket, Users, MessageSquare, BarChart3, Settings, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications } = useAppStore();

  const isActive = (path) => location.pathname === path;

  const navItem = (label, Icon, path, badge) => {
    const active = isActive(path);
    return (
      <button
        key={path}
        onClick={() => navigate(path)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${active ? "bg-indigo-50 font-semibold text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}
      >
        <span className="flex items-center gap-4">
          <Icon size={20} />
          {label}
        </span>
        {badge ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">{badge}</span>
        ) : null}
      </button>
    );
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center px-6 cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-2xl font-bold text-slate-900">
          Event <span className="text-indigo-500">Hive</span>
        </h1>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navItem("Dashboard", Home, "/dashboard")}
          {navItem("My Events", CalendarDays, "/events")}
          {navItem("Create Event", PlusCircle, "/create-event")}
          {navItem("Bookings", Ticket, "/my-bookings")}
          {navItem("Attendees", Users, "/dashboard")}
          <button onClick={() => navigate("/dashboard")} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <span className="flex items-center gap-4"><MessageSquare size={20} />Messages</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">{notifications}</span>
          </button>
          {navItem("Analytics", BarChart3, "/dashboard")}
          {navItem("Settings", Settings, "/profile")}
        </div>
      </nav>

      <div className="mx-4 mb-5 rounded-2xl bg-indigo-100 p-4">
        <h2 className="text-lg font-semibold leading-tight text-slate-900">Create Amazing<br />Events</h2>
        <p className="mt-2 text-xs leading-5 text-slate-600">Bring people together with Event Hive !</p>
        <button onClick={() => navigate("/create-event")} className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50">
          <Plus size={18} /> Create Event
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
